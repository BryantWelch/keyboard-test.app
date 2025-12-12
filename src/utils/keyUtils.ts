/**
 * Shared utility functions for key name formatting
 */

/**
 * Format a key code/name for display
 */
export const formatKeyName = (key: string): string => {
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
