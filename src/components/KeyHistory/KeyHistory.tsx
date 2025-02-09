import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  box-shadow: ${props => props.theme.shadows.main};
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
`;

interface KeyHistoryProps {
  keys: string[];
  maxKeys?: number;
}

const KeyHistory: React.FC<KeyHistoryProps> = ({ keys, maxKeys = 10 }) => {
  const displayKeys = keys.slice(-maxKeys);

  return (
    <HistoryContainer>
      {displayKeys.map((key, index) => (
        <KeyDisplay
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          {key}
        </KeyDisplay>
      ))}
    </HistoryContainer>
  );
};

export default KeyHistory;
