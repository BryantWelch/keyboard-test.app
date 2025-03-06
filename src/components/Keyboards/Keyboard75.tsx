import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Key, { KeySize } from './Key';
import { useKeyboardEvents } from './useKeyboardEvents';
import { KeyboardLayoutType } from './keyboardTypes';

interface Keyboard75Props {
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

const Keyboard75: React.FC<Keyboard75Props> = ({ onKeyPress, onReset, keyboardType }) => {
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
    keyboardType,
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
            <Key {...createKeyProps('ESC', 'Escape', undefined, true)} />
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
            <Key {...createKeyProps('~', 'Backquote', '`', true)} />
            <Key {...createKeyProps('1', 'Digit1', '!')} />
            <Key {...createKeyProps('2', 'Digit2', '@')} />
            <Key {...createKeyProps('3', 'Digit3', '#')} />
            <Key {...createKeyProps('4', 'Digit4', '$')} />
            <Key {...createKeyProps('5', 'Digit5', '%')} />
            <Key {...createKeyProps('6', 'Digit6', '^')} />
            <Key {...createKeyProps('7', 'Digit7', '&')} />
            <Key {...createKeyProps('8', 'Digit8', '*')} />
            <Key {...createKeyProps('9', 'Digit9', '(')} />
            <Key {...createKeyProps('0', 'Digit0', ')')} />
            <Key {...createKeyProps('-', 'Minus', '_')} />
            <Key {...createKeyProps('=', 'Equal', '+')} />
            <Key {...createKeyProps('Backspace', 'Backspace', undefined, true, '2.1u')} />
            <Key {...createKeyProps('Home', 'Home', undefined, true)} />
          </KeyRow>

          {/* Top Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Tab', 'Tab', undefined, true, '1.55u')} />
            <Key {...createKeyProps('Q', 'KeyQ')} />
            <Key {...createKeyProps('W', 'KeyW')} />
            <Key {...createKeyProps('E', 'KeyE')} />
            <Key {...createKeyProps('R', 'KeyR')} />
            <Key {...createKeyProps('T', 'KeyT')} />
            <Key {...createKeyProps('Y', 'KeyY')} />
            <Key {...createKeyProps('U', 'KeyU')} />
            <Key {...createKeyProps('I', 'KeyI')} />
            <Key {...createKeyProps('O', 'KeyO')} />
            <Key {...createKeyProps('P', 'KeyP')} />
            <Key {...createKeyProps('[', 'BracketLeft', '{')} />
            <Key {...createKeyProps(']', 'BracketRight', '}')} />
            <Key {...createKeyProps('\\', 'Backslash', '|', true, '1.55u')} />
            <Key {...createKeyProps('End', 'End', undefined, true)} />
          </KeyRow>

          {/* Middle Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Caps', 'CapsLock', undefined, true, '1.85u')} />
            <Key {...createKeyProps('A', 'KeyA')} />
            <Key {...createKeyProps('S', 'KeyS')} />
            <Key {...createKeyProps('D', 'KeyD')} />
            <Key {...createKeyProps('F', 'KeyF')} />
            <Key {...createKeyProps('G', 'KeyG')} />
            <Key {...createKeyProps('H', 'KeyH')} />
            <Key {...createKeyProps('J', 'KeyJ')} />
            <Key {...createKeyProps('K', 'KeyK')} />
            <Key {...createKeyProps('L', 'KeyL')} />
            <Key {...createKeyProps(';', 'Semicolon', ':')} />
            <Key {...createKeyProps("'", 'Quote', '"')} />
            <Key {...createKeyProps('Enter', 'Enter', undefined, true, '2.4u')} />
            <Key {...createKeyProps('Pg Up', 'PageUp', undefined, true)} />
          </KeyRow>

          {/* Bottom Alpha Row */}
          <KeyRow>
            <Key {...createKeyProps('Shift', 'ShiftLeft', undefined, true, '2.35u')} />
            <Key {...createKeyProps('Z', 'KeyZ')} />
            <Key {...createKeyProps('X', 'KeyX')} />
            <Key {...createKeyProps('C', 'KeyC')} />
            <Key {...createKeyProps('V', 'KeyV')} />
            <Key {...createKeyProps('B', 'KeyB')} />
            <Key {...createKeyProps('N', 'KeyN')} />
            <Key {...createKeyProps('M', 'KeyM')} />
            <Key {...createKeyProps(',', 'Comma', '<')} />
            <Key {...createKeyProps('.', 'Period', '>')} />
            <Key {...createKeyProps('/', 'Slash', '?')} />
            <Key {...createKeyProps('Shift', 'ShiftRight', undefined, true, '1.85u')} />
            <Key {...createKeyProps('↑', 'ArrowUp')} />
            <Key {...createKeyProps('Pg Dn', 'PageDown', undefined, true)} />
          </KeyRow>

          {/* Bottom Row */}
          <KeyRow>
            <Key {...createKeyProps('Ctrl', 'ControlLeft', undefined, true, '1.25u')} />
            <Key {...createKeyProps('Win', 'MetaLeft', undefined, true, '1.25u')} />
            <Key {...createKeyProps('Alt', 'AltLeft', undefined, true, '1.25u')} />
            <Key {...createKeyProps('', 'Space', undefined, false, '6.45u')} />
            <Key {...createKeyProps('Alt', 'AltRight', undefined, true, '1.2u')} />
            <Key {...createKeyProps('Win', 'MetaRight', undefined, true, '1.2u')} />
            <Key {...createKeyProps('Ctrl', 'ControlRight', undefined, true, '1.2u')} />
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
