import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 3rem 0 2rem;
  margin-top: auto;
  text-align: center;
  position: relative;
  border-top: 1px solid ${props => props.theme.colors.primary}22;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  padding: 0 2rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  text-align: center;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    background: linear-gradient(to right, ${props => props.theme.colors.text}, ${props => props.theme.colors.primary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;

  li {
    margin-bottom: 0.75rem;
  }
`;

const ExternalLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem 2rem 0;
  border-top: 1px solid ${props => props.theme.colors.primary}22;
  color: ${props => props.theme.colors.text};
  opacity: 0.6;
  font-size: 0.9rem;
  position: relative;
`;

const KofiButton = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
  }
`;

const KofiLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  img {
    border: 0;
    height: 36px;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About</h3>
          <FooterLinks>
            <li>
              <ExternalLink href="https://github.com/BryantWelch/keyboard-test.app" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/BryantWelch/keyboard-test.app/issues" target="_blank" rel="noopener noreferrer">
                Report an Issue
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/BryantWelch/keyboard-test.app/pulls" target="_blank" rel="noopener noreferrer">
                Contribute
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/BryantWelch/keyboard-test.app/releases" target="_blank" rel="noopener noreferrer">
                Releases
              </ExternalLink>
            </li>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Resources</h3>
          <FooterLinks>
            <li>
              <ExternalLink href="https://www.mechanical-keyboard.org/" target="_blank" rel="noopener noreferrer">
                Keyboard Encyclopedia
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.keychron.com/pages/how-to-choose-switches" target="_blank" rel="noopener noreferrer">
                Switch Guide
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://keyboard.university/" target="_blank" rel="noopener noreferrer">
                Keyboard University
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.keyboardco.com/blog/" target="_blank" rel="noopener noreferrer">
                Keyboard Blog
              </ExternalLink>
            </li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Community</h3>
          <FooterLinks>
            <li>
              <ExternalLink href="https://www.reddit.com/r/MechanicalKeyboards/" target="_blank" rel="noopener noreferrer">
                r/MechanicalKeyboards
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://geekhack.org/index.php" target="_blank" rel="noopener noreferrer">
                GeekHack Forum
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://deskthority.net/" target="_blank" rel="noopener noreferrer">
                Deskthority
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://discord.gg/mechanicalkeyboards" target="_blank" rel="noopener noreferrer">
                MechKeys Discord
              </ExternalLink>
            </li>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <div>
          &copy; {currentYear} Keyboard Test App. Open source under{' '}
          <ExternalLink 
            href="https://github.com/BryantWelch/keyboard-test.app/blob/main/LICENSE" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            MIT License
          </ExternalLink>
          {' • '}
          <a href="/privacy">Privacy Policy</a>
        </div>
      </Copyright>

      <KofiButton>
        <KofiLink href='https://ko-fi.com/V7V01A0SJC' target='_blank' rel="noopener noreferrer">
          <img src='https://storage.ko-fi.com/cdn/kofi5.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
        </KofiLink>
      </KofiButton>
    </FooterContainer>
  );
};

export default Footer;
