import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
  });
});
