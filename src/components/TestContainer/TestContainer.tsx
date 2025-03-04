import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyboardSelector, KeyboardType } from '../Keyboards';

interface TestContainerProps {
  onKeyPress?: (key: string) => void;
  onReset?: () => void;
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  margin: 2rem auto;
  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  position: relative;
  box-shadow: ${props => props.theme.shadows.main};
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const TabContainer = styled.div<{ position: 'top' | 'bottom' }>`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  ${props => props.position === 'bottom' ? 'border-top' : 'border-bottom'}: 1px solid ${props => props.theme.colors.primary}40;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : `${props.theme.colors.primary}20`};
  }
`;

const ContentArea = styled(motion.div)`
  padding: 2rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const LayoutPreview = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  h3 {
    color: ${props => props.theme.colors.text};
    margin-top: 0;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
`;

const LayoutCard = styled.div<{ active: boolean }>`
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary + '40'};
  background: ${props => props.active ? props.theme.colors.primary + '20' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary + '30' : props.theme.colors.primary + '10'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.text + 'cc'};
  }
`;

const ResetButton = styled(Tab)`
  margin-left: auto; /* Push to the right */
  background: ${props => props.theme.colors.primary}20;
  
  &:hover {
    background: ${props => props.theme.colors.primary}40;
  }
  
  &:active {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
    transform: scale(0.98);
  }
`;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    position: "absolute" as const
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    position: "relative" as const
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    zIndex: 0,
    position: "absolute" as const
  })
};

interface TabData {
  id: string;
  label: string;
  onClick: () => void;
}

const TestContainer: React.FC<TestContainerProps> = ({ onKeyPress, onReset }) => {
  const [activeTab, setActiveTab] = useState('keyTest');
  const [direction, setDirection] = useState(0);
  const [currentLayout, setCurrentLayout] = useState<KeyboardType>('75%');
  const [keyboardKey, setKeyboardKey] = useState(0);

  const handleTabClick = (tabId: string) => {
    const tabOrder = ['keyTest', 'rolloverTest', 'typingTest', 'layout', 'themes', 'language'];
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    
    setActiveTab(tabId);
  };
  
  const handleLayoutChange = (layout: KeyboardType) => {
    setCurrentLayout(layout);
    setActiveTab('keyTest');
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
    
    setKeyboardKey(prevKey => prevKey + 1);
  };
  
  const getCurrentContent = () => {
    switch (activeTab) {
      case 'keyTest':
        return <KeyboardSelector 
                 key={keyboardKey} 
                 onKeyPress={onKeyPress} 
                 onReset={onReset} 
                 initialLayout={currentLayout} 
               />;
      case 'rolloverTest':
        return <div>Rollover Test Content</div>;
      case 'typingTest':
        return <div>Typing Test Content</div>;
      case 'layout':
        return (
          <LayoutPreview>
            <h3>Select a Layout</h3>
            <LayoutGrid>
              <LayoutCard 
                active={currentLayout === '60%'} 
                onClick={() => handleLayoutChange('60%')}
              >
                <h4>60% Layout</h4>
                <p>Compact layout without function row, navigation cluster, or numpad</p>
              </LayoutCard>
              <LayoutCard 
                active={currentLayout === '65%'} 
                onClick={() => handleLayoutChange('65%')}
              >
                <h4>65% Layout</h4>
                <p>Compact layout with arrow keys and a few navigation keys</p>
              </LayoutCard>
              <LayoutCard 
                active={currentLayout === '75%'} 
                onClick={() => handleLayoutChange('75%')}
              >
                <h4>75% Layout</h4>
                <p>Includes function row and navigation keys in a compact layout</p>
              </LayoutCard>
              <LayoutCard 
                active={currentLayout === 'TKL'} 
                onClick={() => handleLayoutChange('TKL')}
              >
                <h4>TKL Layout</h4>
                <p>Tenkeyless layout with everything except the numpad</p>
              </LayoutCard>
              <LayoutCard 
                active={currentLayout === 'Full'} 
                onClick={() => handleLayoutChange('Full')}
              >
                <h4>Full Layout</h4>
                <p>Complete keyboard with numpad and all keys</p>
              </LayoutCard>
            </LayoutGrid>
          </LayoutPreview>
        );
      case 'themes':
        return <div>Themes Content</div>;
      case 'language':
        return <div>Language Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };
  
  const topTabs: TabData[] = [
    {
      id: 'keyTest',
      label: 'Key Test',
      onClick: () => handleTabClick('keyTest')
    },
    {
      id: 'rolloverTest',
      label: 'Rollover Test',
      onClick: () => handleTabClick('rolloverTest')
    },
    {
      id: 'typingTest',
      label: 'Typing Test',
      onClick: () => handleTabClick('typingTest')
    }
  ];
  
  const bottomTabs: TabData[] = [
    {
      id: 'layout',
      label: 'Layout',
      onClick: () => handleTabClick('layout')
    },
    {
      id: 'themes',
      label: 'Themes',
      onClick: () => handleTabClick('themes')
    },
    {
      id: 'language',
      label: 'Language',
      onClick: () => handleTabClick('language')
    }
  ];

  return (
    <Container>
      <TabContainer position="top">
        {topTabs.map(tab => (
          <Tab 
            key={tab.id}
            active={activeTab === tab.id}
            onClick={tab.onClick}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <AnimatePresence custom={direction} initial={false} mode="sync">
        <ContentArea
          key={activeTab}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.3, ease: "easeInOut" },
            opacity: { duration: 0.2 }
          }}
        >
          {getCurrentContent()}
        </ContentArea>
      </AnimatePresence>

      <TabContainer position="bottom">
        {bottomTabs.map(tab => (
          <Tab 
            key={tab.id}
            active={activeTab === tab.id}
            onClick={tab.onClick}
          >
            {tab.label}
          </Tab>
        ))}
        <ResetButton 
          as={motion.button}
          active={false}
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </ResetButton>
      </TabContainer>
    </Container>
  );
};

export default TestContainer;
