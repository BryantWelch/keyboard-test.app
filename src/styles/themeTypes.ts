// Theme type definitions
export type ThemeName = 
  | 'original'
  | '1976' 
  | '8008' 
  | '9009' 
  | 'aurora' 
  | 'burgundy' 
  | 'carbon' 
  | 'dark' 
  | 'denim' 
  | 'dots' 
  | 'dracula' 
  | 'eclipse' 
  | 'gruvbox' 
  | 'handarbeit' 
  | 'honeywell' 
  | 'hyperfuse' 
  | 'kobayashi' 
  | 'light' 
  | 'mizu' 
  | 'moderndolch' 
  | 'monokai' 
  | 'nautilus' 
  | 'nord' 
  | 'oblivion' 
  | 'olivia' 
  | 'phantom' 
  | 'rama' 
  | 'sakura' 
  | 'serika' 
  | 'solarizedlight' 
  | 'vilebloom' 
  | 'yuri' 
  | 'godspeed' 
  | 'leviathan';

// Theme metadata for display
export interface ThemeMetadata {
  name: string;
  description: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary?: string;
    accent?: string;
  };
}

// Theme definitions with display names and colors for preview
export const themeMetadata: Record<ThemeName, ThemeMetadata> = {
  'original': {
    name: 'Original',
    description: 'The original keyboard-test.app theme',
    colors: {
      background: '#01030a',
      text: '#d4d7f9',
      primary: '#7f8eee',
      secondary: '#9c1579',
      accent: '#e53d63'
    }
  },
  '1976': {
    name: '1976',
    description: 'Inspired by the iconic 1976 color scheme',
    colors: {
      background: '#e8ca5f',
      text: '#2a2426',
      primary: '#de4f35',
      secondary: '#7ec0ee',
      accent: '#78b354'
    }
  },
  '8008': {
    name: '8008',
    description: 'Inspired by GMK 8008 keycaps',
    colors: {
      background: '#333a45',
      text: '#e9ecf0',
      primary: '#ff656f',
      secondary: '#a2b5c8',
      accent: '#ff656f'
    }
  },
  '9009': {
    name: '9009',
    description: 'Inspired by GMK 9009 keycaps',
    colors: {
      background: '#d8d2c3',
      text: '#2b2b2b',
      primary: '#75b798',
      secondary: '#e49b7e',
      accent: '#cc7c7e'
    }
  },
  'aurora': {
    name: 'Aurora',
    description: 'Vibrant colors inspired by the aurora borealis',
    colors: {
      background: '#011926',
      text: '#ffffff',
      primary: '#00e980',
      secondary: '#00bfff',
      accent: '#bf7bfd'
    }
  },
  'burgundy': {
    name: 'Burgundy',
    description: 'Deep burgundy tones with gold accents',
    colors: {
      background: '#2d2424',
      text: '#e4cbb4',
      primary: '#8e2f2f',
      secondary: '#bb4545',
      accent: '#e4cbb4'
    }
  },
  'carbon': {
    name: 'Carbon',
    description: 'Dark carbon fiber inspired theme',
    colors: {
      background: '#313131',
      text: '#e4e4e4',
      primary: '#f66e0d',
      secondary: '#8a8a8a',
      accent: '#f66e0d'
    }
  },
  'dark': {
    name: 'Dark',
    description: 'Classic dark theme with high contrast',
    colors: {
      background: '#111111',
      text: '#e7e7e7',
      primary: '#e7e7e7',
      secondary: '#999999',
      accent: '#ff5252'
    }
  },
  'denim': {
    name: 'Denim',
    description: 'Inspired by denim fabric colors',
    colors: {
      background: '#3b4252',
      text: '#eceff4',
      primary: '#81a1c1',
      secondary: '#5e81ac',
      accent: '#d08770'
    }
  },
  'dots': {
    name: 'Dots',
    description: 'Dark theme with colorful accents',
    colors: {
      background: '#1e1e1e',
      text: '#e7e7e7',
      primary: '#e3242b',
      secondary: '#2b2b2b',
      accent: '#e3242b'
    }
  },
  'dracula': {
    name: 'Dracula',
    description: 'Popular dark theme with vibrant colors',
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      primary: '#bd93f9',
      secondary: '#8be9fd',
      accent: '#ff79c6'
    }
  },
  'eclipse': {
    name: 'Eclipse',
    description: 'Dark blue theme inspired by eclipses',
    colors: {
      background: '#3b4252',
      text: '#d8dee9',
      primary: '#81a1c1',
      secondary: '#5e81ac',
      accent: '#bf616a'
    }
  },
  'gruvbox': {
    name: 'Gruvbox',
    description: 'Retro groove color scheme',
    colors: {
      background: '#282828',
      text: '#ebdbb2',
      primary: '#d79921',
      secondary: '#98971a',
      accent: '#cc241d'
    }
  },
  'handarbeit': {
    name: 'Handarbeit',
    description: 'Colorful theme inspired by handcraft',
    colors: {
      background: '#232323',
      text: '#ffffff',
      primary: '#f44c7f',
      secondary: '#f9cc6c',
      accent: '#2d9cdb'
    }
  },
  'honeywell': {
    name: 'Honeywell',
    description: 'Inspired by vintage Honeywell terminals',
    colors: {
      background: '#e8e8e8',
      text: '#444444',
      primary: '#d33a2c',
      secondary: '#999999',
      accent: '#d33a2c'
    }
  },
  'hyperfuse': {
    name: 'Hyperfuse',
    description: 'Purple and teal fusion theme',
    colors: {
      background: '#222222',
      text: '#d9d7d6',
      primary: '#a37acc',
      secondary: '#4ec9b0',
      accent: '#a37acc'
    }
  },
  'kobayashi': {
    name: 'Kobayashi',
    description: 'Bright and vibrant yellow theme',
    colors: {
      background: '#1f1f1f',
      text: '#ffffff',
      primary: '#ffde00',
      secondary: '#ff9900',
      accent: '#ffde00'
    }
  },
  'light': {
    name: 'Light',
    description: 'Clean light theme with subtle accents',
    colors: {
      background: '#f5f5f5',
      text: '#2a2a2a',
      primary: '#2a2a2a',
      secondary: '#777777',
      accent: '#4a6ee0'
    }
  },
  'mizu': {
    name: 'Mizu',
    description: 'Calm blue theme inspired by water',
    colors: {
      background: '#253746',
      text: '#c2ccd0',
      primary: '#81c4dd',
      secondary: '#5a8faf',
      accent: '#ffccaa'
    }
  },
  'moderndolch': {
    name: 'Modern Dolch',
    description: 'Modern take on the classic Dolch colorway',
    colors: {
      background: '#2d2e30',
      text: '#e3e6eb',
      primary: '#7eddd3',
      secondary: '#54585c',
      accent: '#7eddd3'
    }
  },
  'monokai': {
    name: 'Monokai',
    description: 'Popular code editor theme with bright colors',
    colors: {
      background: '#272822',
      text: '#f8f8f2',
      primary: '#a6e22e',
      secondary: '#66d9ef',
      accent: '#f92672'
    }
  },
  'nautilus': {
    name: 'Nautilus',
    description: 'Deep blue theme inspired by the ocean',
    colors: {
      background: '#132237',
      text: '#ebb723',
      primary: '#0b4c6c',
      secondary: '#1a6e9d',
      accent: '#ebb723'
    }
  },
  'nord': {
    name: 'Nord',
    description: 'Arctic, north-bluish color palette',
    colors: {
      background: '#2e3440',
      text: '#eceff4',
      primary: '#88c0d0',
      secondary: '#81a1c1',
      accent: '#b48ead'
    }
  },
  'oblivion': {
    name: 'Oblivion',
    description: 'Dark gray theme with orange accents',
    colors: {
      background: '#313231',
      text: '#93c7c9',
      primary: '#ff9800',
      secondary: '#5b5f5b',
      accent: '#ff9800'
    }
  },
  'olivia': {
    name: 'Olivia',
    description: 'Warm black and pink theme',
    colors: {
      background: '#2a2a2a',
      text: '#e8c4b8',
      primary: '#e8c4b8',
      secondary: '#646464',
      accent: '#c19c88'
    }
  },
  'phantom': {
    name: 'Phantom',
    description: 'Deep purple theme with subtle accents',
    colors: {
      background: '#211333',
      text: '#ecf0f1',
      primary: '#b935f5',
      secondary: '#7a5980',
      accent: '#b935f5'
    }
  },
  'rama': {
    name: 'Rama',
    description: 'Minimalist light theme with subtle colors',
    colors: {
      background: '#eaeaea',
      text: '#2a2a2a',
      primary: '#ffd17f',
      secondary: '#c4c4c4',
      accent: '#ffd17f'
    }
  },
  'sakura': {
    name: 'Sakura',
    description: 'Soft pink theme inspired by cherry blossoms',
    colors: {
      background: '#ffd7e7',
      text: '#444444',
      primary: '#ff8ab3',
      secondary: '#ffb8d1',
      accent: '#ff8ab3'
    }
  },
  'serika': {
    name: 'Serika',
    description: 'Yellow and gray theme with high contrast',
    colors: {
      background: '#ece9d4',
      text: '#323437',
      primary: '#e1ad01',
      secondary: '#7c7c7c',
      accent: '#e1ad01'
    }
  },
  'solarizedlight': {
    name: 'Solarized Light',
    description: 'Precision colors for machines and people',
    colors: {
      background: '#fdf6e3',
      text: '#586e75',
      primary: '#268bd2',
      secondary: '#859900',
      accent: '#d33682'
    }
  },
  'vilebloom': {
    name: 'Vilebloom',
    description: 'Gradient inspired by sunrise colors',
    colors: {
      background: '#243949',
      text: '#ffffff',
      primary: '#ff6d92',
      secondary: '#5e9ca1',
      accent: '#ff6d92'
    }
  },
  'yuri': {
    name: 'Yuri',
    description: 'Blue and orange theme with high contrast',
    colors: {
      background: '#2b3c5a',
      text: '#ffffff',
      primary: '#f05e23',
      secondary: '#4c6794',
      accent: '#f05e23'
    }
  },
  'godspeed': {
    name: 'Godspeed',
    description: 'Space-inspired yellow and blue theme',
    colors: {
      background: '#fef2d5',
      text: '#323437',
      primary: '#f7c85e',
      secondary: '#7c7c7c',
      accent: '#0b6ea5'
    }
  },
  'leviathan': {
    name: 'Leviathan',
    description: 'Deep sea inspired dark blue theme',
    colors: {
      background: '#1a1a2e',
      text: '#a4c2f4',
      primary: '#4b8bbf',
      secondary: '#2d4b6e',
      accent: '#a4c2f4'
    }
  }
};
