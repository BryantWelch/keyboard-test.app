// Keyboard type mappings for different keyboard layouts
// This file contains the character mappings for QWERTY, Dvorak, and Colemak layouts

export type KeyboardLayoutType = 'qwerty' | 'dvorak' | 'colemak' | 'workman' | 'azerty' | 'qwertz' | 'colemak-dh';

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

// Workman layout
export const workmanMapping: KeyboardTypeMapping = {
  // Number row remains the same
  // Top row
  'Q': { primary: 'Q', secondary: undefined },
  'W': { primary: 'D', secondary: undefined },
  'E': { primary: 'R', secondary: undefined },
  'R': { primary: 'W', secondary: undefined },
  'T': { primary: 'B', secondary: undefined },
  'Y': { primary: 'J', secondary: undefined },
  'U': { primary: 'F', secondary: undefined },
  'I': { primary: 'U', secondary: undefined },
  'O': { primary: 'P', secondary: undefined },
  'P': { primary: ';', secondary: ':' },
  
  // Middle row
  'A': { primary: 'A', secondary: undefined },
  'S': { primary: 'S', secondary: undefined },
  'D': { primary: 'H', secondary: undefined },
  'F': { primary: 'T', secondary: undefined },
  'G': { primary: 'G', secondary: undefined },
  'H': { primary: 'Y', secondary: undefined },
  'J': { primary: 'N', secondary: undefined },
  'K': { primary: 'E', secondary: undefined },
  'L': { primary: 'O', secondary: undefined },
  ';': { primary: 'I', secondary: undefined },
  
  // Bottom row
  'Z': { primary: 'Z', secondary: undefined },
  'X': { primary: 'X', secondary: undefined },
  'C': { primary: 'M', secondary: undefined },
  'V': { primary: 'C', secondary: undefined },
  'B': { primary: 'V', secondary: undefined },
  'N': { primary: 'K', secondary: undefined },
  'M': { primary: 'L', secondary: undefined }
};

// AZERTY layout (French)
export const azertyMapping: KeyboardTypeMapping = {
  // Number row
  '1': { primary: '&', secondary: '1' },
  '2': { primary: 'é', secondary: '2' },
  '3': { primary: '"', secondary: '3' },
  '4': { primary: "'", secondary: '4' },
  '5': { primary: '(', secondary: '5' },
  '6': { primary: '-', secondary: '6' },
  '7': { primary: 'è', secondary: '7' },
  '8': { primary: '_', secondary: '8' },
  '9': { primary: 'ç', secondary: '9' },
  '0': { primary: 'à', secondary: '0' },
  '-': { primary: ')', secondary: '°' },
  '=': { primary: '=', secondary: '+' },
  
  // Top row
  'Q': { primary: 'A', secondary: undefined },
  'W': { primary: 'Z', secondary: undefined },
  'E': { primary: 'E', secondary: '€' },
  'R': { primary: 'R', secondary: undefined },
  'T': { primary: 'T', secondary: undefined },
  'Y': { primary: 'Y', secondary: undefined },
  'U': { primary: 'U', secondary: undefined },
  'I': { primary: 'I', secondary: undefined },
  'O': { primary: 'O', secondary: undefined },
  'P': { primary: 'P', secondary: undefined },
  '[': { primary: '^', secondary: '¨' },
  ']': { primary: '$', secondary: '£' },
  
  // Middle row
  'A': { primary: 'Q', secondary: undefined },
  'S': { primary: 'S', secondary: undefined },
  'D': { primary: 'D', secondary: undefined },
  'F': { primary: 'F', secondary: undefined },
  'G': { primary: 'G', secondary: undefined },
  'H': { primary: 'H', secondary: undefined },
  'J': { primary: 'J', secondary: undefined },
  'K': { primary: 'K', secondary: undefined },
  'L': { primary: 'L', secondary: undefined },
  ';': { primary: 'M', secondary: undefined },
  "'": { primary: 'ù', secondary: '%' },
  
  // Bottom row
  'Z': { primary: 'W', secondary: undefined },
  'X': { primary: 'X', secondary: undefined },
  'C': { primary: 'C', secondary: undefined },
  'V': { primary: 'V', secondary: undefined },
  'B': { primary: 'B', secondary: undefined },
  'N': { primary: 'N', secondary: undefined },
  'M': { primary: ',', secondary: '?' },
  ',': { primary: ';', secondary: '.' },
  '.': { primary: ':', secondary: '/' },
  '/': { primary: '!', secondary: '§' }
};

// QWERTZ layout (German)
export const qwertzMapping: KeyboardTypeMapping = {
  // Top row
  'Y': { primary: 'Z', secondary: undefined },
  'Z': { primary: 'Y', secondary: undefined },
  
  // Other keys specific to QWERTZ
  '[': { primary: 'ü', secondary: 'Ü' },
  ']': { primary: '+', secondary: '*' },
  ';': { primary: 'ö', secondary: 'Ö' },
  "'": { primary: 'ä', secondary: 'Ä' },
  '-': { primary: 'ß', secondary: '?' },
  
  // Number row special characters
  '1': { primary: '1', secondary: '!' },
  '2': { primary: '2', secondary: '"' },
  '3': { primary: '3', secondary: '§' },
  '4': { primary: '4', secondary: '$' },
  '5': { primary: '5', secondary: '%' },
  '6': { primary: '6', secondary: '&' },
  '7': { primary: '7', secondary: '/' },
  '8': { primary: '8', secondary: '(' },
  '9': { primary: '9', secondary: ')' },
  '0': { primary: '0', secondary: '=' }
};

// Colemak-DH layout (Colemak mod-DH)
export const colemakDHMapping: KeyboardTypeMapping = {
  // Based on Colemak but with D and H positions modified
  // Top row
  'Q': { primary: 'Q', secondary: undefined },
  'W': { primary: 'W', secondary: undefined },
  'E': { primary: 'F', secondary: undefined },
  'R': { primary: 'P', secondary: undefined },
  'T': { primary: 'B', secondary: undefined },
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
  'G': { primary: 'G', secondary: undefined },
  'H': { primary: 'M', secondary: undefined },
  'J': { primary: 'N', secondary: undefined },
  'K': { primary: 'E', secondary: undefined },
  'L': { primary: 'I', secondary: undefined },
  ';': { primary: 'O', secondary: undefined },
  
  // Bottom row
  'Z': { primary: 'Z', secondary: undefined },
  'X': { primary: 'X', secondary: undefined },
  'C': { primary: 'C', secondary: undefined },
  'V': { primary: 'D', secondary: undefined },
  'B': { primary: 'V', secondary: undefined },
  'N': { primary: 'K', secondary: undefined },
  'M': { primary: 'H', secondary: undefined }
};

// Function to get the appropriate mapping based on the keyboard type
export const getKeyMapping = (type: KeyboardLayoutType, key: string, defaultMapping: KeyMapping): KeyMapping => {
  switch (type) {
    case 'dvorak':
      return dvorakMapping[key] || defaultMapping;
    case 'colemak':
      return colemakMapping[key] || defaultMapping;
    case 'workman':
      return workmanMapping[key] || defaultMapping;
    case 'azerty':
      return azertyMapping[key] || defaultMapping;
    case 'qwertz':
      return qwertzMapping[key] || defaultMapping;
    case 'colemak-dh':
      return colemakDHMapping[key] || defaultMapping;
    case 'qwerty':
    default:
      return defaultMapping;
  }
};
