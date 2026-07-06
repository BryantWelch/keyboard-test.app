/**
 * Shared utility functions for key name formatting
 */

/**
 * Format a key code/name for display
 */
export const formatKeyName = (key: string): string => {
  if (/^Key[A-Z]$/.test(key)) {
    return key.replace('Key', '');
  }

  if (/^Digit[0-9]$/.test(key)) {
    return key.replace('Digit', '');
  }

  if (/^Numpad[0-9]$/.test(key)) {
    return key.replace('Numpad', 'Numpad ');
  }

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
    case 'ShiftLeft':
      return 'L-Shift';
    case 'R-Shift':
    case 'ShiftRight':
      return 'R-Shift';
    case 'L-Ctrl':
    case 'ControlLeft':
      return 'L-Ctrl';
    case 'R-Ctrl':
    case 'ControlRight':
      return 'R-Ctrl';
    case 'L-Alt':
    case 'AltLeft':
      return 'L-Alt';
    case 'R-Alt':
    case 'AltRight':
      return 'R-Alt';
    case 'Control':
      return 'Ctrl';
    case 'Meta':
    case 'MetaLeft':
    case 'MetaRight':
      return 'Win';
    case 'Space':
      return 'Space';
    case 'Backquote':
      return '`';
    case 'Minus':
      return '-';
    case 'Equal':
      return '=';
    case 'BracketLeft':
      return '[';
    case 'BracketRight':
      return ']';
    case 'Backslash':
      return '\\';
    case 'Semicolon':
      return ';';
    case 'Quote':
      return "'";
    case 'Comma':
      return ',';
    case 'Period':
      return '.';
    case 'Slash':
      return '/';
    default:
      return key;
  }
};
