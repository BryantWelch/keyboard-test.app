import React, { useState } from 'react';
import styled from 'styled-components';
import { GitHub, KeyboardArrowDown, OpenInNew } from '@mui/icons-material';
import KeyboardsDropdown, { PartsDropdown } from './KeyboardsDropdown';
import { Chevron, Menu, MenuButton, MenuCard, MenuLink, MenuPanel } from './menu';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.glass};
  backdrop-filter: ${props => props.theme.effects.blur};
  padding: 0.7rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid ${props => `${props.theme.colors.primary}22`};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  flex-wrap: wrap;

  @media (max-width: 720px) {
    gap: 0.15rem;
  }
`;

const Logo = styled.div`
  background: ${props => props.theme.gradients.logo};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 1rem 0 0;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const GitHubLink = styled.a`
  color: ${props => props.theme.colors.text};
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${props => `${props.theme.colors.primary}18`};
    color: ${props => props.theme.colors.primary};
  }
`;

const tools = [
  { name: 'Display Test', href: 'https://display-test.app' },
  { name: 'Controller Test', href: 'https://controller-test.app' },
];

const Navbar: React.FC = () => {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <Nav>
      <LeftSection>
        <Logo>Keyboard Test</Logo>

        <KeyboardsDropdown />
        <PartsDropdown />

        <Menu
          onMouseEnter={() => setToolsOpen(true)}
          onMouseLeave={() => setToolsOpen(false)}
        >
          <MenuButton type="button" $open={toolsOpen} aria-expanded={toolsOpen} aria-haspopup="true">
            Other Tools
            <Chevron $open={toolsOpen}><KeyboardArrowDown /></Chevron>
          </MenuButton>
          <MenuPanel $open={toolsOpen}>
            <MenuCard>
              {tools.map(tool => (
                <MenuLink key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer">
                  {tool.name}
                  <OpenInNew />
                </MenuLink>
              ))}
            </MenuCard>
          </MenuPanel>
        </Menu>
      </LeftSection>

      <GitHubLink
        href="https://github.com/BryantWelch/keyboard-test.app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        <GitHub />
      </GitHubLink>
    </Nav>
  );
};

export default Navbar;
