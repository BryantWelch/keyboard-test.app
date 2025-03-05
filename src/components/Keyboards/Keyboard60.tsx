import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Key from './Key';
import { useKeyboardEvents } from './useKeyboardEvents';
import { KeyboardLayoutType } from './keyboardTypes';

interface Keyboard60Props {
  onKeyPress?: (key: string) => void;
  onReset?: () => void;
  keyboardType?: KeyboardLayoutType;
}

// Styled components for the keyboard
const KeyboardContainer = styled(motion.div)`
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

const KeyboardInner = styled.div`
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

const BottomKeyRow = styled(KeyRow)`
  justify-content: flex-start;
`;

// Animation variants
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

const Keyboard60: React.FC<Keyboard60Props> = ({ onKeyPress, onReset, keyboardType = 'qwerty' }) => {
  // Use the keyboard events hook to handle key presses
  const [{ testedKeys, pressedKeys }, { handleKeyPress }] = useKeyboardEvents(onKeyPress, onReset);

  // Helper function to create key props
  const createKeyProps = (displayName: string, keyName: string, secondary?: string, isSpecial: boolean = false) => ({
    label: { primary: displayName, secondary },
    keyboardType,
    onKeyPress: () => handleKeyPress(keyName),
    isTested: testedKeys.has(keyName),
    isPressed: pressedKeys.has(keyName),
    isSpecialKey: isSpecial,
  });

  return (
    <KeyboardContainer
      variants={layoutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <KeyboardFrame>
        <KeyboardInner>
          {/* Number Row */}
          <KeyRow>
            <Key {...createKeyProps('ESC', 'ESC', '~', true)} />
            <Key {...createKeyProps('1', '1', '!')} />
            <Key {...createKeyProps('2', '2', '@')} />
            <Key {...createKeyProps('3', '3', '#')} />
            <Key {...createKeyProps('4', '4', '$')} />
            <Key {...createKeyProps('5', '5', '%')} />
            <Key {...createKeyProps('6', '6', '^')} />
            <Key {...createKeyProps('7', '7', '&')} />
            <Key {...createKeyProps('8', '8', '*')} />
            <Key {...createKeyProps('9', '9', '(')} />
            <Key {...createKeyProps('0', '0', ')')} />
            <Key {...createKeyProps('-', '-', '_')} />
            <Key {...createKeyProps('=', '=', '+')} />
            <Key {...createKeyProps('Backspace', 'Backspace', undefined, true)} size="2u" />
          </KeyRow>

          {/* Top Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Tab', 'Tab', undefined, true)} size="1.5u" />
            <Key {...createKeyProps('Q', 'Q')} />
            <Key {...createKeyProps('W', 'W')} />
            <Key {...createKeyProps('E', 'E')} />
            <Key {...createKeyProps('R', 'R')} />
            <Key {...createKeyProps('T', 'T')} />
            <Key {...createKeyProps('Y', 'Y')} />
            <Key {...createKeyProps('U', 'U')} />
            <Key {...createKeyProps('I', 'I')} />
            <Key {...createKeyProps('O', 'O')} />
            <Key {...createKeyProps('P', 'P')} />
            <Key {...createKeyProps('[', '[', '{')} />
            <Key {...createKeyProps(']', ']', '}')} />
            <Key {...createKeyProps('\\', '\\', '|', true)} size="1.5u" />
          </KeyRow>

          {/* Middle Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Caps Lock', 'Caps Lock', undefined, true)} size="1.75u" />
            <Key {...createKeyProps('A', 'A')} />
            <Key {...createKeyProps('S', 'S')} />
            <Key {...createKeyProps('D', 'D')} />
            <Key {...createKeyProps('F', 'F')} />
            <Key {...createKeyProps('G', 'G')} />
            <Key {...createKeyProps('H', 'H')} />
            <Key {...createKeyProps('J', 'J')} />
            <Key {...createKeyProps('K', 'K')} />
            <Key {...createKeyProps('L', 'L')} />
            <Key {...createKeyProps(';', ';', ':')} />
            <Key {...createKeyProps("'", "'", '"')} />
            <Key {...createKeyProps('Enter', 'Enter', undefined, true)} size="2.25u" />
          </KeyRow>

          {/* Bottom Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Shift', 'L-Shift', undefined, true)} size="2.35u" />
            <Key {...createKeyProps('Z', 'Z')} />
            <Key {...createKeyProps('X', 'X')} />
            <Key {...createKeyProps('C', 'C')} />
            <Key {...createKeyProps('V', 'V')} />
            <Key {...createKeyProps('B', 'B')} />
            <Key {...createKeyProps('N', 'N')} />
            <Key {...createKeyProps('M', 'M')} />
            <Key {...createKeyProps(',', ',', '<')} />
            <Key {...createKeyProps('.', '.', '>')} />
            <Key {...createKeyProps('/', '/', '?')} />
            <Key {...createKeyProps('Shift', 'R-Shift', undefined, true)} size="2.75u" />
          </KeyRow>

          {/* Bottom Row */}
          <BottomKeyRow>
            <Key {...createKeyProps('Ctrl', 'L-Ctrl', undefined, true)} size="1.35u" />
            <Key {...createKeyProps('Win', 'Win', undefined, true)} size="1.35u" />
            <Key {...createKeyProps('Alt', 'L-Alt', undefined, true)} size="1.35u" />
            <Key {...createKeyProps('Space', 'Space', undefined, false)} size="6.55u" />
            <Key {...createKeyProps('Alt', 'R-Alt', undefined, true)} size="1.25u" />
            <Key {...createKeyProps('Win', 'R-Win', undefined, true)} size="1.25u" />
            <Key {...createKeyProps('Fn', 'Fn', undefined, true)} size="1.25u" />
            <Key {...createKeyProps('Ctrl', 'R-Ctrl', undefined, true)} size="1.25u" />
          </BottomKeyRow>
        </KeyboardInner>
      </KeyboardFrame>
    </KeyboardContainer>
  );
};

export default Keyboard60;
