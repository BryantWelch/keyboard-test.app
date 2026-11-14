import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { formatKeyName } from '../../utils/keyUtils';

const RolloverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  gap: 2rem;
`;

const KeyCountDisplay = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1.25rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const CountBlock = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;

  span {
    display: block;
    margin-top: 0.35rem;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.text};
    opacity: 0.65;
  }
`;

const Rating = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.05rem;
  font-weight: 600;
`;

const KeysContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    pointer-events: none;
    border-radius: 8px;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
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

const PlaceholderText = styled.div`
  color: ${props => props.theme.colors.text}80;
  font-style: italic;
  text-align: center;
  width: 100%;
  user-select: none;
`;

const InstructionText = styled.p`
  color: ${props => props.theme.colors.text};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
`;

interface RolloverTestProps {
  onKeyDown?: (key: string) => void;
  onKeyUp?: (key: string) => void;
}

const getKeyIdentifier = (e: KeyboardEvent): string => {
  return e.code || e.key;
};

const RolloverTest: React.FC<RolloverTestProps> = ({ onKeyDown, onKeyUp }) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [peak, setPeak] = useState(0);

  const describePeak = (count: number): string => {
    if (count === 0) return 'Hold several keys at once';
    if (count < 3) return '2-key rollover';
    if (count < 6) return 'Limited rollover';
    if (count === 6) return '6-key rollover';
    return 'N-key rollover range';
  };

  // Effect to handle reset
  useEffect(() => {
    const clearPressedKeys = () => {
      setPressedKeys(new Set());
      setPeak(0);
    };
    
    window.addEventListener('rollover-test-reset', clearPressedKeys);
    
    return () => {
      window.removeEventListener('rollover-test-reset', clearPressedKeys);
    };
  }, []);

  // Add event listeners for key down and key up
  useEffect(() => {
    const clearPressedKeys = () => {
      setPressedKeys(new Set());
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearPressedKeys();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.repeat) {
        return;
      }

      const keyName = getKeyIdentifier(e);
      
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.add(keyName);
        setPeak(currentPeak => Math.max(currentPeak, newSet.size));
        return newSet;
      });
      
      onKeyDown?.(keyName);
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const keyName = getKeyIdentifier(e);
      
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(keyName);
        return newSet;
      });
      
      onKeyUp?.(keyName);
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearPressedKeys);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearPressedKeys);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onKeyDown, onKeyUp]);
  
  // Convert Set to Array for rendering
  const pressedKeysArray = Array.from(pressedKeys);
  
  return (
    <RolloverContainer>
      <KeyCountDisplay>
        <CountBlock>
          {pressedKeys.size}
          <span>Held now</span>
        </CountBlock>
        <CountBlock>
          {peak}
          <span>Peak</span>
        </CountBlock>
      </KeyCountDisplay>

      <Rating>{describePeak(peak)}</Rating>
      
      <InstructionText>
        Press multiple keys at once to test your keyboard's rollover capability. 
        Most modern keyboards support at least 6-key rollover, while gaming keyboards 
        often support N-key rollover (unlimited simultaneous keypresses).
      </InstructionText>
      
      <KeysContainer>
        <AnimatePresence mode="popLayout">
          {pressedKeysArray.length === 0 ? (
            <PlaceholderText>
              Rollover Test - Press and hold multiple keys to see how many can be recognized simultaneously
            </PlaceholderText>
          ) : (
            pressedKeysArray.map((key) => (
              <KeyDisplay
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.1,
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
      </KeysContainer>
    </RolloverContainer>
  );
};

export default RolloverTest;
