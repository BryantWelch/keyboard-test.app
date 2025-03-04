import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Key, { KeySize } from './Key';
import { useKeyboardEvents } from './useKeyboardEvents';

interface KeyboardTKLProps {
  onKeyPress?: (key: string) => void;
  onReset?: () => void;
}

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

const KeyGroup = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 8px;
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

const KeyboardTKL: React.FC<KeyboardTKLProps> = ({ onKeyPress, onReset }) => {
  const [{ testedKeys, pressedKeys }, { handleKeyPress }] = useKeyboardEvents(onKeyPress, onReset);

  // Helper function to create key props
  const createKeyProps = (displayName: string, keyName: string, secondary?: string, isSpecial: boolean = false, width?: number) => {
    const props = {
      label: { primary: displayName, secondary },
      onKeyPress: () => handleKeyPress(keyName),
      isTested: testedKeys.has(keyName),
      isPressed: pressedKeys.has(keyName),
      isSpecialKey: isSpecial,
    };

    // Only add size if a width is provided, and map it to a valid KeySize
    if (width) {
      let size: KeySize;
      switch (width) {
        case 1.25:
          size = '1.25u';
          break;
        case 1.5:
          size = '1.5u';
          break;
        case 1.75:
          size = '1.75u';
          break;
        case 2:
          size = '2u';
          break;
        case 2.25:
          size = '2.25u';
          break;
        case 2.75:
          size = '2.75u';
          break;
        case 6.25:
          size = '6.25u';
          break;
        default:
          size = '1u';
      }
      return { ...props, size };
    }

    return props;
  };

  return (
    <KeyboardContainer
      variants={layoutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <KeyboardFrame>
        <KeyboardInner>
          {/* Row 1 - Function Row */}
          <KeyRow>
            <Key {...createKeyProps('Esc', 'Escape', undefined, true)} />
            <KeyGroup>
              <Key {...createKeyProps('F1', 'F1', undefined, true)} />
              <Key {...createKeyProps('F2', 'F2', undefined, true)} />
              <Key {...createKeyProps('F3', 'F3', undefined, true)} />
              <Key {...createKeyProps('F4', 'F4', undefined, true)} />
            </KeyGroup>
            <KeyGroup>
              <Key {...createKeyProps('F5', 'F5', undefined, true)} />
              <Key {...createKeyProps('F6', 'F6', undefined, true)} />
              <Key {...createKeyProps('F7', 'F7', undefined, true)} />
              <Key {...createKeyProps('F8', 'F8', undefined, true)} />
            </KeyGroup>
            <KeyGroup>
              <Key {...createKeyProps('F9', 'F9', undefined, true)} />
              <Key {...createKeyProps('F10', 'F10', undefined, true)} />
              <Key {...createKeyProps('F11', 'F11', undefined, true)} />
              <Key {...createKeyProps('F12', 'F12', undefined, true)} />
            </KeyGroup>
            <KeyGroup>
              <Key {...createKeyProps('PrtSc', 'PrintScreen', undefined, true)} />
              <Key {...createKeyProps('ScrLk', 'ScrollLock', undefined, true)} />
              <Key {...createKeyProps('Pause', 'Pause', undefined, true)} />
            </KeyGroup>
          </KeyRow>

          {/* Row 2 */}
          <KeyRow>
            <Key {...createKeyProps('`', 'Backquote', '~')} />
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
            <Key {...createKeyProps('Backspace', 'Backspace', undefined, true, 2)} />
            <KeyGroup>
              <Key {...createKeyProps('Ins', 'Insert', undefined, true)} />
              <Key {...createKeyProps('Home', 'Home', undefined, true)} />
              <Key {...createKeyProps('PgUp', 'PageUp', undefined, true)} />
            </KeyGroup>
          </KeyRow>

          {/* Row 3 */}
          <KeyRow>
            <Key {...createKeyProps('Tab', 'Tab', undefined, true, 1.5)} />
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
            <Key {...createKeyProps('\\', 'Backslash', '|', false, 1.5)} />
            <KeyGroup>
              <Key {...createKeyProps('Del', 'Delete', undefined, true)} />
              <Key {...createKeyProps('End', 'End', undefined, true)} />
              <Key {...createKeyProps('PgDn', 'PageDown', undefined, true)} />
            </KeyGroup>
          </KeyRow>

          {/* Row 4 */}
          <KeyRow>
            <Key {...createKeyProps('Caps', 'CapsLock', undefined, true, 1.75)} />
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
            <Key {...createKeyProps('\'', 'Quote', '"')} />
            <Key {...createKeyProps('Enter', 'Enter', undefined, true, 2.25)} />
          </KeyRow>

          {/* Row 5 */}
          <KeyRow>
            <Key {...createKeyProps('Shift', 'ShiftLeft', undefined, true, 2.25)} />
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
            <Key {...createKeyProps('Shift', 'ShiftRight', undefined, true, 2.75)} />
            <KeyGroup>
              <Key {...createKeyProps('↑', 'ArrowUp', undefined, true)} />
            </KeyGroup>
          </KeyRow>

          {/* Row 6 */}
          <KeyRow>
            <Key {...createKeyProps('Ctrl', 'ControlLeft', undefined, true, 1.25)} />
            <Key {...createKeyProps('Win', 'MetaLeft', undefined, true, 1.25)} />
            <Key {...createKeyProps('Alt', 'AltLeft', undefined, true, 1.25)} />
            <Key {...createKeyProps('Space', 'Space', undefined, false, 6.25)} />
            <Key {...createKeyProps('Alt', 'AltRight', undefined, true, 1.25)} />
            <Key {...createKeyProps('Win', 'MetaRight', undefined, true, 1.25)} />
            <Key {...createKeyProps('Menu', 'ContextMenu', undefined, true, 1.25)} />
            <Key {...createKeyProps('Ctrl', 'ControlRight', undefined, true, 1.25)} />
            <KeyGroup>
              <Key {...createKeyProps('←', 'ArrowLeft', undefined, true)} />
              <Key {...createKeyProps('↓', 'ArrowDown', undefined, true)} />
              <Key {...createKeyProps('→', 'ArrowRight', undefined, true)} />
            </KeyGroup>
          </KeyRow>
        </KeyboardInner>
      </KeyboardFrame>
    </KeyboardContainer>
  );
};

export default KeyboardTKL;
