import { useCallback, useEffect, useRef, useState } from 'react';
import { emptySession, publishSession, SessionSnapshot } from './session';

const CHATTER_WINDOW_MS = 28;

export interface KeyboardState {
  testedKeys: Set<string>;
  pressedKeys: Set<string>;
  pressCounts: Map<string, number>;
  stats: SessionSnapshot;
}

export interface KeyboardActions {
  handleKeyPress: (key: string) => void;
  handleReset: () => void;
}

interface KeyMeta {
  key: string;
  location: number;
}

interface KeyboardModel {
  testedKeys: Set<string>;
  pressedKeys: Set<string>;
  pressCounts: Map<string, number>;
  stats: SessionSnapshot;
}

const createModel = (): KeyboardModel => ({
  testedKeys: new Set(),
  pressedKeys: new Set(),
  pressCounts: new Map(),
  stats: emptySession(),
});

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
};

export const useKeyboardEvents = (
  onKeyPress?: (key: string) => void,
  onReset?: () => void
): [KeyboardState, KeyboardActions] => {
  const [model, setModel] = useState<KeyboardModel>(createModel);
  const modelRef = useRef(model);
  const downTimes = useRef<Map<string, number>>(new Map());
  const upTimes = useRef<Map<string, number>>(new Map());
  const onKeyPressRef = useRef(onKeyPress);
  const onResetRef = useRef(onReset);

  useEffect(() => {
    onKeyPressRef.current = onKeyPress;
  }, [onKeyPress]);

  useEffect(() => {
    onResetRef.current = onReset;
  }, [onReset]);

  const commit = useCallback((next: KeyboardModel) => {
    modelRef.current = next;
    setModel(next);
    publishSession(next.stats);
  }, []);

  const releaseKey = useCallback((code: string, ignoreHold: boolean) => {
    const prev = modelRef.current;
    const startedAt = downTimes.current.get(code);
    downTimes.current.delete(code);

    if (!prev.pressedKeys.has(code) && startedAt == null) {
      return;
    }

    const pressedKeys = new Set(prev.pressedKeys);
    pressedKeys.delete(code);

    const stats: SessionSnapshot = {
      ...prev.stats,
      held: pressedKeys.size,
    };

    if (!ignoreHold && startedAt != null) {
      const holdMs = Math.round(performance.now() - startedAt);
      if (holdMs >= 0 && holdMs < 10000) {
        const holdSum = prev.stats.holdSum + holdMs;
        const holdCount = prev.stats.holdCount + 1;
        stats.holdSum = holdSum;
        stats.holdCount = holdCount;
        stats.avgHoldMs = Math.round(holdSum / holdCount);
        stats.minHoldMs = prev.stats.minHoldMs == null ? holdMs : Math.min(prev.stats.minHoldMs, holdMs);
        stats.maxHoldMs = prev.stats.maxHoldMs == null ? holdMs : Math.max(prev.stats.maxHoldMs, holdMs);
        if (stats.last?.code === code) {
          stats.last = { ...stats.last, holdMs };
        }
      }
      upTimes.current.set(code, performance.now());
    }

    commit({
      ...prev,
      pressedKeys,
      stats,
    });
  }, [commit]);

  const pressKey = useCallback((code: string, meta?: KeyMeta, momentary = false) => {
    const now = performance.now();
    const prev = modelRef.current;
    const previousUp = upTimes.current.get(code);
    const chatter = previousUp != null && now - previousUp < CHATTER_WINDOW_MS;
    const testedKeys = new Set(prev.testedKeys);
    testedKeys.add(code);
    const pressedKeys = new Set(prev.pressedKeys);
    pressedKeys.add(code);
    const pressCounts = new Map(prev.pressCounts);
    pressCounts.set(code, (pressCounts.get(code) ?? 0) + 1);
    downTimes.current.set(code, now);

    const stats: SessionSnapshot = {
      ...prev.stats,
      tested: testedKeys.size,
      presses: prev.stats.presses + 1,
      peakHeld: Math.max(prev.stats.peakHeld, pressedKeys.size),
      held: pressedKeys.size,
      chatter: prev.stats.chatter + (chatter ? 1 : 0),
      last: {
        code,
        key: meta?.key || code,
        location: meta?.location ?? 0,
        holdMs: null,
      },
    };

    commit({
      testedKeys,
      pressedKeys,
      pressCounts,
      stats,
    });

    onKeyPressRef.current?.(code);

    if (momentary) {
      const stamp = now;
      window.setTimeout(() => {
        if (downTimes.current.get(code) === stamp) {
          releaseKey(code, true);
        }
      }, 90);
    }
  }, [commit, releaseKey]);

  const handleKeyPress = useCallback((key: string) => {
    pressKey(key, { key, location: 0 }, true);
  }, [pressKey]);

  const handleReset = useCallback(() => {
    downTimes.current.clear();
    upTimes.current.clear();
    commit(createModel());
    onResetRef.current?.();
  }, [commit]);

  useEffect(() => {
    publishSession(modelRef.current.stats);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || event.repeat || !event.code) {
        return;
      }

      event.preventDefault();
      pressKey(event.code, { key: event.key, location: event.location });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || !event.code) {
        return;
      }

      event.preventDefault();
      releaseKey(event.code, false);
    };

    const clearHeldKeys = () => {
      Array.from(downTimes.current.keys()).forEach((code) => releaseKey(code, true));
      const prev = modelRef.current;
      if (prev.pressedKeys.size === 0) {
        return;
      }

      commit({
        ...prev,
        pressedKeys: new Set(),
        stats: { ...prev.stats, held: 0 },
      });
      downTimes.current.clear();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearHeldKeys();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearHeldKeys);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearHeldKeys);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      publishSession(emptySession());
    };
  }, [commit, pressKey, releaseKey]);

  return [
    model,
    {
      handleKeyPress,
      handleReset,
    },
  ];
};
