import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Microsoft } from '@mui/icons-material';

export type KeySize = '1u' | '1.25u' | '1.5u' | '1.75u' | '2u' | '2.25u' | '2.75u' | '6.25u';

export interface KeyLabel {
  primary: string;
  secondary?: string;
}

export interface KeyProps {
  label: KeyLabel;
  size?: KeySize;
  isPressed?: boolean;
  isTested?: boolean;
  isSpecialKey?: boolean;
  className?: string;
  onKeyPress?: () => void;
}

const KEY_UNIT = 50; // Base unit for key size in pixels

const sizeMap: Record<KeySize, number> = {
  '1u': 1,
  '1.25u': 1.25,
  '1.5u': 1.5,
  '1.75u': 1.75,
  '2u': 2,
  '2.25u': 2.25,
  '2.75u': 2.75,
  '6.25u': 6.25,
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
    const baseColor = props.$isSpecialKey ? 
      props.theme.colors.secondary : 
      props.theme.colors.primary;
    return props.$isTested ? 
      `${baseColor}80` : 
      baseColor;
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
  size = '1u',
  isPressed = false,
  isTested = false,
  isSpecialKey = false,
  className,
  onKeyPress,
}) => {
  const width = KEY_UNIT * sizeMap[size];
  const isWindowsKey = label.primary === 'Win';

  return (
    <KeyContainer
      $width={width}
      className={className}
      onClick={onKeyPress}
      whileHover={{ y: -1 }}
      whileTap={{ y: 1 }}
    >
      <KeyCap
        $isTested={isTested}
        $isSpecialKey={isSpecialKey}
        $isPressed={isPressed}
        animate={{
          scale: isPressed ? 0.95 : 1,
          y: isPressed ? 2 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          mass: 0.5
        }}
      >
        <KeyText $isPressed={isPressed}>
          {isWindowsKey ? (
            <WindowsIcon />
          ) : (
            <>
              {label.secondary && <SecondaryText>{label.secondary}</SecondaryText>}
              <PrimaryText>{label.primary}</PrimaryText>
            </>
          )}
        </KeyText>
      </KeyCap>
    </KeyContainer>
  );
};

export default Key;
