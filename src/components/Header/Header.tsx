import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 1.5rem 0 0;
`;

const Title = styled.h1`
  background: ${props => props.theme.gradients.header};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
`;

const TypingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 1rem;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TypingText = styled.p`
  color: ${props => props.theme.colors.text || '#D4D7F9'};
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
`;

const Header: React.FC = () => {
  const phrases = useMemo(() => [
    "Comprehensive tools to evaluate and optimize your keyboard & typing skills",
    "Clickity clackity, your keyboard goes whackity",
    "Test your typing speed and accuracy",
    "May the force of your fingers be with you",
    "Analyze your keyboard's performance",
    "Type like nobody's watching",
    "Find your perfect key switches",
    "Keyboard warriors welcome",
    "Improve your typing technique",
    "Typing at the speed of thought",
    "Unlock your full typing potential",
    "Cherry MX or bust",
    "Measure your words per minute and accuracy",
    "Mechanical keyboards: because your fingers deserve better",
    "Identify and correct your typing weaknesses",
    "I like big keys and I cannot lie",
    "Customize your keyboard layout for optimal performance",
    "Keep calm and type on",
    "Track your progress and see real improvements",
    "Typing: it's like talking, but with your fingers",
    "Ergonomic keyboard testing for comfort and health",
    "Silence is golden, but keyboard sounds are platinum",
    "Compare different keyboards with objective metrics",
    "Typing faster than the speed of light",
    "Reduce typing fatigue with proper technique",
    "Optimize your workspace for better typing performance",
    "Discover your ideal key actuation force",
    "Scientific approach to keyboard evaluation"
  ], []);
  
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);
  
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        // Typing forward
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        setTypingSpeed(60);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing, pause before deleting
        setIsDeleting(true);
        setTypingSpeed(1000); // Pause before deleting
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        setTypingSpeed(15);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setTypingSpeed(500); // Pause before starting next phrase
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed]);
  
  return (
    <HeaderContainer>
      <Title>Keyboard Test</Title>
      <Subtitle>
        Professional keyboard testing platform for mechanical keyboards, typing performance analysis, 
        and comprehensive keyboard evaluation.
      </Subtitle>
      <TypingContainer>
        <TypingText>{displayText}</TypingText>
      </TypingContainer>
    </HeaderContainer>
  );
};

export default Header;
