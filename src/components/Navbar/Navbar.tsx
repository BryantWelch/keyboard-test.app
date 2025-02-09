import React, { useState } from 'react';
import styled from 'styled-components';
import { GitHub, KeyboardArrowDown, KeyboardArrowUp, OpenInNew } from '@mui/icons-material';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  background: ${props => props.theme.gradients.logo};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-size: 1.5rem;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: ${props => props.theme.colors.background};
  min-width: 160px;
  box-shadow: ${props => props.theme.shadows.main};
  z-index: 1;
`;

const DropdownLink = styled.a`
  color: ${props => props.theme.colors.text};
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }
`;

const GitHubLink = styled.a`
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Logo>Keyboard Test</Logo>
      
      <DropdownContainer>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          External Tools
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </DropdownButton>
        
        <DropdownContent isOpen={isOpen}>
          <DropdownLink href="https://display-test.app" target="_blank" rel="noopener noreferrer">
            Display Test <OpenInNew fontSize="small" />
          </DropdownLink>
          <DropdownLink href="https://controller-test.app" target="_blank" rel="noopener noreferrer">
            Controller Test <OpenInNew fontSize="small" />
          </DropdownLink>
        </DropdownContent>
      </DropdownContainer>

      <GitHubLink 
        href="https://github.com/BryantWelch/keyboard-test.app" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <GitHub />
      </GitHubLink>
    </Nav>
  );
};

export default Navbar;
