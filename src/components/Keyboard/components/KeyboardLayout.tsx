import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { KeyboardWrapperProps } from '../types/keyboard.types';

const LayoutContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
`;

const KeyboardFrame = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 12px rgba(0, 0, 0, 0.1),
    0 12px 24px rgba(0, 0, 0, 0.15);
  border: 2px solid ${props => `${props.theme.colors.primary}40`};
`;

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border-radius: 8px;
  background: ${props => `${props.theme.colors.primary}15`};
  box-shadow: 
    inset 0 0 10px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => `${props.theme.colors.primary}30`};
`;

const KeyRow = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const layoutVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const KeyboardLayout: React.FC<KeyboardWrapperProps> = ({
  layout,
  onKeyPress,
  testedKeys,
  pressedKeys,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for ALL keys during key test
      event.preventDefault();
      
      // Map physical keys to our display names
      let keyName = '';
      switch (event.code) {
        case 'ShiftLeft':
          keyName = 'L-Shift';
          break;
        case 'ShiftRight':
          keyName = 'R-Shift';
          break;
        case 'ControlLeft':
          keyName = 'L-Ctrl';
          break;
        case 'ControlRight':
          keyName = 'R-Ctrl';
          break;
        case 'AltLeft':
          keyName = 'L-Alt';
          break;
        case 'AltRight':
          keyName = 'R-Alt';
          break;
        case 'Space':
          keyName = 'Space';
          break;
        case 'Enter':
          keyName = 'Enter';
          break;
        case 'Escape':
          keyName = 'ESC';
          break;
        case 'ArrowUp':
          keyName = '↑';
          break;
        case 'ArrowDown':
          keyName = '↓';
          break;
        case 'ArrowLeft':
          keyName = '←';
          break;
        case 'ArrowRight':
          keyName = '→';
          break;
        case 'Backquote':
          keyName = '`';
          break;
        case 'BracketLeft':
          keyName = '[';
          break;
        case 'BracketRight':
          keyName = ']';
          break;
        case 'Backslash':
          keyName = '\\';
          break;
        case 'Semicolon':
          keyName = ';';
          break;
        case 'Quote':
          keyName = "'";
          break;
        case 'Comma':
          keyName = ',';
          break;
        case 'Period':
          keyName = '.';
          break;
        case 'Slash':
          keyName = '/';
          break;
        case 'MetaLeft':
        case 'MetaRight':
          keyName = 'Win';
          break;
        case 'CapsLock':
          keyName = 'Caps Lock';
          break;
        case 'Backspace':
          keyName = 'Backspace';
          break;
        case 'Delete':
          keyName = 'Delete';
          break;
        case 'Tab':
          keyName = 'Tab';
          break;
        case 'Minus':
          keyName = '-';
          break;
        case 'Equal':
          keyName = '=';
          break;
        default:
          // Handle F1-F12 keys
          if (event.code.match(/^F(\d+)$/)) {
            keyName = event.code;
          } else {
            keyName = event.key.length === 1 ? event.key.toUpperCase() : event.key;
          }
      }
      
      if (keyName) {
        onKeyPress?.(keyName);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return (
    <LayoutContainer
      variants={layoutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <KeyboardFrame>
        <KeyboardContainer>
          {children}
        </KeyboardContainer>
      </KeyboardFrame>
    </LayoutContainer>
  );
};

export { KeyRow };
export default KeyboardLayout;
