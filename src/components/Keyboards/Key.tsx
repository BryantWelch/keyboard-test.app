import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Microsoft } from '@mui/icons-material';
import { KeyboardLayoutType, getKeyMapping } from './keyboardTypes';

// Key size as a string like '1u', '1.25u', '6.25u', etc.
export type KeySize = `${number}u`;

export interface KeyLabel {
  primary: string;
  secondary?: string;
}

export interface KeyProps {
  label: KeyLabel;
  keyboardType?: KeyboardLayoutType;
  size?: KeySize;
  isPressed?: boolean;
  isTested?: boolean;
  isSpecialKey?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onKeyPress?: () => void;
}

// Base unit for key size in pixels
const KEY_UNIT = 50;

// Parse key size string (e.g., '1.25u') to number multiplier
const parseKeySize = (size: KeySize): number => {
  return parseFloat(size.replace('u', '')) || 1;
};

const KeyContainer = styled(motion.div)<{ $width: number }>`
  position: relative;
  width: ${props => props.$width}px;
  height: ${KEY_UNIT}px;
  margin: 2px;
  cursor: pointer;
  user-select: none;
`;

const KeyCap = styled(motion.div)<{ 
  $isTested: boolean; 
  $isSpecialKey: boolean;
  $isPressed: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: ${props => {
    if (props.$isPressed) {
      // Key is currently being pressed - show accent color
      return props.theme.colors.accent + '40';
    } else if (props.$isTested) {
      // Key was tested but not currently pressed - show a subtle highlight
      return props.$isSpecialKey ? 
        props.theme.colors.secondary + '80' : 
        props.theme.colors.primary + '80';
    } else {
      // Key was not tested or pressed - show normal color
      return props.$isSpecialKey ? 
        props.theme.colors.secondary : 
        props.theme.colors.primary;
    }
  }};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 
    0 1px 1px rgba(0,0,0,0.2),
    0 2px 2px rgba(0,0,0,0.15),
    0 3px 3px rgba(0,0,0,0.1);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(10deg);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
`;

const KeyText = styled.div<{ $isPressed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  line-height: 1;
  color: ${props => props.$isPressed ? 
    props.theme.colors.accent : 
    props.theme.colors.text};
  transition: color 0.1s ease-in-out;
`;

const PrimaryText = styled.span`
  font-size: 14px;
  margin-bottom: 2px;
  font-weight: 500;
`;

const SecondaryText = styled.span`
  font-size: 12px;
  opacity: 0.8;
  font-weight: 400;
`;

const WindowsIcon = styled(Microsoft)`
  font-size: 16px !important;
`;

const Key: React.FC<KeyProps> = ({
  label,
  keyboardType = 'qwerty',
  size = '1u',
  isPressed = false,
  isTested = false,
  isSpecialKey = false,
  className,
  style,
  onKeyPress,
}) => {
  // Get the mapped key based on keyboard type
  const mappedLabel = keyboardType !== 'qwerty' && !isSpecialKey ? 
    getKeyMapping(label.primary, keyboardType) : 
    label.primary;
  
  // Calculate width based on size
  const width = parseKeySize(size) * KEY_UNIT;
  
  // Handle special cases for key display
  const displayLabel = mappedLabel === 'Meta' ? <WindowsIcon /> : mappedLabel;
  
  return (
    <KeyContainer 
      $width={width}
      className={className}
      style={style}
      onClick={onKeyPress}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <KeyCap
        $isTested={!!isTested}
        $isSpecialKey={!!isSpecialKey}
        $isPressed={!!isPressed}
        style={{ height: '100%' }}
      >
        <KeyText $isPressed={!!isPressed}>
          <PrimaryText>{displayLabel}</PrimaryText>
          {label.secondary && <SecondaryText>{label.secondary}</SecondaryText>}
        </KeyText>
      </KeyCap>
    </KeyContainer>
  );
};

export default memo(Key);
