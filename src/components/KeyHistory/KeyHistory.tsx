import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: ${props => `${props.theme.colors.background}cc`};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.main};
  min-height: 48px;
`;

const KeyContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: ${props => props.theme.colors.primary};
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  min-width: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HistoryContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem auto;
  width: 100%;
  max-width: 800px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: ${props => props.theme.shadows.main};
  overflow: hidden;
`;

const KeyDisplay = styled(motion.div)`
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.primary}20;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  min-width: 40px;
  text-align: center;
  font-family: monospace;
  flex-shrink: 0;
`;

const keyVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
};

interface KeyHistoryProps {
  keys: string[];
  maxKeys?: number;
}

const KeyHistory: React.FC<KeyHistoryProps> = ({ keys, maxKeys = 15 }) => {
  const formatKeyName = (key: string): string => {
    switch (key) {
      case 'ArrowLeft':
      case 'Left':
        return '←';
      case 'ArrowRight':
      case 'Right':
        return '→';
      case 'ArrowUp':
      case 'Up':
        return '↑';
      case 'ArrowDown':
      case 'Down':
        return '↓';
      case 'L-Shift':
        return 'L-Shift';
      case 'R-Shift':
        return 'R-Shift';
      case 'L-Ctrl':
        return 'L-Ctrl';
      case 'R-Ctrl':
        return 'R-Ctrl';
      case 'L-Alt':
        return 'L-Alt';
      case 'R-Alt':
        return 'R-Alt';
      case 'Control':
        return 'Ctrl';
      case 'Meta':
        return 'Win';
      default:
        return key;
    }
  };

  // Get the most recent keys, but in reverse order (newest first)
  const displayKeys = keys.slice(-maxKeys).reverse();

  return (
    <HistoryContainer>
      <AnimatePresence mode="popLayout">
        {displayKeys.length === 0 ? (
          <span>Press any key to test</span>
        ) : (
          displayKeys.map((key, index) => (
            <KeyDisplay
              key={`${key}-${keys.length - index}`}
              initial={{ opacity: 0, x: -40, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.8 }}
              transition={{ 
                duration: 0.2,
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            >
              {formatKeyName(key)}
            </KeyDisplay>
          ))
        )}
      </AnimatePresence>
    </HistoryContainer>
  );
};

export default KeyHistory;
