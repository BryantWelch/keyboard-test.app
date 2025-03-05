import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

// Theme
import { theme } from './styles/theme';

// Components
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import TestContainer from './components/TestContainer/TestContainer';
import KeyHistory from './components/KeyHistory/KeyHistory';
import InfoSection from './components/InfoSection/InfoSection';
import Footer from './components/Footer/Footer';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 4.5rem; /* Add padding to account for the fixed navbar */
`;

const App: React.FC = () => {
  const [keyHistory, setKeyHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('keyTest');
  
  const handleKeyPress = useCallback((key: string) => {
    setKeyHistory(prev => [...prev, key]);
  }, []);

  const handleReset = useCallback(() => {
    setKeyHistory([]);
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    // Clear key history when switching tabs
    setKeyHistory([]);
  }, []);

  // Check if we're in a keyboard test-related tab (keyTest, layout, or type)
  const isKeyboardRelatedTab = ['keyTest', 'layout', 'type'].includes(activeTab);

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Navbar />
        <MainContent>
          <Header />
          <TestContainer 
            onKeyPress={handleKeyPress} 
            onReset={handleReset} 
            onTabChange={handleTabChange}
          />
          {isKeyboardRelatedTab && <KeyHistory keys={keyHistory} />}
          <InfoSection activeTab={activeTab} />
        </MainContent>
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
