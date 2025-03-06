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
      
      // Use the event.code directly as our key name
      // This matches the key names used in the keyboard components
      const keyName = event.code;
      
      if (keyName) {
        handleKeyPress(keyName);
      }
    };

    const handleKeyUpEvent = (event: KeyboardEvent) => {
      event.preventDefault();
      
      // Use the event.code directly as our key name
      // This matches the key names used in the keyboard components
      const keyName = event.code;

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
