import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowRight, OpenInNew } from '@mui/icons-material';
import './KeyboardsDropdown.css';

// Styled components
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
  font-size: 1.1rem;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${props => props.theme.colors.background};
  min-width: 180px;
  width: 180px;
  box-shadow: ${props => props.theme.shadows.main};
  z-index: 1;
`;

const DropdownItem = styled.div`
  color: ${props => props.theme.colors.text};
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${props => props.theme.transitions.default};
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }
`;

const SubDropdownContainer = styled.div`
  position: relative;
  width: 100%;
  
  &:hover > div {
    display: block;
  }
`;

const SubDropdownContent = styled.div`
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  background-color: ${props => props.theme.colors.background};
  min-width: 220px;
  width: 220px;
  box-shadow: ${props => props.theme.shadows.main};
`;

const DropdownLink = styled.a`
  color: ${props => props.theme.colors.text};
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${props => props.theme.transitions.default};
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }
`;

// Keyboard data structure
interface KeyboardCategory {
  name: string;
  keyboards: {
    name: string;
    url: string;
  }[];
}

const keyboardCategories: KeyboardCategory[] = [
  {
    name: "60% Keyboards",
    keyboards: [
      { name: "Logitech G PRO X 60", url: "https://amzn.to/3G6o6HD" },
      { name: "Razer Huntsman V3 Pro Mini", url: "https://amzn.to/3TS2dig" },
      { name: "Ducky One 3 Mini Aura", url: "https://amzn.to/3TfQvxR" },
      { name: "Razer Huntsman Mini", url: "https://amzn.to/44bfjgO" },
      { name: "RK ROYAL KLUDGE RK61", url: "https://amzn.to/4esOojT" }
    ]
  },
  {
    name: "65% Keyboards",
    keyboards: [
      { name: "HyperX Alloy Origins 65", url: "https://amzn.to/4nxsXT6" },
      { name: "Keychron Q2 Max", url: "https://amzn.to/4esrw4d" },
      { name: "Ducky One 3 SF", url: "https://amzn.to/3TkEWFI" },
      { name: "EPOMAKER EK68", url: "https://amzn.to/4lwx2Vw" },
      { name: "ASUS ROG Falchion NX", url: "https://amzn.to/3GiQXZm" }
    ]
  },
  {
    name: "75% Keyboards",
    keyboards: [
      { name: "Corsair K65 Plus", url: "https://amzn.to/45Pfgsc" },
      { name: "Keychron K2", url: "https://amzn.to/3Tie356" },
      { name: "HyperX Alloy Rise", url: "https://amzn.to/3TNXWwe" },
      { name: "ASUS ROG Azoth", url: "https://amzn.to/4knmt6r" },
      { name: "Razer BlackWidow V4 Pro", url: "https://amzn.to/4etNfZe" }
    ]
  },
  {
    name: "TKL Keyboards",
    keyboards: [
      { name: "SteelSeries Apex Pro TKL Gen 3", url: "https://amzn.to/4kgVs4k" },
      { name: "Logitech G915", url: "https://amzn.to/44mgkkN" },
      { name: "Corsair K70 PRO", url: "https://amzn.to/3ZXiQg8" },
      { name: "Razer BlackWidow V3", url: "https://amzn.to/4lqLhLI" },
      { name: "HyperX Alloy Origins Core", url: "https://amzn.to/4lrudVO" }
    ]
  },
  {
    name: "Full Size Keyboards",
    keyboards: [
      { name: "Keychron C2", url: "https://amzn.to/44FucYF" },
      { name: "Logitech MX", url: "https://amzn.to/4l4PAwh" },
      { name: "Logitech G915", url: "https://amzn.to/4lbeWc2" },
      { name: "Corsair K100", url: "https://amzn.to/4l4PHbb" },
      { name: "SteelSeries Apex Pro", url: "https://amzn.to/4kjDoqr" }
    ]
  }
];

const KeyboardsDropdown: React.FC = () => {
  return (
    <DropdownContainer>
      <DropdownButton>
        Keyboards
        <KeyboardArrowDown />
      </DropdownButton>
      
      <DropdownContent>
        {keyboardCategories.map((category, index) => (
          <SubDropdownContainer key={index}>
            <DropdownItem className="dropdown-item">
              {category.name}
              <KeyboardArrowRight className="arrow-icon" fontSize="small" />
            </DropdownItem>
            
            <SubDropdownContent>
              {category.keyboards.map((keyboard, keyboardIndex) => (
                <DropdownLink 
                  key={keyboardIndex} 
                  href={keyboard.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {keyboard.name}
                  <OpenInNew fontSize="small" />
                </DropdownLink>
              ))}
            </SubDropdownContent>
          </SubDropdownContainer>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default KeyboardsDropdown;
