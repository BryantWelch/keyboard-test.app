import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Key, { KeySize } from './Key';
import { useKeyboardEvents } from './useKeyboardEvents';

interface Keyboard75Props {
  onKeyPress?: (key: string) => void;
  onReset?: () => void;
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
  gap: 4px;
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
  gap: 4px;
  justify-content: center;
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

// Animation variants
const layoutVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const Keyboard75: React.FC<Keyboard75Props> = ({ onKeyPress, onReset }) => {
  // Use the keyboard events hook to handle key presses
  const [{ testedKeys, pressedKeys }, { handleKeyPress }] = useKeyboardEvents(onKeyPress, onReset);

  // Helper function to create key props
  const createKeyProps = (displayName: string, keyName: string, secondary?: string, isSpecial: boolean = false, size?: KeySize) => ({
    label: { primary: displayName, secondary },
    onKeyPress: () => handleKeyPress(keyName),
    isTested: testedKeys.has(keyName),
    isPressed: pressedKeys.has(keyName),
    isSpecialKey: isSpecial,
    size,
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
          {/* Function Row */}
          <KeyRow>
            <Key {...createKeyProps('ESC', 'ESC', undefined, true)} />
            <Key {...createKeyProps('F1', 'F1', undefined, true)} />
            <Key {...createKeyProps('F2', 'F2', undefined, true)} />
            <Key {...createKeyProps('F3', 'F3', undefined, true)} />
            <Key {...createKeyProps('F4', 'F4', undefined, true)} />
            <Key {...createKeyProps('F5', 'F5', undefined, true)} />
            <Key {...createKeyProps('F6', 'F6', undefined, true)} />
            <Key {...createKeyProps('F7', 'F7', undefined, true)} />
            <Key {...createKeyProps('F8', 'F8', undefined, true)} />
            <Key {...createKeyProps('F9', 'F9', undefined, true)} />
            <Key {...createKeyProps('F10', 'F10', undefined, true)} />
            <Key {...createKeyProps('F11', 'F11', undefined, true)} />
            <Key {...createKeyProps('F12', 'F12', undefined, true)} />
            <Key {...createKeyProps('Prt Sc', 'PrintScreen', undefined, true)} />
            <Key {...createKeyProps('Pause', 'Pause', undefined, true)} />
            <Key {...createKeyProps('Delete', 'Delete', undefined, true)} />
          </KeyRow>

          {/* Number Row */}
          <KeyRow>
            <Key {...createKeyProps('~', '`', '`', true)} />
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
            <Key {...createKeyProps('Backspace', 'Backspace', undefined, true, '2.1u')} />
            <Key {...createKeyProps('Home', 'Home', undefined, true)} />
          </KeyRow>

          {/* Top Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Tab', 'Tab', undefined, true, '1.55u')} />
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
            <Key {...createKeyProps('\\', '\\', '|', true, '1.55u')} />
            <Key {...createKeyProps('End', 'End', undefined, true)} />
          </KeyRow>

          {/* Middle Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Caps', 'Caps Lock', undefined, true, '1.85u')} />
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
            <Key {...createKeyProps('Enter', 'Enter', undefined, true, '2.4u')} />
            <Key {...createKeyProps('Pg Up', 'PageUp', undefined, true)} />
          </KeyRow>

          {/* Bottom Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Shift', 'L-Shift', undefined, true, '2.35u')} />
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
            <Key {...createKeyProps('Shift', 'R-Shift', undefined, true, '1.85u')} />
            <Key {...createKeyProps('↑', 'ArrowUp')} />
            <Key {...createKeyProps('Pg Dn', 'PageDown', undefined, true)} />
          </KeyRow>

          {/* Bottom Row */}
          <KeyRow>
            <Key {...createKeyProps('Ctrl', 'L-Ctrl', undefined, true, '1.25u')} />
            <Key {...createKeyProps('Win', 'Win', undefined, true, '1.25u')} />
            <Key {...createKeyProps('Alt', 'L-Alt', undefined, true, '1.25u')} />
            <Key {...createKeyProps('', 'Space', undefined, false, '6.45u')} />
            <Key {...createKeyProps('Alt', 'R-Alt', undefined, true, '1.2u')} />
            <Key {...createKeyProps('Win', 'R-Win', undefined, true, '1.2u')} />
            <Key {...createKeyProps('Ctrl', 'R-Ctrl', undefined, true, '1.2u')} />
            <Key {...createKeyProps('←', 'ArrowLeft')} />
            <Key {...createKeyProps('↓', 'ArrowDown')} />
            <Key {...createKeyProps('→', 'ArrowRight')} />
          </KeyRow>
        </KeyboardInner>
      </KeyboardFrame>
    </KeyboardContainer>
  );
};

export default Keyboard75;
