import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import TestContainer from './components/TestContainer/TestContainer';
import KeyHistory from './components/KeyHistory/KeyHistory';
import Footer from './components/Footer/Footer';
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const [keyHistory, setKeyHistory] = useState<string[]>([]);
  
  const handleKeyPress = useCallback((key: string) => {
    setKeyHistory(prev => [...prev, key]);
  }, []);

  const handleReset = useCallback(() => {
    setKeyHistory([]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <MainContent>
          <Navbar />
          <Header />
          <TestContainer onKeyPress={handleKeyPress} onReset={handleReset} />
          <KeyHistory keys={keyHistory} />
        </MainContent>
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
