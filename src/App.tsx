import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import TestContainer from './components/TestContainer/TestContainer';
import KeyHistory from './components/KeyHistory/KeyHistory';

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  color: ${props => props.theme.colors.text};
`;

const App: React.FC = () => {
  const [keyHistory, setKeyHistory] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setKeyHistory(prev => [...prev, event.key]);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />
        <Header />
        <TestContainer />
        <KeyHistory keys={keyHistory} />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
