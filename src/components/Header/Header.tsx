import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 1.35rem 0 0.15rem;
`;

const Title = styled.h1`
  background: ${props => props.theme.gradients.header};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.05;
  margin: 0 0 0.55rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.05rem;
  font-weight: 400;
  opacity: 0.78;
  margin: 0 auto;
  max-width: 38rem;
  line-height: 1.5;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Keyboard Test</Title>
      <Subtitle>
        Check every key, measure how many you can hold at once, and time your typing.
        Pressed keys stay marked, and the ones you hit most warm up.
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;
