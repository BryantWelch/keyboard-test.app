import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Microsoft } from '@mui/icons-material';

export type KeySize = 
  | '1u' | '1.05u' | '1.1u' | '1.15u' | '1.2u' | '1.25u' | '1.3u' | '1.35u' | '1.4u' | '1.45u' 
  | '1.5u' | '1.55u' | '1.6u' | '1.65u' | '1.7u' | '1.75u' | '1.8u' | '1.85u' | '1.9u' | '1.95u' 
  | '2u' | '2.05u' | '2.1u' | '2.15u' | '2.2u' | '2.25u' | '2.3u' | '2.35u' | '2.4u' | '2.45u' 
  | '2.5u' | '2.55u' | '2.6u' | '2.65u' | '2.7u' | '2.75u' | '2.8u' | '2.85u' | '2.9u' | '2.95u' 
  | '3u' | '3.05u' | '3.1u' | '3.15u' | '3.2u' | '3.25u' | '3.3u' | '3.35u' | '3.4u' | '3.45u' 
  | '3.5u' | '3.55u' | '3.6u' | '3.65u' | '3.7u' | '3.75u' | '3.8u' | '3.85u' | '3.9u' | '3.95u' 
  | '4u' | '4.05u' | '4.1u' | '4.15u' | '4.2u' | '4.25u' | '4.3u' | '4.35u' | '4.4u' | '4.45u' 
  | '4.5u' | '4.55u' | '4.6u' | '4.65u' | '4.7u' | '4.75u' | '4.8u' | '4.85u' | '4.9u' | '4.95u' 
  | '5u' | '5.05u' | '5.1u' | '5.15u' | '5.2u' | '5.25u' | '5.3u' | '5.35u' | '5.4u' | '5.45u' 
  | '5.5u' | '5.55u' | '5.6u' | '5.65u' | '5.7u' | '5.75u' | '5.8u' | '5.85u' | '5.9u' | '5.95u' 
  | '6u' | '6.05u' | '6.1u' | '6.15u' | '6.2u' | '6.25u' | '6.3u' | '6.35u' | '6.4u' | '6.45u' 
  | '6.5u' | '6.55u' | '6.6u' | '6.65u' | '6.7u' | '6.75u' | '6.8u' | '6.85u' | '6.9u' | '6.95u' 
  | '7u';

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
  '1u': 1, '1.05u': 1.05, '1.1u': 1.1, '1.15u': 1.15, '1.2u': 1.2, 
  '1.25u': 1.25, '1.3u': 1.3, '1.35u': 1.35, '1.4u': 1.4, '1.45u': 1.45,
  '1.5u': 1.5, '1.55u': 1.55, '1.6u': 1.6, '1.65u': 1.65, '1.7u': 1.7,
  '1.75u': 1.75, '1.8u': 1.8, '1.85u': 1.85, '1.9u': 1.9, '1.95u': 1.95,
  '2u': 2, '2.05u': 2.05, '2.1u': 2.1, '2.15u': 2.15, '2.2u': 2.2,
  '2.25u': 2.25, '2.3u': 2.3, '2.35u': 2.35, '2.4u': 2.4, '2.45u': 2.45,
  '2.5u': 2.5, '2.55u': 2.55, '2.6u': 2.6, '2.65u': 2.65, '2.7u': 2.7,
  '2.75u': 2.75, '2.8u': 2.8, '2.85u': 2.85, '2.9u': 2.9, '2.95u': 2.95,
  '3u': 3, '3.05u': 3.05, '3.1u': 3.1, '3.15u': 3.15, '3.2u': 3.2,
  '3.25u': 3.25, '3.3u': 3.3, '3.35u': 3.35, '3.4u': 3.4, '3.45u': 3.45,
  '3.5u': 3.5, '3.55u': 3.55, '3.6u': 3.6, '3.65u': 3.65, '3.7u': 3.7,
  '3.75u': 3.75, '3.8u': 3.8, '3.85u': 3.85, '3.9u': 3.9, '3.95u': 3.95,
  '4u': 4, '4.05u': 4.05, '4.1u': 4.1, '4.15u': 4.15, '4.2u': 4.2,
  '4.25u': 4.25, '4.3u': 4.3, '4.35u': 4.35, '4.4u': 4.4, '4.45u': 4.45,
  '4.5u': 4.5, '4.55u': 4.55, '4.6u': 4.6, '4.65u': 4.65, '4.7u': 4.7,
  '4.75u': 4.75, '4.8u': 4.8, '4.85u': 4.85, '4.9u': 4.9, '4.95u': 4.95,
  '5u': 5, '5.05u': 5.05, '5.1u': 5.1, '5.15u': 5.15, '5.2u': 5.2,
  '5.25u': 5.25, '5.3u': 5.3, '5.35u': 5.35, '5.4u': 5.4, '5.45u': 5.45,
  '5.5u': 5.5, '5.55u': 5.55, '5.6u': 5.6, '5.65u': 5.65, '5.7u': 5.7,
  '5.75u': 5.75, '5.8u': 5.8, '5.85u': 5.85, '5.9u': 5.9, '5.95u': 5.95,
  '6u': 6, '6.05u': 6.05, '6.1u': 6.1, '6.15u': 6.15, '6.2u': 6.2,
  '6.25u': 6.25, '6.3u': 6.3, '6.35u': 6.35, '6.4u': 6.4, '6.45u': 6.45,
  '6.5u': 6.5, '6.55u': 6.55, '6.6u': 6.6, '6.65u': 6.65, '6.7u': 6.7,
  '6.75u': 6.75, '6.8u': 6.8, '6.85u': 6.85, '6.9u': 6.9, '6.95u': 6.95,
  '7u': 7
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
