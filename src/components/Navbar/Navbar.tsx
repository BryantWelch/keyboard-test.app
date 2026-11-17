import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GitHub, KeyboardArrowDown, OpenInNew } from '@mui/icons-material';
import KeyboardsDropdown, { PartsDropdown } from './KeyboardsDropdown';
import { Chevron, Menu, MenuButton, MenuCard, MenuLink, MenuPanel, useHoverMenu } from './menu';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.glass};
  backdrop-filter: ${props => props.theme.effects.blur};
  padding: 0.7rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid ${props => `${props.theme.colors.primary}22`};

  @media (max-width: 720px) {
    padding:
      calc(0.55rem + env(safe-area-inset-top, 0px))
      max(0.75rem, env(safe-area-inset-right, 0px))
      0.55rem
      max(0.75rem, env(safe-area-inset-left, 0px));
  }
`;

const Logo = styled.div`
  background: ${props => props.theme.gradients.logo};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0.85rem 0 0;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  white-space: nowrap;
  flex: none;

  @media (max-width: 720px) {
    margin-right: 0.5rem;
    font-size: 1.05rem;
  }
`;

const MenuRow = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  min-width: 0;

  @media (max-width: 720px) {
    display: ${props => props.$open ? 'flex' : 'none'};
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.2rem;
    max-height: calc(100dvh - 3.5rem - env(safe-area-inset-top, 0px));
    overflow: auto;
    overscroll-behavior: contain;
    padding: 0.45rem 0.75rem calc(0.9rem + env(safe-area-inset-bottom, 0px));
    background: ${props => props.theme.colors.background};
    border-bottom: 1px solid ${props => `${props.theme.colors.primary}33`};
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  }
`;

const Backdrop = styled.button`
  display: none;

  @media (max-width: 720px) {
    display: block;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100dvh;
    margin: 0;
    padding: 0;
    border: 0;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-left: auto;
  flex: none;
`;

const GitHubLink = styled.a`
  color: ${props => props.theme.colors.text};
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  flex: none;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${props => `${props.theme.colors.primary}18`};
    color: ${props => props.theme.colors.primary};
  }
`;

const Burger = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  flex: none;

  svg {
    width: 22px;
    height: 22px;
    display: block;
    margin: 0 auto;
  }

  &:hover {
    background: ${props => `${props.theme.colors.primary}18`};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 720px) {
    display: grid;
    place-items: center;
  }
`;

const tools = [
  { name: 'Display Test', href: 'https://display-test.app' },
  { name: 'Controller Test', href: 'https://controller-test.app' },
];

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

const Navbar: React.FC = () => {
  const toolsMenu = useHoverMenu();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileOpenRef = useRef(mobileOpen);
  const menuRowRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  mobileOpenRef.current = mobileOpen;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !mobileOpenRef.current) return;
      if (menuRowRef.current?.querySelector('[aria-expanded="true"]')) return;
      event.preventDefault();
      setMobileOpen(false);
      burgerRef.current?.focus();
    };

    const onPointer = (event: PointerEvent) => {
      if (!mobileOpenRef.current) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuRowRef.current?.contains(target)) return;
      if (burgerRef.current?.contains(target)) return;
      setMobileOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 720px)');
    const onChange = () => {
      if (!query.matches) setMobileOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <Nav>
      {mobileOpen ? (
        <Backdrop type="button" tabIndex={-1} aria-label="Close menu" onClick={() => setMobileOpen(false)} />
      ) : null}
      <Logo>Keyboard Test</Logo>
      <MenuRow id="site-menu" ref={menuRowRef} $open={mobileOpen}>
        <KeyboardsDropdown />
        <PartsDropdown />

        <Menu
          ref={toolsMenu.ref}
          onMouseEnter={toolsMenu.onMouseEnter}
          onMouseLeave={toolsMenu.onMouseLeave}
        >
          <MenuButton
            type="button"
            $open={toolsMenu.open}
            aria-expanded={toolsMenu.open}
            aria-haspopup="true"
            onClick={toolsMenu.onButtonClick}
          >
            Other Tools
            <Chevron $open={toolsMenu.open}><KeyboardArrowDown /></Chevron>
          </MenuButton>
          <MenuPanel $open={toolsMenu.open}>
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
      </MenuRow>

      <Actions>
        <GitHubLink
          href="https://github.com/BryantWelch/keyboard-test.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <GitHub />
        </GitHubLink>
        <Burger
          ref={burgerRef}
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="site-menu"
          onClick={() => setMobileOpen(open => !open)}
        >
          <MenuGlyph open={mobileOpen} />
        </Burger>
      </Actions>
    </Nav>
  );
};

export default Navbar;
