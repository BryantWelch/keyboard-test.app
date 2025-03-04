import React from 'react';
import styled from 'styled-components';
import { GitHub, KeyboardArrowDown, OpenInNew } from '@mui/icons-material';
import KeyboardsDropdown from './KeyboardsDropdown';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.glass};
  backdrop-filter: ${props => props.theme.effects.blur};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.navbar};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
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
  
  &:hover > div {
    display: block;
  }
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

const DropdownContent = styled.div`
  display: none;
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
  return (
    <Nav>
      <LeftSection>
        <Logo>Keyboard Test</Logo>
        
        <DropdownContainer>
          <DropdownButton>
            Other Tools
            <KeyboardArrowDown />
          </DropdownButton>
          
          <DropdownContent>
            <DropdownLink href="https://display-test.app" target="_blank" rel="noopener noreferrer">
              Display Test <OpenInNew fontSize="small" />
            </DropdownLink>
            <DropdownLink href="https://controller-test.app" target="_blank" rel="noopener noreferrer">
              Controller Test <OpenInNew fontSize="small" />
            </DropdownLink>
          </DropdownContent>
        </DropdownContainer>
        
        <KeyboardsDropdown />
      </LeftSection>

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
