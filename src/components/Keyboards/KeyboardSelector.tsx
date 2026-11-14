import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Keyboard60 from './Keyboard60';
import Keyboard65 from './Keyboard65';
import Keyboard75 from './Keyboard75';
import KeyboardTKL from './KeyboardTKL';
import KeyboardFull from './KeyboardFull';
import FitWidth from './FitWidth';
import LiveStats from './LiveStats';
import { KeyboardLayoutType } from './keyboardTypes';

// We'll add more keyboard layouts as they're implemented
export type KeyboardType = '60%' | '65%' | '75%' | 'TKL' | 'Full';

interface KeyboardSelectorProps {
  onKeyPress?: (key: string) => void;
  onReset?: () => void;
  initialLayout?: KeyboardType;
  keyboardType?: KeyboardLayoutType;
}

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const KeyboardContainer = styled(motion.div)`
  width: max-content;
  display: flex;
  justify-content: center;
`;

// Add a styled component for the keyboard info header
const KeyboardInfo = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${props => `${props.theme.colors.primary}15`};
  border-radius: 6px;
  border: 1px solid ${props => `${props.theme.colors.primary}30`};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LayoutName = styled.span`
  font-weight: 600;
`;

const TypeName = styled.span`
  font-weight: 600;
`;

// Animation variants
const containerVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

// Function to format the keyboard type name for display
const formatTypeName = (type: KeyboardLayoutType): string => {
  switch (type) {
    case 'qwerty':
      return 'QWERTY';
    case 'dvorak':
      return 'Dvorak';
    case 'colemak':
      return 'Colemak';
    case 'workman':
      return 'Workman';
    case 'azerty':
      return 'AZERTY';
    case 'qwertz':
      return 'QWERTZ';
    case 'colemak-dh':
      return 'Colemak-DH';
    default:
      return type;
  }
};

const KeyboardSelector: React.FC<KeyboardSelectorProps> = ({ 
  onKeyPress, 
  onReset,
  initialLayout = '75%',
  keyboardType = 'qwerty'
}) => {
  const [currentLayout, setCurrentLayout] = useState<KeyboardType>(initialLayout);

  useEffect(() => {
    setCurrentLayout(initialLayout);
  }, [initialLayout]);

  // Render the appropriate keyboard based on the selected layout
  const renderKeyboard = () => {
    switch (currentLayout) {
      case '60%':
        return <Keyboard60 onKeyPress={onKeyPress} onReset={onReset} keyboardType={keyboardType} />;
      case '65%':
        return <Keyboard65 onKeyPress={onKeyPress} onReset={onReset} keyboardType={keyboardType} />;
      case '75%':
        return <Keyboard75 onKeyPress={onKeyPress} onReset={onReset} keyboardType={keyboardType} />;
      case 'TKL':
        return <KeyboardTKL onKeyPress={onKeyPress} onReset={onReset} keyboardType={keyboardType} />;
      case 'Full':
        return <KeyboardFull onKeyPress={onKeyPress} onReset={onReset} keyboardType={keyboardType} />;
      default:
        return <Keyboard75 onKeyPress={onKeyPress} onReset={onReset} keyboardType={keyboardType} />;
    }
  };

  return (
    <Container>
      {/* Add the keyboard info header */}
      <KeyboardInfo>
        Current Configuration: <LayoutName>&nbsp;{currentLayout}&nbsp;</LayoutName> with <TypeName>&nbsp;{formatTypeName(keyboardType)}&nbsp;</TypeName> Layout
      </KeyboardInfo>
      
      <LiveStats />

      <FitWidth watch={`${currentLayout}-${keyboardType}`}>
        <AnimatePresence initial={false} mode="wait">
          <KeyboardContainer
            key={currentLayout}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.16 }}
          >
            {renderKeyboard()}
          </KeyboardContainer>
        </AnimatePresence>
      </FitWidth>
    </Container>
  );
};

export default KeyboardSelector;
