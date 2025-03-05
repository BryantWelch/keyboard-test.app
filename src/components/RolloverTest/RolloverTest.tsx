import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 1rem;
  
  span {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text};
    margin-left: 0.5rem;
  }
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
  onReset?: () => void;
}

const RolloverTest: React.FC<RolloverTestProps> = ({ onKeyDown, onKeyUp, onReset }) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  
  // Format key name for display
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

  // Effect to handle reset
  useEffect(() => {
    // Function to clear pressed keys
    const clearPressedKeys = () => {
      setPressedKeys(new Set());
    };
    
    // Listen for the custom reset event from TestContainer
    window.addEventListener('rollover-test-reset', clearPressedKeys);
    
    // Cleanup
    return () => {
      window.removeEventListener('rollover-test-reset', clearPressedKeys);
    };
  }, []);

  // Add event listeners for key down and key up
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      let keyName = e.key;
      
      // Handle special keys
      if (e.key === ' ') keyName = 'Space';
      if (e.key === 'Control' && e.location === 1) keyName = 'L-Ctrl';
      if (e.key === 'Control' && e.location === 2) keyName = 'R-Ctrl';
      if (e.key === 'Shift' && e.location === 1) keyName = 'L-Shift';
      if (e.key === 'Shift' && e.location === 2) keyName = 'R-Shift';
      if (e.key === 'Alt' && e.location === 1) keyName = 'L-Alt';
      if (e.key === 'Alt' && e.location === 2) keyName = 'R-Alt';
      
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.add(keyName);
        return newSet;
      });
      
      if (onKeyDown) {
        onKeyDown(keyName);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      
      let keyName = e.key;
      
      // Handle special keys (same as in keydown)
      if (e.key === ' ') keyName = 'Space';
      if (e.key === 'Control' && e.location === 1) keyName = 'L-Ctrl';
      if (e.key === 'Control' && e.location === 2) keyName = 'R-Ctrl';
      if (e.key === 'Shift' && e.location === 1) keyName = 'L-Shift';
      if (e.key === 'Shift' && e.location === 2) keyName = 'R-Shift';
      if (e.key === 'Alt' && e.location === 1) keyName = 'L-Alt';
      if (e.key === 'Alt' && e.location === 2) keyName = 'R-Alt';
      
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(keyName);
        return newSet;
      });
      
      if (onKeyUp) {
        onKeyUp(keyName);
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyDown, onKeyUp]);
  
  // Convert Set to Array for rendering
  const pressedKeysArray = Array.from(pressedKeys);
  
  return (
    <RolloverContainer>
      <KeyCountDisplay>
        {pressedKeys.size} <span>keys pressed simultaneously</span>
      </KeyCountDisplay>
      
      <InstructionText>
        Press multiple keys at once to test your keyboard's rollover capability. 
        Most modern keyboards support at least 6-key rollover, while gaming keyboards 
        often support N-key rollover (unlimited simultaneous keypresses).
      </InstructionText>
      
      <KeysContainer>
        <AnimatePresence mode="sync">
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
