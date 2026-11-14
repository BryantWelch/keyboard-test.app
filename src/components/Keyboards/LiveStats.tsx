import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { formatKeyName } from '../../utils/keyUtils';
import { emptySession, SessionSnapshot, subscribeSession } from './session';

const Strip = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.15rem 0 0.85rem;
`;

const Pill = styled.div<{ $alert?: boolean; $open?: boolean }>`
  position: relative;
  flex: 0 0 auto;
  min-width: 92px;
  padding: 0.55rem 0.75rem 0.5rem;
  border-radius: 12px;
  border: 1px solid ${props => {
    if (props.$alert) return props.theme.colors.accent;
    if (props.$open) return `${props.theme.colors.primary}99`;
    return `${props.theme.colors.primary}33`;
  }};
  background: ${props => props.$alert ? `${props.theme.colors.accent}18` : `${props.theme.colors.primary}12`};
  cursor: default;
  user-select: none;

  &:hover {
    border-color: ${props => props.$alert ? props.theme.colors.accent : `${props.theme.colors.primary}99`};
  }
`;

const Value = styled.div`
  color: ${props => props.theme.colors.text};
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  white-space: nowrap;
`;

const Label = styled.div`
  margin-top: 0.15rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.62;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const tipFill = (color: string, background: string) =>
  `color-mix(in srgb, ${color} 18%, ${background})`;

const Tip = styled.div<{ $left: number; $top: number; $ready: boolean }>`
  position: fixed;
  left: ${props => props.$left}px;
  top: ${props => props.$top}px;
  z-index: 40;
  width: max-content;
  max-width: min(250px, calc(100vw - 20px));
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  background: ${props => tipFill(props.theme.colors.primary, props.theme.colors.background)};
  border: 1px solid ${props => `${props.theme.colors.primary}66`};
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
  color: ${props => props.theme.colors.text};
  font-size: 0.78rem;
  line-height: 1.4;
  text-align: left;
  pointer-events: none;
  visibility: ${props => props.$ready ? 'visible' : 'hidden'};
`;

const Arrow = styled.span<{ $x: number; $below: boolean }>`
  position: absolute;
  left: ${props => props.$x}px;
  width: 8px;
  height: 8px;
  background: ${props => tipFill(props.theme.colors.primary, props.theme.colors.background)};
  border-right: 1px solid ${props => `${props.theme.colors.primary}66`};
  border-bottom: 1px solid ${props => `${props.theme.colors.primary}66`};
  ${props => props.$below
    ? 'top: 0; transform: translate(-50%, -50%) rotate(225deg);'
    : 'bottom: 0; transform: translate(-50%, 50%) rotate(45deg);'}
`;

interface TipBox {
  left: number;
  top: number;
  arrow: number;
  below: boolean;
}

const Stat: React.FC<{
  id: string;
  value: React.ReactNode;
  label: string;
  info: string;
  alert?: boolean;
  shown: boolean;
  onEnter: () => void;
  onLeave: () => void;
}> = ({ id, value, label, info, alert, shown, onEnter, onLeave }) => {
  const pillRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<TipBox | null>(null);
  const tipId = `stat-tip-${id}`;

  useLayoutEffect(() => {
    if (!shown) {
      setBox(null);
      return;
    }

    const place = () => {
      const pill = pillRef.current;
      const tip = tipRef.current;
      if (!pill || !tip) return;

      const rect = pill.getBoundingClientRect();
      const width = tip.offsetWidth;
      const height = tip.offsetHeight;
      const margin = 10;
      const gap = 9;
      let left = rect.left + rect.width / 2 - width / 2;
      left = Math.max(margin, Math.min(left, window.innerWidth - margin - width));

      let top = rect.top - height - gap;
      let below = false;
      if (top < margin) {
        below = true;
        top = rect.bottom + gap;
      }

      const arrow = Math.max(16, Math.min(width - 16, rect.left + rect.width / 2 - left));
      setBox({ left, top, arrow, below });
    };

    place();
    const observer = new ResizeObserver(place);
    if (pillRef.current) observer.observe(pillRef.current);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [shown, info]);

  return (
    <Pill
      ref={pillRef}
      $alert={alert}
      $open={shown}
      aria-describedby={shown ? tipId : undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Value>{value}</Value>
      <Label>{label}</Label>
      {shown && createPortal(
        <Tip
          ref={tipRef}
          id={tipId}
          role="tooltip"
          $left={box?.left ?? 0}
          $top={box?.top ?? 0}
          $ready={box != null}
        >
          {info}
          {box && <Arrow $x={box.arrow} $below={box.below} />}
        </Tip>,
        document.body
      )}
    </Pill>
  );
};

const formatMs = (value: number | null): string => {
  if (value == null) return '—';
  return `${value} ms`;
};

const LiveStats: React.FC = () => {
  const [snapshot, setSnapshot] = useState<SessionSnapshot>(emptySession);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => subscribeSession(setSnapshot), []);

  const enter = (id: string) => setHoverId(id);
  const leave = (id: string) => setHoverId(current => (current === id ? null : current));

  const last = snapshot.last;
  const lastLabel = last ? formatKeyName(last.code) : '—';
  const lastDetail = last ? last.code : 'Press any key';

  const stats = [
    {
      id: 'last',
      value: lastLabel,
      label: lastDetail,
      info: 'The last key you pressed. The smaller line is the browser code for that key, such as KeyF or ArrowLeft.',
    },
    {
      id: 'hold',
      value: formatMs(last?.holdMs ?? null),
      label: 'Last hold',
      info: 'How long you held the last key, in milliseconds. Holds of 10 seconds or longer are not counted.',
    },
    {
      id: 'avg',
      value: formatMs(snapshot.avgHoldMs),
      label: 'Avg hold',
      info: 'The average time you held a key down during this session.',
    },
    {
      id: 'tested',
      value: snapshot.tested,
      label: 'Keys tested',
      info: 'How many different keys you have pressed at least once.',
    },
    {
      id: 'presses',
      value: snapshot.presses,
      label: 'Presses',
      info: 'Every key press this session, including pressing the same key again.',
    },
    {
      id: 'peak',
      value: snapshot.peakHeld,
      label: 'Peak held',
      info: 'The most keys held down at the same time. This is the highest rollover reached this session.',
    },
    {
      id: 'chatter',
      value: snapshot.chatter,
      label: 'Chatter',
      alert: snapshot.chatter > 0,
      info: 'How often the same key was pressed again within 28 milliseconds of being released. A rising count can mean that key is bouncing.',
    },
  ];

  return (
    <Strip aria-live="polite">
      {stats.map(stat => (
        <Stat
          key={stat.id}
          id={stat.id}
          value={stat.value}
          label={stat.label}
          info={stat.info}
          alert={stat.alert}
          shown={hoverId === stat.id}
          onEnter={() => enter(stat.id)}
          onLeave={() => leave(stat.id)}
        />
      ))}
    </Strip>
  );
};

export default LiveStats;
