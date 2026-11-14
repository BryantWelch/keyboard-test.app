import styled from 'styled-components';

export const Menu = styled.div`
  position: relative;
`;

export const MenuButton = styled.button<{ $open?: boolean }>`
  background: ${props => props.$open ? `${props.theme.colors.primary}18` : 'transparent'};
  border: 1px solid ${props => props.$open ? `${props.theme.colors.primary}44` : 'transparent'};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.15rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1;
  padding: 0.45rem 0.7rem 0.45rem 0.85rem;
  border-radius: 999px;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${props => `${props.theme.colors.primary}16`};
    border-color: ${props => `${props.theme.colors.primary}33`};
  }
`;

export const Chevron = styled.span<{ $open?: boolean }>`
  display: flex;
  opacity: 0.7;
  transition: transform 0.16s ease;
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});

  svg {
    font-size: 1.15rem;
  }
`;

export const MenuPanel = styled.div<{ $open?: boolean; $wide?: boolean }>`
  display: ${props => props.$open ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 5;
  padding-top: 0.45rem;
  min-width: ${props => props.$wide ? 'min(500px, calc(100vw - 1.5rem))' : '220px'};

  @media (max-width: 720px) {
    position: fixed;
    top: 58px;
    left: 12px;
    right: 12px;
    min-width: 0;
    padding-top: 0;
  }
`;

export const MenuCard = styled.div`
  background: color-mix(in srgb, ${props => props.theme.colors.primary} 12%, ${props => props.theme.colors.background});
  border: 1px solid ${props => `${props.theme.colors.primary}33`};
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(16px);
  padding: 0.35rem;
`;

export const MenuLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.7rem;
  border-radius: 10px;
  font-size: 0.9rem;
  line-height: 1.3;

  svg {
    flex: 0 0 auto;
    font-size: 0.95rem;
    opacity: 0.4;
  }

  &:hover {
    background: ${props => `${props.theme.colors.primary}24`};

    svg {
      opacity: 0.85;
    }
  }
`;
