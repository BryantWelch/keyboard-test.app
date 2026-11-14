export interface LastKeyEvent {
  code: string;
  key: string;
  location: number;
  holdMs: number | null;
}

export interface SessionSnapshot {
  tested: number;
  presses: number;
  peakHeld: number;
  held: number;
  avgHoldMs: number | null;
  minHoldMs: number | null;
  maxHoldMs: number | null;
  holdSum: number;
  holdCount: number;
  chatter: number;
  last: LastKeyEvent | null;
}

export const emptySession = (): SessionSnapshot => ({
  tested: 0,
  presses: 0,
  peakHeld: 0,
  held: 0,
  avgHoldMs: null,
  minHoldMs: null,
  maxHoldMs: null,
  holdSum: 0,
  holdCount: 0,
  chatter: 0,
  last: null,
});

type Listener = (snapshot: SessionSnapshot) => void;

let current = emptySession();
const listeners = new Set<Listener>();

export const publishSession = (snapshot: SessionSnapshot): void => {
  current = snapshot;
  listeners.forEach((listener) => listener(snapshot));
};

export const subscribeSession = (listener: Listener): (() => void) => {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
};
