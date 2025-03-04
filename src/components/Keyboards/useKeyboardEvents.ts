import { useState, useEffect, useCallback } from 'react';

export interface KeyboardState {
  testedKeys: Set<string>;
  pressedKeys: Set<string>;
}

export interface KeyboardActions {
  handleKeyPress: (key: string) => void;
  handleReset: () => void;
}

export const useKeyboardEvents = (
  onKeyPress?: (key: string) => void,
  onReset?: () => void
): [KeyboardState, KeyboardActions] => {
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set());
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleReset = useCallback(() => {
    // Create new empty sets to ensure complete reset
    setTestedKeys(new Set());
    setPressedKeys(new Set());
    
    // Call the parent onReset callback if provided
    onReset?.();
  }, [onReset]);

  const handleKeyPress = useCallback((key: string) => {
    setTestedKeys(prev => new Set(prev).add(key));
    setPressedKeys(prev => new Set(prev).add(key));
    onKeyPress?.(key);
  }, [onKeyPress]);

  const handleKeyUp = useCallback((key: string) => {
    setPressedKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(key);
      return newKeys;
    });
  }, []);

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
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
        handleKeyPress(keyName);
      }
    };

    const handleKeyUpEvent = (event: KeyboardEvent) => {
      event.preventDefault();

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
        handleKeyUp(keyName);
      }
    };

    window.addEventListener('keydown', handleKeyDownEvent);
    window.addEventListener('keyup', handleKeyUpEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
      window.removeEventListener('keyup', handleKeyUpEvent);
    };
  }, [handleKeyPress, handleKeyUp]);

  return [
    { testedKeys, pressedKeys },
    { handleKeyPress, handleReset }
  ];
};
