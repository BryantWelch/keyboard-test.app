import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

// Theme
import { ThemeProvider } from './styles/ThemeContext';

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
  background:
    radial-gradient(900px 420px at 50% -120px, ${props => props.theme.colors.primary}24, transparent 60%),
    ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: min(1240px, 100%);
  min-width: 0;
  margin: 0 auto;
  padding: 4.25rem 1rem 0;

  @media (max-width: 720px) {
    padding: 4rem 0.65rem 0;
  }
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
  const isKeyboardRelatedTab = ['keyTest', 'layout', 'type', 'themes'].includes(activeTab);

  return (
    <ThemeProvider>
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
