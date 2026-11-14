import React, { memo } from 'react';
import styled from 'styled-components';
import { KeyboardLayoutType, getKeyMapping } from './keyboardTypes';

export type KeySize = `${number}u`;

export interface KeyProps {
  primary: string;
  secondary?: string;
  keyCode: string;
  keyboardType?: KeyboardLayoutType;
  size?: KeySize;
  isPressed?: boolean;
  isTested?: boolean;
  isSpecialKey?: boolean;
  pressCount?: number;
  className?: string;
  style?: React.CSSProperties;
  onActivate?: (code: string) => void;
}

const KEY_UNIT = 50;

const parseKeySize = (size: KeySize): number => {
  return parseFloat(size.replace('u', '')) || 1;
};

const KeyContainer = styled.div<{ $width: number }>`
  position: relative;
  width: ${props => props.$width}px;
  height: ${KEY_UNIT}px;
  margin: 2px;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
`;

const KeyCap = styled.div<{
  $isTested: boolean;
  $isSpecialKey: boolean;
  $isPressed: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${props => {
    if (props.$isPressed) {
      return props.theme.colors.accent;
    }
    if (props.$isTested) {
      return props.$isSpecialKey
        ? `color-mix(in srgb, ${props.theme.colors.secondary} 72%, white)`
        : `color-mix(in srgb, ${props.theme.colors.primary} 72%, white)`;
    }
    return props.$isSpecialKey ? props.theme.colors.secondary : props.theme.colors.primary;
  }};
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 40%);
  color: ${props => props.$isPressed ? props.theme.colors.background : props.theme.colors.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.$isPressed ? props.theme.colors.accent : 'rgba(255, 255, 255, 0.16)'};
  box-shadow: ${props => props.$isPressed
    ? 'inset 0 2px 6px rgba(0, 0, 0, 0.28)'
    : 'inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 3px 0 rgba(0, 0, 0, 0.28)'};
  transform: translateY(${props => props.$isPressed ? '3px' : '0'});
  transition: transform 60ms ease, background-color 70ms ease, box-shadow 60ms ease, color 70ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const KeyText = styled.div<{ $dense: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  line-height: 1;
  text-align: center;
  padding: 0 3px;
  max-width: 100%;
`;

const PrimaryText = styled.span<{ $dense: boolean }>`
  font-size: ${props => props.$dense ? '12px' : '16px'};
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const SecondaryText = styled.span`
  margin-top: 2px;
  font-size: 11px;
  opacity: 0.8;
`;

const Heat = styled.span<{ $level: number }>`
  position: absolute;
  left: 7px;
  right: 7px;
  bottom: 4px;
  height: 3px;
  border-radius: 99px;
  background: ${props => props.theme.colors.background};
  opacity: ${props => 0.35 + props.$level * 0.65};
  transform: scaleX(${props => 0.3 + props.$level * 0.7});
  transform-origin: left center;
`;

const Key: React.FC<KeyProps> = ({
  primary,
  secondary,
  keyCode,
  keyboardType = 'qwerty',
  size = '1u',
  isPressed = false,
  isTested = false,
  isSpecialKey = false,
  pressCount = 0,
  className,
  style,
  onActivate,
}) => {
  const mappedLabel = keyboardType !== 'qwerty' && !isSpecialKey
    ? getKeyMapping(primary, keyboardType)
    : primary;
  const dense = mappedLabel.length > 4;
  const heat = Math.min(pressCount, 12) / 12;

  return (
    <KeyContainer
      $width={parseKeySize(size) * KEY_UNIT}
      className={className}
      style={style}
      onClick={() => onActivate?.(keyCode)}
    >
      <KeyCap
        $isTested={isTested}
        $isSpecialKey={isSpecialKey}
        $isPressed={isPressed}
      >
        <KeyText $dense={dense}>
          <PrimaryText $dense={dense}>{mappedLabel}</PrimaryText>
          {secondary && <SecondaryText>{secondary}</SecondaryText>}
        </KeyText>
        {pressCount > 0 && <Heat $level={heat} />}
      </KeyCap>
    </KeyContainer>
  );
};

export default memo(Key);
