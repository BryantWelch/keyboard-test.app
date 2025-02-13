import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Layout75 from '../Keyboard/layouts/75Layout';
import { KeyboardLayout } from '../Keyboard/types/keyboard.types';

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
`;

const LayoutPreview = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
`;

const LayoutOption = styled.div<{ active: boolean }>`
  background: ${props => props.active ? `${props.theme.colors.primary}20` : 'transparent'};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  width: 200px;

  &:hover {
    background: ${props => props.theme.colors.primary}20;
    transform: translateY(-2px);
  }
`;

const LayoutTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

const LayoutDescription = styled.p`
  color: ${props => props.theme.colors.text}cc;
  font-size: 0.9rem;
  margin: 0;
`;

const ResetButton = styled(Tab)`
  margin-left: auto; // Push to the right
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

const layoutDescriptions: Record<KeyboardLayout, string> = {
  '60%': 'Compact layout without function row, navigation cluster, or numpad',
  '65%': 'Similar to 60% but includes arrow keys and some navigation keys',
  '75%': 'Includes function row and navigation keys in a compact layout',
  'TKL': 'Full keyboard without numpad',
  'Full': 'Full keyboard with all standard keys'
};

const TestContainer: React.FC<TestContainerProps> = ({ onKeyPress, onReset }) => {
  const [activeTab, setActiveTab] = useState('keyTest');
  const [currentLayout, setCurrentLayout] = useState<KeyboardLayout>('75%');
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set());
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleReset = useCallback(() => {
    setTestedKeys(new Set());
    setPressedKeys(new Set());
    onReset?.();
  }, [onReset]);

  const handleKeyPress = useCallback((key: string) => {
    setTestedKeys(prev => new Set(prev).add(key));
    setPressedKeys(prev => new Set(prev).add(key));
    onKeyPress?.(key);
  }, [onKeyPress]);

  const handleKeyDown = useCallback((key: string) => {
    handleKeyPress(key);
  }, [handleKeyPress]);

  const handleKeyUp = useCallback((key: string) => {
    setPressedKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(key);
      return newKeys;
    });
  }, []);

  useEffect(() => {
    const handleKeyUpEvent = (event: KeyboardEvent) => {
      event.preventDefault();

      let keyName = '';
      switch (event.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          keyName = 'Shift';
          break;
        case 'ControlLeft':
        case 'ControlRight':
          keyName = 'Ctrl';
          break;
        case 'AltLeft':
        case 'AltRight':
          keyName = 'Alt';
          break;
        case 'Space':
          keyName = 'Space';
          break;
        case 'Enter':
          keyName = 'Enter';
          break;
        case 'Escape':
          keyName = 'ESC';
          break;
        case 'ArrowUp':
          keyName = '↑';
          break;
        case 'ArrowDown':
          keyName = '↓';
          break;
        case 'ArrowLeft':
          keyName = '←';
          break;
        case 'ArrowRight':
          keyName = '→';
          break;
        case 'Backquote':
          keyName = '`';
          break;
        case 'BracketLeft':
          keyName = '[';
          break;
        case 'BracketRight':
          keyName = ']';
          break;
        case 'Backslash':
          keyName = '\\';
          break;
        case 'Semicolon':
          keyName = ';';
          break;
        case 'Quote':
          keyName = "'";
          break;
        case 'Comma':
          keyName = ',';
          break;
        case 'Period':
          keyName = '.';
          break;
        case 'Slash':
          keyName = '/';
          break;
        case 'MetaLeft':
        case 'MetaRight':
          keyName = 'Win';
          break;
        case 'CapsLock':
          keyName = 'Caps Lock';
          break;
        case 'Backspace':
          keyName = 'Backspace';
          break;
        case 'Delete':
          keyName = 'Delete';
          break;
        case 'Tab':
          keyName = 'Tab';
          break;
        case 'Minus':
          keyName = '-';
          break;
        case 'Equal':
          keyName = '=';
          break;
        default:
          if (event.code.match(/^F(\d+)$/)) {
            keyName = event.code;
          } else {
            keyName = event.key.length === 1 ? event.key.toUpperCase() : event.key;
          }
      }

      if (keyName) {
        handleKeyUp(keyName);
      }
    };

    const handleKeyDownEvent = (event: KeyboardEvent) => {
      event.preventDefault();
      handleKeyDown(event.key);
    };

    window.addEventListener('keyup', handleKeyUpEvent);
    window.addEventListener('keydown', handleKeyDownEvent);
    return () => {
      window.removeEventListener('keyup', handleKeyUpEvent);
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleLayoutChange = (layout: KeyboardLayout) => {
    setCurrentLayout(layout);
    setActiveTab('keyTest');
  };

  const topTabs: TabData[] = [
    {
      id: 'keyTest',
      label: 'Key Test',
      content: (
        <Layout75 
          onKeyPress={handleKeyPress}
          testedKeys={testedKeys}
          pressedKeys={pressedKeys}
        />
      )
    },
    {
      id: 'rolloverTest',
      label: 'Rollover Test',
      content: <div>Rollover Test Content</div>
    },
    {
      id: 'typingTest',
      label: 'Typing Test',
      content: <div>Typing Test Content</div>
    }
  ];

  const bottomTabs: TabData[] = [
    {
      id: 'layout',
      label: 'Layout',
      content: (
        <LayoutPreview>
          {Object.entries(layoutDescriptions).map(([layout, description]) => (
            <LayoutOption
              key={layout}
              active={currentLayout === layout}
              onClick={() => handleLayoutChange(layout as KeyboardLayout)}
            >
              <LayoutTitle>{layout}</LayoutTitle>
              <LayoutDescription>{description}</LayoutDescription>
            </LayoutOption>
          ))}
        </LayoutPreview>
      )
    },
    {
      id: 'themes',
      label: 'Themes',
      content: <div>Theme Settings</div>
    },
    {
      id: 'language',
      label: 'Language',
      content: <div>Language Settings</div>
    }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getCurrentContent = () => {
    if (activeTab === 'keyTest') {
      return topTabs.find(tab => tab.id === activeTab)?.content;
    }
    return bottomTabs.find(tab => tab.id === activeTab)?.content;
  };

  return (
    <Container>
      <TabContainer position="top">
        {topTabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <ContentArea
        key={activeTab}
        initial="enter"
        animate="center"
        exit="exit"
        variants={slideVariants}
      >
        {getCurrentContent()}
      </ContentArea>

      <TabContainer position="bottom">
        {bottomTabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
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
