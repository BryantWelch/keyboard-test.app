// Keyboard type mappings for different keyboard layouts
// This file contains the character mappings for QWERTY, Dvorak, and Colemak layouts

export type KeyboardLayoutType = 'qwerty' | 'dvorak' | 'colemak';

// Define interfaces for our key mappings
interface KeyMapping {
  primary: string;
  secondary?: string;
}

// Type for our mapping objects
export type KeyboardTypeMapping = Record<string, KeyMapping>;

// QWERTY layout (default) - this is just for reference as we'll keep the original labels for QWERTY
export const qwertyMapping: KeyboardTypeMapping = {
  // We don't need to define anything here as QWERTY is the default
  // This is just for reference
};

// Dvorak layout
export const dvorakMapping: KeyboardTypeMapping = {
  // Number row remains the same
  // Top row
  'Q': { primary: "'", secondary: '"' },
  'W': { primary: ',', secondary: '<' },
  'E': { primary: '.', secondary: '>' },
  'R': { primary: 'P', secondary: undefined },
  'T': { primary: 'Y', secondary: undefined },
  'Y': { primary: 'F', secondary: undefined },
  'U': { primary: 'G', secondary: undefined },
  'I': { primary: 'C', secondary: undefined },
  'O': { primary: 'R', secondary: undefined },
  'P': { primary: 'L', secondary: undefined },
  '[': { primary: '/', secondary: '?' },
  ']': { primary: '=', secondary: '+' },
  
  // Middle row
  'A': { primary: 'A', secondary: undefined },
  'S': { primary: 'O', secondary: undefined },
  'D': { primary: 'E', secondary: undefined },
  'F': { primary: 'U', secondary: undefined },
  'G': { primary: 'I', secondary: undefined },
  'H': { primary: 'D', secondary: undefined },
  'J': { primary: 'H', secondary: undefined },
  'K': { primary: 'T', secondary: undefined },
  'L': { primary: 'N', secondary: undefined },
  ';': { primary: 'S', secondary: undefined },
  "'": { primary: '-', secondary: '_' },
  
  // Bottom row
  'Z': { primary: ';', secondary: ':' },
  'X': { primary: 'Q', secondary: undefined },
  'C': { primary: 'J', secondary: undefined },
  'V': { primary: 'K', secondary: undefined },
  'B': { primary: 'X', secondary: undefined },
  'N': { primary: 'B', secondary: undefined },
  'M': { primary: 'M', secondary: undefined },
  ',': { primary: 'W', secondary: undefined },
  '.': { primary: 'V', secondary: undefined },
  '/': { primary: 'Z', secondary: undefined }
};

// Colemak layout
export const colemakMapping: KeyboardTypeMapping = {
  // Number row remains the same
  // Top row
  'Q': { primary: 'Q', secondary: undefined },
  'W': { primary: 'W', secondary: undefined },
  'E': { primary: 'F', secondary: undefined },
  'R': { primary: 'P', secondary: undefined },
  'T': { primary: 'G', secondary: undefined },
  'Y': { primary: 'J', secondary: undefined },
  'U': { primary: 'L', secondary: undefined },
  'I': { primary: 'U', secondary: undefined },
  'O': { primary: 'Y', secondary: undefined },
  'P': { primary: ';', secondary: ':' },
  
  // Middle row
  'A': { primary: 'A', secondary: undefined },
  'S': { primary: 'R', secondary: undefined },
  'D': { primary: 'S', secondary: undefined },
  'F': { primary: 'T', secondary: undefined },
  'G': { primary: 'D', secondary: undefined },
  'H': { primary: 'H', secondary: undefined },
  'J': { primary: 'N', secondary: undefined },
  'K': { primary: 'E', secondary: undefined },
  'L': { primary: 'I', secondary: undefined },
  ';': { primary: 'O', secondary: undefined },
  
  // Bottom row
  'Z': { primary: 'Z', secondary: undefined },
  'X': { primary: 'X', secondary: undefined },
  'C': { primary: 'C', secondary: undefined },
  'V': { primary: 'V', secondary: undefined },
  'B': { primary: 'B', secondary: undefined },
  'N': { primary: 'K', secondary: undefined },
  'M': { primary: 'M', secondary: undefined }
};

// Function to get the appropriate mapping based on the keyboard type
export const getKeyMapping = (type: KeyboardLayoutType, key: string, defaultMapping: KeyMapping): KeyMapping => {
  switch (type) {
    case 'dvorak':
      return dvorakMapping[key] || defaultMapping;
    case 'colemak':
      return colemakMapping[key] || defaultMapping;
    case 'qwerty':
    default:
      return defaultMapping;
  }
};
