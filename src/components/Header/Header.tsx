import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 2rem 0;
`;

const Title = styled.h1`
  background: ${props => props.theme.gradients.header};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Professional Keyboard Testing</Title>
      <Subtitle>
        Comprehensive tools to evaluate and optimize your keyboard and typing skills
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;
