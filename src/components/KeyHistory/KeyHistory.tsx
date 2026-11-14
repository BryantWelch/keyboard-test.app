import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { formatKeyName } from '../../utils/keyUtils';

const HistoryContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary}55;
  border-radius: 14px;
  padding: 0.7rem 0.85rem;
  margin: 0.75rem auto 2rem auto;
  width: 100%;
  max-width: 1200px;
  min-width: 0;
  min-height: 64px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LabelGroup = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
`;

const HistoryLabel = styled.div`
  color: ${props => props.theme.colors.text};
  opacity: 0.55;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HistoryCount = styled.div`
  color: ${props => props.theme.colors.text};
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.85rem;
  font-weight: 500;
`;

const KeyTrack = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  overflow: hidden;
`;

const KeyDisplay = styled(motion.div)`
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.primary}22;
  border: 1px solid ${props => props.theme.colors.primary}88;
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  min-width: 36px;
  text-align: center;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.85rem;
  flex-shrink: 0;
`;

const PlaceholderText = styled.div`
  color: ${props => props.theme.colors.text}80;
  font-style: italic;
  text-align: left;
  flex: 1;
  user-select: none;
`;

interface KeyHistoryProps {
  keys: string[];
}

const KeyHistory: React.FC<KeyHistoryProps> = ({ keys }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const fittedCap = useRef<number | null>(null);
  const measuredLength = useRef(0);
  const [visibleCount, setVisibleCount] = useState(48);
  const displayKeys = keys.slice(-visibleCount).reverse();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const measure = () => {
      if (measuredLength.current !== keys.length) {
        measuredLength.current = keys.length;
        fittedCap.current = null;
      }

      if (keys.length === 0) {
        return;
      }

      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const available = track.clientWidth;
      const chips = Array.from(track.querySelectorAll<HTMLElement>('[data-key]'));
      if (chips.length === 0 || available <= 0) {
        return;
      }

      let used = 0;
      let fitted = 0;
      for (const chip of chips) {
        const next = used + (fitted > 0 ? gap : 0) + chip.offsetWidth;
        if (next > available + 1) {
          break;
        }
        used = next;
        fitted += 1;
      }

      if (fitted === 0) {
        return;
      }

      if (fitted < chips.length) {
        fittedCap.current = fitted;
        if (fitted !== visibleCount) {
          setVisibleCount(fitted);
        }
        return;
      }

      if (fittedCap.current != null && chips.length >= fittedCap.current) {
        return;
      }

      const spare = available - used;
      const narrowest = Math.min(...chips.map((chip) => chip.offsetWidth));
      const extra = Math.floor((spare + gap) / (narrowest + gap));
      if (keys.length > fitted && extra > 0) {
        setVisibleCount(Math.min(keys.length, fitted + extra));
      }
    };

    measure();
    const observer = new ResizeObserver(() => {
      fittedCap.current = null;
      measure();
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [keys, visibleCount]);

  return (
    <HistoryContainer>
      <LabelGroup>
        <HistoryLabel>History</HistoryLabel>
        <HistoryCount>{keys.length}</HistoryCount>
      </LabelGroup>
      <KeyTrack ref={trackRef}>
        <AnimatePresence mode="popLayout">
          {displayKeys.length === 0 ? (
            <PlaceholderText>
              Press a key to log it here
            </PlaceholderText>
          ) : (
            displayKeys.map((key, index) => (
              <KeyDisplay
                key={`${key}-${keys.length - index}`}
                data-key="true"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.12 }}
              >
                {formatKeyName(key)}
              </KeyDisplay>
            ))
          )}
        </AnimatePresence>
      </KeyTrack>
    </HistoryContainer>
  );
};

export default KeyHistory;
