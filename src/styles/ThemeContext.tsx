import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeName, themeMetadata } from './themeTypes';

// Define the theme interface
export interface Theme {
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    glass: string;
  };
  gradients: {
    logo: string;
    header: string;
  };
  shadows: {
    main: string;
    hover: string;
    navbar: string;
  };
  transitions: {
    default: string;
  };
  effects: {
    blur: string;
  };
}

// Create a default theme based on the original app theme
const defaultTheme: Theme = {
  colors: {
    text: '#d4d7f9',
    background: '#01030a',
    primary: '#7f8eee',
    secondary: '#9c1579',
    accent: '#e53d63',
    glass: 'rgba(1, 3, 10, 0.8)'
  },
  gradients: {
    logo: 'linear-gradient(to right, #7f8eee, #9c1579)',
    header: 'linear-gradient(to right, #7f8eee, #e53d63)'
  },
  shadows: {
    main: '0 4px 20px rgba(127, 142, 238, 0.15)',
    hover: '0 6px 25px rgba(127, 142, 238, 0.25)',
    navbar: '0 2px 10px rgba(0, 0, 0, 0.2)'
  },
  transitions: {
    default: '0.3s ease-in-out'
  },
  effects: {
    blur: 'blur(10px)'
  }
};

// Create the theme context
interface ThemeContextType {
  currentTheme: ThemeName;
  theme: Theme;
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'original',
  theme: defaultTheme,
  setTheme: () => {}
});

// Create the theme provider component
interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'keyboard-test-theme';

// Load saved theme from localStorage
const getSavedTheme = (): ThemeName => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && saved in themeMetadata) {
      return saved as ThemeName;
    }
  } catch {
    // localStorage not available
  }
  return 'original';
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getSavedTheme);
  const [theme, setThemeObject] = useState<Theme>(defaultTheme);

  const setTheme = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
    
    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch {
      // localStorage not available
    }
    
    // If it's the original theme, use the default theme
    if (themeName === 'original') {
      setThemeObject(defaultTheme);
      return;
    }
    
    // Get the theme metadata
    const meta = themeMetadata[themeName];
    
    // Create a new theme object based on the selected theme
    const newTheme: Theme = {
      colors: {
        text: meta.colors.text,
        background: meta.colors.background,
        primary: meta.colors.primary,
        secondary: meta.colors.secondary || meta.colors.primary,
        accent: meta.colors.accent || meta.colors.primary,
        glass: `rgba(${hexToRgb(meta.colors.background)}, 0.8)`
      },
      gradients: {
        logo: `linear-gradient(to right, ${meta.colors.primary}, ${meta.colors.secondary || meta.colors.primary})`,
        header: `linear-gradient(to right, ${meta.colors.primary}, ${meta.colors.accent || meta.colors.primary})`
      },
      shadows: {
        main: `0 4px 20px rgba(${hexToRgb(meta.colors.primary)}, 0.15)`,
        hover: `0 6px 25px rgba(${hexToRgb(meta.colors.primary)}, 0.25)`,
        navbar: '0 2px 10px rgba(0, 0, 0, 0.2)'
      },
      transitions: {
        default: '0.3s ease-in-out'
      },
      effects: {
        blur: 'blur(10px)'
      }
    };
    
    setThemeObject(newTheme);
  };

  // Apply saved theme on mount
  useEffect(() => {
    const savedTheme = getSavedTheme();
    if (savedTheme !== 'original') {
      setTheme(savedTheme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, setTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
