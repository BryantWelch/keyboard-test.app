import React from 'react';
import styled from 'styled-components';
import KeyboardLayout, { KeyRow } from '../components/KeyboardLayout';
import Key from '../components/Key';
import { KeyboardLayoutProps } from '../types/keyboard.types';

const StyledKeyRow = styled(KeyRow)`
  &:not(:first-child) {
    margin-top: 2px;
  }
`;

const Layout75: React.FC<Omit<KeyboardLayoutProps, 'layout'>> = ({
  onKeyPress,
  testedKeys,
  pressedKeys,
}) => {
  const createKeyProps = (displayName: string, keyName: string, secondary?: string, isSpecial: boolean = false) => ({
    label: { primary: displayName, secondary },
    onKeyPress: () => onKeyPress?.(keyName),
    isTested: testedKeys?.has(keyName),
    isPressed: pressedKeys?.has(keyName),
    isSpecialKey: isSpecial,
  });

  return (
    <KeyboardLayout layout="75%" onKeyPress={onKeyPress} testedKeys={testedKeys} pressedKeys={pressedKeys}>
      {/* Function Row */}
      <StyledKeyRow>
        <Key {...createKeyProps('ESC', 'ESC', undefined, true)} />
        <Key {...createKeyProps('F1', 'F1', undefined, true)} />
        <Key {...createKeyProps('F2', 'F2', undefined, true)} />
        <Key {...createKeyProps('F3', 'F3', undefined, true)} />
        <Key {...createKeyProps('F4', 'F4', undefined, true)} />
        <Key {...createKeyProps('F5', 'F5', undefined, true)} />
        <Key {...createKeyProps('F6', 'F6', undefined, true)} />
        <Key {...createKeyProps('F7', 'F7', undefined, true)} />
        <Key {...createKeyProps('F8', 'F8', undefined, true)} />
        <Key {...createKeyProps('F9', 'F9', undefined, true)} />
        <Key {...createKeyProps('F10', 'F10', undefined, true)} />
        <Key {...createKeyProps('F11', 'F11', undefined, true)} />
        <Key {...createKeyProps('F12', 'F12', undefined, true)} />
        <Key {...createKeyProps('Delete', 'Delete', undefined, true)} />
      </StyledKeyRow>

      {/* Number Row */}
      <StyledKeyRow>
        <Key {...createKeyProps('`', '`', '~')} />
        <Key {...createKeyProps('1', '1', '!')} />
        <Key {...createKeyProps('2', '2', '@')} />
        <Key {...createKeyProps('3', '3', '#')} />
        <Key {...createKeyProps('4', '4', '$')} />
        <Key {...createKeyProps('5', '5', '%')} />
        <Key {...createKeyProps('6', '6', '^')} />
        <Key {...createKeyProps('7', '7', '&')} />
        <Key {...createKeyProps('8', '8', '*')} />
        <Key {...createKeyProps('9', '9', '(')} />
        <Key {...createKeyProps('0', '0', ')')} />
        <Key {...createKeyProps('-', '-', '_')} />
        <Key {...createKeyProps('=', '=', '+')} />
        <Key {...createKeyProps('Backspace', 'Backspace', undefined, true)} size="2u" />
      </StyledKeyRow>

      {/* Top Alpha Row */}
      <StyledKeyRow>
        <Key {...createKeyProps('Tab', 'Tab', undefined, true)} size="1.5u" />
        <Key {...createKeyProps('Q', 'Q')} />
        <Key {...createKeyProps('W', 'W')} />
        <Key {...createKeyProps('E', 'E')} />
        <Key {...createKeyProps('R', 'R')} />
        <Key {...createKeyProps('T', 'T')} />
        <Key {...createKeyProps('Y', 'Y')} />
        <Key {...createKeyProps('U', 'U')} />
        <Key {...createKeyProps('I', 'I')} />
        <Key {...createKeyProps('O', 'O')} />
        <Key {...createKeyProps('P', 'P')} />
        <Key {...createKeyProps('[', '[', '{')} />
        <Key {...createKeyProps(']', ']', '}')} />
        <Key {...createKeyProps('\\', '\\', '|', true)} size="1.5u" />
      </StyledKeyRow>

      {/* Middle Alpha Row */}
      <StyledKeyRow>
        <Key {...createKeyProps('Caps Lock', 'Caps Lock', undefined, true)} size="1.75u" />
        <Key {...createKeyProps('A', 'A')} />
        <Key {...createKeyProps('S', 'S')} />
        <Key {...createKeyProps('D', 'D')} />
        <Key {...createKeyProps('F', 'F')} />
        <Key {...createKeyProps('G', 'G')} />
        <Key {...createKeyProps('H', 'H')} />
        <Key {...createKeyProps('J', 'J')} />
        <Key {...createKeyProps('K', 'K')} />
        <Key {...createKeyProps('L', 'L')} />
        <Key {...createKeyProps(';', ';', ':')} />
        <Key {...createKeyProps("'", "'", '"')} />
        <Key {...createKeyProps('Enter', 'Enter', undefined, true)} size="2.25u" />
      </StyledKeyRow>

      {/* Bottom Alpha Row */}
      <StyledKeyRow>
        <Key {...createKeyProps('Shift', 'L-Shift', undefined, true)} size="2.25u" />
        <Key {...createKeyProps('Z', 'Z')} />
        <Key {...createKeyProps('X', 'X')} />
        <Key {...createKeyProps('C', 'C')} />
        <Key {...createKeyProps('V', 'V')} />
        <Key {...createKeyProps('B', 'B')} />
        <Key {...createKeyProps('N', 'N')} />
        <Key {...createKeyProps('M', 'M')} />
        <Key {...createKeyProps(',', ',', '<')} />
        <Key {...createKeyProps('.', '.', '>')} />
        <Key {...createKeyProps('/', '/', '?')} />
        <Key {...createKeyProps('Shift', 'R-Shift', undefined, true)} size="1.75u" />
        <Key {...createKeyProps('↑', '↑', undefined, true)} />
      </StyledKeyRow>

      {/* Bottom Row */}
      <StyledKeyRow>
        <Key {...createKeyProps('Ctrl', 'L-Ctrl', undefined, true)} size="1.25u" />
        <Key {...createKeyProps('Win', 'Win', undefined, true)} size="1.25u" />
        <Key {...createKeyProps('Alt', 'L-Alt', undefined, true)} size="1.25u" />
        <Key {...createKeyProps('Space', 'Space', undefined, true)} size="6.25u" />
        <Key {...createKeyProps('Alt', 'R-Alt', undefined, true)} size="1.25u" />
        <Key {...createKeyProps('Fn', 'Fn', undefined, true)} size="1.25u" />
        <Key {...createKeyProps('Ctrl', 'R-Ctrl', undefined, true)} size="1.25u" />
        <Key {...createKeyProps('←', '←', undefined, true)} />
        <Key {...createKeyProps('↓', '↓', undefined, true)} />
        <Key {...createKeyProps('→', '→', undefined, true)} />
      </StyledKeyRow>
    </KeyboardLayout>
  );
};

export default Layout75;
