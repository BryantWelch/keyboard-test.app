import React from 'react';

export type KeySize = '1u' | '1.25u' | '1.5u' | '1.75u' | '2u' | '2.25u' | '2.75u' | '6.25u';

export interface KeyLabel {
  primary: string;
  secondary?: string;
  isIcon?: boolean;
  keyCode?: string; // Physical key code
}

export interface KeyProps {
  label: KeyLabel;
  size?: KeySize;
  isPressed?: boolean;
  isHeld?: boolean;
  isTested?: boolean;
  isSpecialKey?: boolean; // For lighter blue keys
  className?: string;
  onKeyPress?: () => void;
}

export type KeyboardLayout = '60%' | '65%' | '75%' | 'TKL' | 'Full';

export interface KeyboardLayoutProps {
  layout: KeyboardLayout;
  onKeyPress?: (key: string) => void;
  testedKeys: Set<string>;
  pressedKeys: Set<string>;
}

export interface KeyboardWrapperProps extends KeyboardLayoutProps {
  children: React.ReactNode;
}
