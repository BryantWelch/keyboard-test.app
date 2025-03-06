import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Key, { KeySize } from './Key';
import { useKeyboardEvents } from './useKeyboardEvents';
import { KeyboardLayoutType } from './keyboardTypes';

interface KeyboardFullProps {
  onKeyPress?: (key: string) => void;
  onReset?: () => void;
  keyboardType?: KeyboardLayoutType;
}

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  transform: scale(0.90);
  transform-origin: top center;
`;

const KeyboardFrame = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  padding: 10px;
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
  padding: 8px;
  border-radius: 8px;
  background: ${props => `${props.theme.colors.primary}15`};
  box-shadow: 
    inset 0 0 10px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => `${props.theme.colors.primary}30`};
`;

const KeyRow = styled.div`
  display: flex;
  gap: 1px;
  justify-content: flex-start;
  &:not(:last-child) {
    margin-bottom: 1px;
  }
`;

const KeyGroup = styled.div`
  display: flex;
  gap: 1px;
  margin-left: 4px;
`;

const NumpadGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-left: 4px;
  position: relative;
`;

const NumpadRow = styled.div`
  display: flex;
  gap: 1px;
`;

const MainAndNumpadRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;

// Special styled components for the numpad + and Enter keys
const NumpadPlusKey = styled.div`
  position: absolute;
  right: 0;
  top: 51px; /* Position after the first row */
  height: 102px; /* Height of 2 keys + gap */
`;

const NumpadEnterKey = styled.div`
  position: absolute;
  right: 0;
  top: 154px; /* Position after the third row */
  height: 102px; /* Height of 2 keys + gap */
`;

const KeyboardFull: React.FC<KeyboardFullProps> = ({ onKeyPress, onReset, keyboardType }) => {
  const [{ testedKeys, pressedKeys }, { handleKeyPress }] = useKeyboardEvents(onKeyPress, onReset);

  // Helper function to create key props
  const createKeyProps = (displayName: string, keyName: string, secondary?: string, isSpecial: boolean = false, width?: number) => {
    const props = {
      label: { primary: displayName, secondary },
      onKeyPress: () => handleKeyPress(keyName),
      isTested: testedKeys.has(keyName),
      isPressed: pressedKeys.has(keyName),
      isSpecialKey: isSpecial,
      keyboardType,
    };

    // Only add size if a width is provided
    if (width) {
      // Convert the width number to the corresponding KeySize string format
      // This handles any width from 1 to 7 in 0.05 increments
      const sizeKey = `${width}u` as KeySize;
      return { ...props, size: sizeKey };
    }

    return props;
  };

  // Animation variants for the keyboard frame
  const frameVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <KeyboardContainer>
      <KeyboardFrame
        initial="initial"
        animate="animate"
        variants={frameVariants}
      >
        <KeyboardInner>
          {/* Row 1 - Function Row */}
          <KeyRow>
            <Key {...createKeyProps('ESC', 'Escape', undefined, true)} />
            <div style={{ width: '50px' }}></div>
            <KeyGroup>
              <Key {...createKeyProps('F1', 'F1', undefined, true)} />
              <Key {...createKeyProps('F2', 'F2', undefined, true)} />
              <Key {...createKeyProps('F3', 'F3', undefined, true)} />
              <Key {...createKeyProps('F4', 'F4', undefined, true)} />
            </KeyGroup>
            <div style={{ width: '20px' }}></div>
            <KeyGroup>
              <Key {...createKeyProps('F5', 'F5', undefined, true)} />
              <Key {...createKeyProps('F6', 'F6', undefined, true)} />
              <Key {...createKeyProps('F7', 'F7', undefined, true)} />
              <Key {...createKeyProps('F8', 'F8', undefined, true)} />
            </KeyGroup>
            <div style={{ width: '20px' }}></div>
            <KeyGroup>
              <Key {...createKeyProps('F9', 'F9', undefined, true)} />
              <Key {...createKeyProps('F10', 'F10', undefined, true)} />
              <Key {...createKeyProps('F11', 'F11', undefined, true)} />
              <Key {...createKeyProps('F12', 'F12', undefined, true)} />
            </KeyGroup>
            <KeyGroup>
              <Key {...createKeyProps('Prt Sc', 'PrintScreen', undefined, true)} />
              <Key {...createKeyProps('Scr Lk', 'ScrollLock', undefined, true)} />
              <Key {...createKeyProps('Pause', 'Pause', undefined, true)} />
            </KeyGroup>
          </KeyRow>

          {/* Main keyboard and numpad */}
          <MainAndNumpadRow>
            {/* Main keyboard section */}
            <div>
              {/* Row 2 - Number row */}
              <KeyRow>
                <Key {...createKeyProps('`', 'Backquote', '~', true)} />
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
              </KeyRow>

              {/* Row 3 - QWERTY row */}
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
                <Key {...createKeyProps('\\', 'Backslash', '|', true, 1.4)} />
              </KeyRow>

              {/* Row 4 - ASDF row */}
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

              {/* Row 5 - ZXCV row */}
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
              </KeyRow>

              {/* Row 6 - Bottom row */}
              <KeyRow>
                <Key {...createKeyProps('Ctrl', 'ControlLeft', undefined, true, 1.25)} />
                <Key {...createKeyProps('Win', 'MetaLeft', undefined, true, 1.25)} />
                <Key {...createKeyProps('Alt', 'AltLeft', undefined, true, 1.25)} />
                <Key {...createKeyProps('Space', 'Space', undefined, false, 6.65)} />
                <Key {...createKeyProps('Alt', 'AltRight', undefined, true, 1.25)} />
                <Key {...createKeyProps('Win', 'MetaRight', undefined, true, 1.25)} />
                <Key {...createKeyProps('Menu', 'ContextMenu', undefined, true, 1.25)} />
                <Key {...createKeyProps('Ctrl', 'ControlRight', undefined, true, 1.25)} />
              </KeyRow>
            </div>

            {/* Navigation keys section */}
            <div>
              <KeyRow>
                <Key {...createKeyProps('Insert', 'Insert', undefined, true)} />
                <Key {...createKeyProps('Home', 'Home', undefined, true)} />
                <Key {...createKeyProps('Pg Up', 'PageUp', undefined, true)} />
              </KeyRow>
              <KeyRow>
                <Key {...createKeyProps('Delete', 'Delete', undefined, true)} />
                <Key {...createKeyProps('End', 'End', undefined, true)} />
                <Key {...createKeyProps('Pg Dn', 'PageDown', undefined, true)} />
              </KeyRow>
                
              {/* Arrow keys in inverted T layout */}
              <div style={{ marginTop: '55px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                  <div style={{ width: '54px' }}></div>
                  <Key {...createKeyProps('↑', 'ArrowUp', undefined, false)} />
                  <div style={{ width: '54px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Key {...createKeyProps('←', 'ArrowLeft', undefined, false)} />
                  <Key {...createKeyProps('↓', 'ArrowDown', undefined, false)} />
                  <Key {...createKeyProps('→', 'ArrowRight', undefined, false)} />
                </div>
              </div>
            </div>

            {/* Numpad section */}
            <NumpadGroup>
              <NumpadRow>
                <Key {...createKeyProps('Num Lk', 'NumLock', undefined, true)} />
                <Key {...createKeyProps('/', 'NumpadDivide')} />
                <Key {...createKeyProps('*', 'NumpadMultiply')} />
                <Key {...createKeyProps('-', 'NumpadSubtract')} />
              </NumpadRow>
              <NumpadRow>
                <Key {...createKeyProps('7', 'Numpad7', 'Home')} />
                <Key {...createKeyProps('8', 'Numpad8', '↑')} />
                <Key {...createKeyProps('9', 'Numpad9', 'PgUp')} />
              </NumpadRow>
              <NumpadRow>
                <Key {...createKeyProps('4', 'Numpad4', '←')} />
                <Key {...createKeyProps('5', 'Numpad5')} />
                <Key {...createKeyProps('6', 'Numpad6', '→')} />
              </NumpadRow>
              <NumpadRow>
                <Key {...createKeyProps('1', 'Numpad1', 'End')} />
                <Key {...createKeyProps('2', 'Numpad2', '↓')} />
                <Key {...createKeyProps('3', 'Numpad3', 'PgDn')} />
              </NumpadRow>
              <NumpadRow>
                <Key {...createKeyProps('0', 'Numpad0', 'Ins', false, 2.1)} />
                <Key {...createKeyProps('.', 'NumpadDecimal', 'Del')} />
              </NumpadRow>
              
              {/* Vertical keys */}
              <NumpadPlusKey>
                <Key 
                  {...createKeyProps('+', 'NumpadAdd')} 
                  style={{ height: '102px' }}
                />
              </NumpadPlusKey>
              
              <NumpadEnterKey>
                <Key 
                  {...createKeyProps('Enter', 'NumpadEnter', undefined, true)} 
                  style={{ height: '115px' }}
                />
              </NumpadEnterKey>
            </NumpadGroup>
          </MainAndNumpadRow>
        </KeyboardInner>
      </KeyboardFrame>
    </KeyboardContainer>
  );
};

export default KeyboardFull;
