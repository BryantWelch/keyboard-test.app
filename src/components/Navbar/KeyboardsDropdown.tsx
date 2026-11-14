import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown, OpenInNew } from '@mui/icons-material';
import { Chevron, Menu, MenuButton, MenuCard, MenuLink, MenuPanel } from './menu';

const Columns = styled.div`
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 0.25rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  @media (max-width: 720px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;

const Category = styled.button<{ $active?: boolean }>`
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 550;
  color: ${props => props.theme.colors.text};
  background: ${props => props.$active ? `${props.theme.colors.primary}28` : 'transparent'};
  border-radius: 10px;
  padding: 0.5rem 0.7rem;

  &:hover {
    background: ${props => `${props.theme.colors.primary}22`};
  }

  @media (max-width: 720px) {
    width: auto;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-left: 0.35rem;
  border-left: 1px solid ${props => `${props.theme.colors.primary}24`};

  @media (max-width: 720px) {
    padding-left: 0;
    border-left: none;
    border-top: 1px solid ${props => `${props.theme.colors.primary}24`};
    padding-top: 0.35rem;
    margin-top: 0.2rem;
  }
`;

interface CatalogCategory {
  name: string;
  short: string;
  items: {
    name: string;
    url: string;
  }[];
}

const amazon = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=bryantwelch-20`;

const boards: CatalogCategory[] = [
  {
    name: '60% Keyboards',
    short: '60%',
    items: [
      { name: 'Logitech G PRO X 60', url: 'https://amzn.to/3G6o6HD' },
      { name: 'Razer Huntsman V3 Pro Mini', url: 'https://amzn.to/3TS2dig' },
      { name: 'Ducky One 3 Mini Aura', url: 'https://amzn.to/3TfQvxR' },
      { name: 'Razer Huntsman Mini', url: 'https://amzn.to/44bfjgO' },
      { name: 'RK ROYAL KLUDGE RK61', url: 'https://amzn.to/4esOojT' },
      { name: 'Keychron Q4', url: amazon('B09DSD5D33') }
    ]
  },
  {
    name: '65% Keyboards',
    short: '65%',
    items: [
      { name: 'HyperX Alloy Origins 65', url: 'https://amzn.to/4nxsXT6' },
      { name: 'Keychron Q2 Max', url: 'https://amzn.to/4esrw4d' },
      { name: 'Ducky One 3 SF', url: 'https://amzn.to/3TkEWFI' },
      { name: 'EPOMAKER EK68', url: 'https://amzn.to/4lwx2Vw' },
      { name: 'ASUS ROG Falchion NX', url: 'https://amzn.to/3GiQXZm' },
      { name: 'Keychron K6', url: amazon('B096TMX4C2') }
    ]
  },
  {
    name: '75% Keyboards',
    short: '75%',
    items: [
      { name: 'Corsair K65 Plus', url: 'https://amzn.to/45Pfgsc' },
      { name: 'Keychron K2', url: 'https://amzn.to/3Tie356' },
      { name: 'HyperX Alloy Rise', url: 'https://amzn.to/3TNXWwe' },
      { name: 'ASUS ROG Azoth', url: 'https://amzn.to/4knmt6r' },
      { name: 'Razer BlackWidow V4 Pro', url: 'https://amzn.to/4etNfZe' },
      { name: 'Keychron Q1', url: amazon('B09TXCVSS7') }
    ]
  },
  {
    name: 'TKL Keyboards',
    short: 'TKL',
    items: [
      { name: 'SteelSeries Apex Pro TKL Gen 3', url: 'https://amzn.to/4kgVs4k' },
      { name: 'Logitech G915', url: 'https://amzn.to/44mgkkN' },
      { name: 'Corsair K70 PRO', url: 'https://amzn.to/3ZXiQg8' },
      { name: 'Razer BlackWidow V3', url: 'https://amzn.to/4lqLhLI' },
      { name: 'HyperX Alloy Origins Core', url: 'https://amzn.to/4lrudVO' },
      { name: 'Keychron K8 Pro', url: amazon('B0BHVKJF7R') }
    ]
  },
  {
    name: '96% Keyboards',
    short: '96%',
    items: [
      { name: 'Keychron Q5', url: amazon('B09MNFWJ3G') },
      { name: 'Keychron K4', url: amazon('B0DJY2SLHB') },
      { name: 'Keychron K17 Pro', url: amazon('B0CJJ7T8NM') },
      { name: 'RK ROYAL KLUDGE RK96', url: amazon('B09XCCF742') },
      { name: 'EPOMAKER TH98', url: amazon('B09R1QTG4M') },
      { name: 'Akko 3098B', url: amazon('B0CGHFCTS3') }
    ]
  },
  {
    name: 'Full Size Keyboards',
    short: 'Full',
    items: [
      { name: 'Keychron C2', url: 'https://amzn.to/44FucYF' },
      { name: 'Logitech MX', url: 'https://amzn.to/4l4PAwh' },
      { name: 'Logitech G915', url: 'https://amzn.to/4lbeWc2' },
      { name: 'Corsair K100', url: 'https://amzn.to/4l4PHbb' },
      { name: 'SteelSeries Apex Pro', url: 'https://amzn.to/4kjDoqr' },
      { name: 'Keychron K10', url: amazon('B0F9FRS36J') }
    ]
  }
];

const parts: CatalogCategory[] = [
  {
    name: 'Switches',
    short: 'Switches',
        items: [
          { name: 'Cherry MX Red', url: amazon('B0CBS4HJJR') },
          { name: 'Gateron Milky Yellow Pro', url: amazon('B0CXPRB9F8') },
          { name: 'Gateron Yellow Pro', url: amazon('B09PFX1FKV') },
          { name: 'Gateron Brown Pro', url: amazon('B0B28XBH9L') },
          { name: 'Kailh Box Red', url: amazon('B0841H5RVY') },
          { name: 'Kailh Box White', url: amazon('B0D1DMQK4X') }
        ]
  },
  {
    name: 'Keycaps',
    short: 'Keycaps',
        items: [
          { name: 'HK Gaming Modern Dolch', url: amazon('B08BKS31JZ') },
          { name: 'YMDK Cherry Profile', url: amazon('B086XB727P') },
          { name: 'YMDK Doubleshot Pudding', url: amazon('B09TXDW5W7') },
          { name: 'HyperX Pudding', url: amazon('B07JDVG4RQ') },
          { name: 'ASA Pudding Keycaps', url: amazon('B0BZPKL2GS') },
          { name: 'Akko Black and Silver', url: amazon('B09RWQJPBT') }
        ]
  },
  {
    name: 'Stabilizers',
    short: 'Stabilizers',
        items: [
          { name: 'Durock Plate Mount Kit', url: amazon('B0CRRHP9MY') },
          { name: 'Durock V3 Screw-in', url: amazon('B0B8ZFMYBG') },
          { name: 'Cherry Screw-in', url: amazon('B082Z5P769') },
          { name: 'Durock V2 Screw-in', url: amazon('B0B2RR8YB3') },
          { name: 'C3 Equalz V3', url: amazon('B0BXPVY39W') },
          { name: 'TX AP Stabilizers', url: amazon('B0CJ87QBVL') }
        ]
  },
  {
    name: 'Lubes',
    short: 'Lubes',
    items: [
      { name: 'Krytox 205g0', url: amazon('B09QJ8M66J') },
      { name: 'Tribosys 3204', url: amazon('B0B4VV161H') },
      { name: 'Krytox GPL 105', url: amazon('B08NCL19Y7') },
      { name: 'Permatex Dielectric Grease', url: amazon('B000AL8VD2') },
      { name: 'Tribosys 3203', url: amazon('B0D8DF47K1') },
      { name: 'Krytox 205g0, 5g', url: amazon('B0BYYD7ZP6') }
    ]
  },
  {
    name: 'Keyboard Kits',
    short: 'Kits',
    items: [
      { name: 'Keychron Q2 Barebone', url: amazon('B09DSP73SF') },
      { name: 'Keychron V1 Barebone', url: amazon('B09NKQYPPL') },
      { name: 'Keychron Q3 Barebone', url: amazon('B09DRTDKP3') },
      { name: 'Keychron Q5 Barebone', url: amazon('B09MM1MX9L') },
      { name: 'Keychron Q4 Barebone', url: amazon('B09DRR2C61') },
      { name: 'Keychron Q6 Pro Barebone', url: amazon('B0C49K5NPZ') }
    ]
  },
  {
    name: 'Tools',
    short: 'Tools',
    items: [
      { name: 'Switch and Keycap Puller', url: amazon('B0BXSJ3HL7') },
      { name: 'Acrylic Lube Station', url: amazon('B08YNYPX97') },
      { name: 'Aluminum Lube Station', url: amazon('B0DK6H2XMH') },
      { name: 'Switch Opener Kit', url: amazon('B091GX2QBF') },
      { name: 'Wire Keycap Puller', url: amazon('B075CZCTXM') },
      { name: 'Switch Opener and Tweezers', url: amazon('B09VKVYSFN') }
    ]
  }
];

const CatalogMenu: React.FC<{
  label: string;
  categories: CatalogCategory[];
}> = ({ label, categories }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(categories[0].short);
  const category = categories.find(item => item.short === active) ?? categories[0];

  return (
    <Menu
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <MenuButton type="button" $open={open} aria-expanded={open} aria-haspopup="true">
        {label}
        <Chevron $open={open}><KeyboardArrowDown /></Chevron>
      </MenuButton>

      <MenuPanel $open={open} $wide>
        <MenuCard>
          <Columns>
            <Categories>
              {categories.map(item => (
                <Category
                  key={item.short}
                  type="button"
                  $active={item.short === active}
                  onMouseEnter={() => setActive(item.short)}
                  onFocus={() => setActive(item.short)}
                >
                  {item.short}
                </Category>
              ))}
            </Categories>
            <ProductList aria-label={category.name}>
              {category.items.map(item => (
                <MenuLink
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  {item.name}
                  <OpenInNew />
                </MenuLink>
              ))}
            </ProductList>
          </Columns>
        </MenuCard>
      </MenuPanel>
    </Menu>
  );
};

const KeyboardsDropdown: React.FC = () => (
  <CatalogMenu label="Keyboards" categories={boards} />
);

export const PartsDropdown: React.FC = () => (
  <CatalogMenu label="Parts" categories={parts} />
);

export default KeyboardsDropdown;
