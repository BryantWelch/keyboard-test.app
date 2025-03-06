import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const InfoContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem auto 3rem auto;
  width: 100%;
  max-width: 1000px;
  box-shadow: ${props => props.theme.shadows.main};
`;

const InfoTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary}40;
  padding-bottom: 0.5rem;
`;

const InfoContent = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
`;

const SectionContent = styled.div`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
`;

const TableHeader = styled.th`
  background-color: ${props => props.theme.colors.primary}20;
  border: 1px solid ${props => props.theme.colors.primary}40;
  padding: 0.75rem;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid ${props => props.theme.colors.primary}40;
  padding: 0.75rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const InfoCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }
  
  h4 {
    color: ${props => props.theme.colors.primary};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

interface InfoSectionProps {
  activeTab: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ activeTab }) => {
  const renderKeyTestInfo = () => (
    <>
      <InfoTitle>Keyboard Information</InfoTitle>
      <InfoContent>
        <SectionTitle>Keyboard Types</SectionTitle>
        <SectionContent>
          There are many different types of keyboards available, each with their own unique characteristics and benefits.
        </SectionContent>
        
        <InfoGrid>
          <InfoCard>
            <h4>Mechanical Keyboards</h4>
            <p>Mechanical keyboards use individual mechanical switches under each key. They offer tactile feedback, durability, and customization options. Most enthusiasts prefer mechanical keyboards for their satisfying typing experience and longevity.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Membrane Keyboards</h4>
            <p>Membrane keyboards use a rubber dome sheet under the keys. They're quieter and less expensive than mechanical keyboards, but typically offer less tactile feedback and have shorter lifespans.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Scissor-Switch Keyboards</h4>
            <p>Common in laptops and low-profile keyboards, scissor switches use a scissor-like mechanism for stability. They offer a middle ground between mechanical and membrane keyboards.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Optical Keyboards</h4>
            <p>Optical keyboards use light beams to detect key presses, resulting in faster response times and fewer moving parts. They're popular in gaming keyboards where speed is crucial.</p>
          </InfoCard>
        </InfoGrid>
        
        <SectionTitle>Mechanical Key Switch Types</SectionTitle>
        <SectionContent>
          Mechanical switches come in various types, each with different actuation forces, tactile feedback, and sound profiles.
        </SectionContent>
        
        <Table>
          <thead>
            <tr>
              <TableHeader>Switch Type</TableHeader>
              <TableHeader>Characteristics</TableHeader>
              <TableHeader>Best For</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Cherry MX Red</TableCell>
              <TableCell>Linear, light actuation force (45g)</TableCell>
              <TableCell>Gaming, fast typing</TableCell>
            </tr>
            <tr>
              <TableCell>Cherry MX Blue</TableCell>
              <TableCell>Tactile with audible click, medium force (60g)</TableCell>
              <TableCell>Typing, programming</TableCell>
            </tr>
            <tr>
              <TableCell>Cherry MX Brown</TableCell>
              <TableCell>Tactile bump without click, medium force (55g)</TableCell>
              <TableCell>Mix of typing and gaming</TableCell>
            </tr>
            <tr>
              <TableCell>Gateron Yellow</TableCell>
              <TableCell>Smooth linear, medium force (50g)</TableCell>
              <TableCell>Gaming, smooth typing experience</TableCell>
            </tr>
            <tr>
              <TableCell>Topre</TableCell>
              <TableCell>Electrostatic capacitive, smooth tactile feel</TableCell>
              <TableCell>Premium typing experience</TableCell>
            </tr>
          </tbody>
        </Table>
        
        <SectionTitle>Keyboard Layouts</SectionTitle>
        <SectionContent>
          Keyboards come in various physical layouts, each offering different levels of compactness and functionality.
        </SectionContent>
        
        <List>
          <ListItem><strong>60% Layout</strong>: Compact design without function row, navigation cluster, or numpad. Popular for minimalists and those with limited desk space.</ListItem>
          <ListItem><strong>65% Layout</strong>: Similar to 60% but includes arrow keys and a few navigation keys. Good balance between compactness and functionality.</ListItem>
          <ListItem><strong>75% Layout</strong>: Includes function row and navigation keys in a compact layout. Popular among programmers who need function keys.</ListItem>
          <ListItem><strong>TKL (Tenkeyless)</strong>: Full-sized keyboard without the numpad. Offers more desk space while retaining most functionality.</ListItem>
          <ListItem><strong>Full-sized</strong>: Complete keyboard with numpad and all keys. Ideal for those who frequently use the numpad or need maximum functionality.</ListItem>
        </List>
        
        <SectionTitle>Keyboard Layout Types</SectionTitle>
        <SectionContent>
          Beyond physical layouts, keyboards can use different key arrangements:
        </SectionContent>
        
        <List>
          <ListItem><strong>QWERTY</strong>: The standard layout used by most keyboards, named after the first six letters in the top row.</ListItem>
          <ListItem><strong>Dvorak</strong>: Designed to increase typing speed and reduce finger fatigue by placing the most commonly used letters in the home row.</ListItem>
          <ListItem><strong>Colemak</strong>: A modern alternative to QWERTY and Dvorak with an easier learning curve. Changes only 17 key positions from QWERTY.</ListItem>
          <ListItem><strong>Colemak-DH</strong>: A modified version of Colemak with improved ergonomics for the D and H keys.</ListItem>
          <ListItem><strong>Workman</strong>: Designed to reduce finger strain by placing common keys in comfortable positions.</ListItem>
          <ListItem><strong>AZERTY</strong>: Used primarily in France and some French-speaking countries.</ListItem>
          <ListItem><strong>QWERTZ</strong>: Used in Germany, Austria, and other Central European countries.</ListItem>
        </List>
      </InfoContent>
    </>
  );

  const renderRolloverTestInfo = () => (
    <>
      <InfoTitle>Key Rollover Information</InfoTitle>
      <InfoContent>
        <SectionContent>
          Key rollover refers to a keyboard's ability to correctly register multiple simultaneous key presses. This is particularly important for gamers, fast typists, and anyone who needs to press multiple keys at once.
        </SectionContent>
        
        <SectionTitle>Types of Key Rollover</SectionTitle>
        
        <InfoGrid>
          <InfoCard>
            <h4>N-Key Rollover (NKRO)</h4>
            <p>Allows any number of keys to be pressed simultaneously with all keypresses being correctly detected. This is the gold standard for gaming keyboards and is typically found on high-end mechanical keyboards.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>6-Key Rollover (6KRO)</h4>
            <p>Allows up to 6 keys to be pressed simultaneously (plus modifier keys like Shift, Ctrl, Alt). This is sufficient for most users and is common in mid-range keyboards.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>2-Key Rollover (2KRO)</h4>
            <p>Only guarantees that two keys can be pressed simultaneously. Often found in basic or older keyboards, this can lead to "ghosting" issues when multiple keys are pressed.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Anti-Ghosting</h4>
            <p>A feature that prevents "ghost" keypresses (false inputs) when multiple keys are pressed simultaneously. Many gaming keyboards advertise anti-ghosting for specific key clusters commonly used in games.</p>
          </InfoCard>
        </InfoGrid>
        
        <SectionTitle>Why Rollover Matters</SectionTitle>
        <List>
          <ListItem><strong>Gaming</strong>: Many games require pressing multiple keys simultaneously (e.g., W+A+Shift+Space to sprint-jump diagonally in FPS games).</ListItem>
          <ListItem><strong>Fast Typing</strong>: Rapid typists may press a new key before releasing the previous one, requiring good rollover to maintain accuracy.</ListItem>
          <ListItem><strong>Keyboard Shortcuts</strong>: Power users often use complex keyboard shortcuts that involve multiple keys.</ListItem>
          <ListItem><strong>Music Production</strong>: When using a keyboard as a MIDI controller, rollover is essential for playing chords.</ListItem>
        </List>
        
        <SectionTitle>Testing Key Rollover</SectionTitle>
        <SectionContent>
          The rollover test on this site allows you to test how many simultaneous keypresses your keyboard can register. Here's how to interpret the results:
        </SectionContent>
        
        <List>
          <ListItem>If all keys register when pressed together, your keyboard has good rollover capability.</ListItem>
          <ListItem>If some keys don't register when many are pressed, your keyboard has limited rollover.</ListItem>
          <ListItem>If pressing certain key combinations causes other, unpressed keys to register (ghosting), your keyboard may have a basic key matrix without anti-ghosting features.</ListItem>
        </List>
        
        <SectionContent>
          USB keyboards typically support at least 6KRO due to USB protocol limitations, though many gaming keyboards use workarounds to achieve NKRO over USB.
        </SectionContent>
      </InfoContent>
    </>
  );

  const renderTypingTestInfo = () => (
    <>
      <InfoTitle>Typing Test Information</InfoTitle>
      <InfoContent>
        <SectionContent>
          Typing tests measure your typing speed and accuracy. Regular practice can help improve your typing skills, which is valuable for productivity in many professions.
        </SectionContent>
        
        <SectionTitle>Typing Metrics</SectionTitle>
        
        <InfoGrid>
          <InfoCard>
            <h4>Words Per Minute (WPM)</h4>
            <p>The standard measure of typing speed. One "word" is standardized as 5 characters or keystrokes, including spaces. The average typing speed is 40-60 WPM, while professional typists can reach 80-100+ WPM.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Accuracy</h4>
            <p>The percentage of correctly typed characters. High speed is only valuable with good accuracy. Most typing tests calculate a net WPM that accounts for errors.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Consistency</h4>
            <p>How steady your typing speed is throughout the test. Consistent typists maintain a similar speed without significant fluctuations.</p>
          </InfoCard>
          
          <InfoCard>
            <h4>Keystroke Dynamics</h4>
            <p>The patterns and rhythms of your typing, including how long you press each key and the time between keypresses. This can be as unique as a fingerprint.</p>
          </InfoCard>
        </InfoGrid>
        
        <SectionTitle>Improving Your Typing Skills</SectionTitle>
        <List>
          <ListItem><strong>Proper Posture</strong>: Sit up straight with your feet flat on the floor. Your wrists should hover above the keyboard, not rest on the desk.</ListItem>
          <ListItem><strong>Hand Position</strong>: Place your fingers on the home row (ASDF for left hand, JKL; for right hand). Your thumbs should rest on the space bar.</ListItem>
          <ListItem><strong>Touch Typing</strong>: Learn to type without looking at the keyboard. Each finger should be responsible for specific keys.</ListItem>
          <ListItem><strong>Regular Practice</strong>: Consistent practice is more effective than occasional long sessions. Even 15 minutes daily can lead to significant improvement.</ListItem>
          <ListItem><strong>Incremental Goals</strong>: Focus on accuracy first, then gradually increase your speed. Trying to type too quickly will lead to errors and frustration.</ListItem>
        </List>
        
        <SectionTitle>Typing Speed Benchmarks</SectionTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>Level</TableHeader>
              <TableHeader>WPM</TableHeader>
              <TableHeader>Description</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Beginner</TableCell>
              <TableCell>10-30</TableCell>
              <TableCell>Hunt-and-peck typing, looking at the keyboard</TableCell>
            </tr>
            <tr>
              <TableCell>Average</TableCell>
              <TableCell>40-60</TableCell>
              <TableCell>Comfortable typing speed for most people</TableCell>
            </tr>
            <tr>
              <TableCell>Proficient</TableCell>
              <TableCell>60-80</TableCell>
              <TableCell>Good typing speed, suitable for most professional needs</TableCell>
            </tr>
            <tr>
              <TableCell>Expert</TableCell>
              <TableCell>80-100</TableCell>
              <TableCell>Fast typing, often seen in professional typists</TableCell>
            </tr>
            <tr>
              <TableCell>Elite</TableCell>
              <TableCell>100+</TableCell>
              <TableCell>Exceptional typing speed, competitive level</TableCell>
            </tr>
          </tbody>
        </Table>
        
        <SectionContent>
          The world record for typing speed is over 200 WPM, but such speeds are extremely rare and not necessary for everyday typing tasks.
        </SectionContent>
      </InfoContent>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'keyTest':
      case 'layout':
      case 'type':
      case 'themes':
        return renderKeyTestInfo();
      case 'rolloverTest':
        return renderRolloverTestInfo();
      case 'typingTest':
        return renderTypingTestInfo();
      default:
        return null;
    }
  };

  // Only render if we have content for this tab
  if (!['keyTest', 'rolloverTest', 'typingTest', 'layout', 'type', 'themes'].includes(activeTab)) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <InfoContainer>
        {renderContent()}
      </InfoContainer>
    </motion.div>
  );
};

export default InfoSection;
