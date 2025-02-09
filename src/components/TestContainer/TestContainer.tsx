import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  margin: 2rem auto;
  width: 100%;
  max-width: 800px;
  min-height: 400px;
  position: relative;
  box-shadow: ${props => props.theme.shadows.main};
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
`;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

const topTabs: TabData[] = [
  { id: 'keyTest', label: 'Key Test', content: <div>Key Test Content</div> },
  { id: 'rolloverTest', label: 'Rollover Test', content: <div>Rollover Test Content</div> },
  { id: 'typingTest', label: 'Typing Test', content: <div>Typing Test Content</div> }
];

const bottomTabs: TabData[] = [
  { id: 'themes', label: 'Themes', content: <div>Theme Settings</div> },
  { id: 'layout', label: 'Layout', content: <div>Keyboard Layout Settings</div> },
  { id: 'language', label: 'Language', content: <div>Language Settings</div> }
];

const TestContainer: React.FC = () => {
  const [activeTopTab, setActiveTopTab] = useState(topTabs[0].id);
  const [activeBottomTab, setActiveBottomTab] = useState('');
  const [slideDirection, setSlideDirection] = useState(0);

  const handleTabChange = (tabId: string, isTop: boolean) => {
    const currentTab = isTop ? activeTopTab : activeBottomTab;
    const direction = tabId > currentTab ? 1 : -1;
    setSlideDirection(direction);
    
    if (isTop) {
      setActiveTopTab(tabId);
      setActiveBottomTab('');
    } else {
      setActiveBottomTab(activeBottomTab === tabId ? '' : tabId);
    }
  };

  const getCurrentContent = () => {
    if (activeBottomTab) {
      return bottomTabs.find(tab => tab.id === activeBottomTab)?.content;
    }
    return topTabs.find(tab => tab.id === activeTopTab)?.content;
  };

  return (
    <Container>
      <TabContainer position="top">
        {topTabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTopTab === tab.id && !activeBottomTab}
            onClick={() => handleTabChange(tab.id, true)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <AnimatePresence custom={slideDirection} initial={false}>
        <ContentArea
          key={activeBottomTab || activeTopTab}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
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
            active={activeBottomTab === tab.id}
            onClick={() => handleTabChange(tab.id, false)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>
    </Container>
  );
};

export default TestContainer;
