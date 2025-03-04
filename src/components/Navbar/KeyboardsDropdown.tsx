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
      { name: "Ducky One 3 Mini", url: "https://www.amazon.com/Ducky-Double-Shot-Mechanical-Keyboard/dp/B08XC3VHFD" },
      { name: "Anne Pro 2", url: "https://www.amazon.com/ANNE-PRO-Wireless-Mechanical-Keyboard/dp/B07Y53G7B6" },
      { name: "GMMK 2", url: "https://www.amazon.com/Glorious-Modular-Mechanical-Keyboard-Barebone/dp/B09QJR3BWN" },
      { name: "Razer Huntsman Mini", url: "https://www.amazon.com/Razer-Huntsman-Mini-Gaming-Keyboard/dp/B08B3JSKGR" },
      { name: "Royal Kludge RK61", url: "https://www.amazon.com/RK-ROYAL-KLUDGE-Mechanical-Keyboard/dp/B0832BJG9H" }
    ]
  },
  {
    name: "65% Keyboards",
    keyboards: [
      { name: "Ducky One 3 SF", url: "https://www.amazon.com/Ducky-Double-Shot-Mechanical-Keyboard/dp/B09HGTBFB4" },
      { name: "Keychron K6", url: "https://www.amazon.com/Keychron-Swappable-Bluetooth-Mechanical-Keyboard/dp/B083LDHD8M" },
      { name: "Drop ALT", url: "https://www.amazon.com/Drop-ALT-Mechanical-Keyboard-Programmable/dp/B07SX1QV21" },
      { name: "Razer BlackWidow V3 Mini", url: "https://www.amazon.com/Razer-BlackWidow-HyperSpeed-Wireless-Mechanical/dp/B0932FPSJF" },
      { name: "GMMK Pro", url: "https://www.amazon.com/Glorious-Modular-Mechanical-Keyboard-Barebone/dp/B09968ZYDK" }
    ]
  },
  {
    name: "75% Keyboards",
    keyboards: [
      { name: "Keychron Q1", url: "https://www.amazon.com/Keychron-Mechanical-Keyboard-Double-Shot-Programmable/dp/B09KZPGZS3" },
      { name: "GMMK Pro", url: "https://www.amazon.com/Glorious-Modular-Mechanical-Keyboard-Barebone/dp/B09968ZYDK" },
      { name: "Vortex Race 3", url: "https://www.amazon.com/Vortex-75-Keycaps-Mx-Blue-Aluminium/dp/B072JD9BCL" },
      { name: "Akko MOD 007", url: "https://www.amazon.com/EPOMAKER-Mechanical-Keyboard-Programmable-Swappable/dp/B0B8ZV1JKW" },
      { name: "Epomaker TH80", url: "https://www.amazon.com/EPOMAKER-Mechanical-Keyboard-Programmable-Swappable/dp/B09GFPVD87" }
    ]
  },
  {
    name: "TKL Keyboards",
    keyboards: [
      { name: "Ducky One 3 TKL", url: "https://www.amazon.com/Ducky-Double-Shot-Mechanical-Keyboard/dp/B09C11W2G9" },
      { name: "Keychron K8", url: "https://www.amazon.com/Keychron-Swappable-Bluetooth-Mechanical-Keyboard/dp/B0875TZQV9" },
      { name: "Drop CTRL", url: "https://www.amazon.com/Drop-CTRL-Mechanical-Keyboard-Programmable/dp/B07W5PD6VS" },
      { name: "Logitech G915 TKL", url: "https://www.amazon.com/Logitech-Tenkeyless-Lightspeed-Mechanical-LIGHTSYNC/dp/B085RLZ1C5" },
      { name: "Razer Huntsman Tournament Edition", url: "https://www.amazon.com/Razer-Huntsman-Tournament-Tenkeyless-Keyboard/dp/B07V25YPVW" }
    ]
  },
  {
    name: "Full Size Keyboards",
    keyboards: [
      { name: "Ducky One 3", url: "https://www.amazon.com/Ducky-Double-Shot-Mechanical-Keyboard/dp/B09C13TD1D" },
      { name: "Keychron K10", url: "https://www.amazon.com/Keychron-Mechanical-Keyboard-Bluetooth-Wireless/dp/B09715TGLL" },
      { name: "Logitech G915", url: "https://www.amazon.com/Logitech-Wireless-Mechanical-Keyboard-Tactile/dp/B07NY9ZT92" },
      { name: "Corsair K100", url: "https://www.amazon.com/CORSAIR-K100-Mechanical-Gaming-Keyboard/dp/B08HR77BJ1" },
      { name: "SteelSeries Apex Pro", url: "https://www.amazon.com/SteelSeries-Apex-Mechanical-Gaming-Keyboard/dp/B07SVJJCP3" }
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
