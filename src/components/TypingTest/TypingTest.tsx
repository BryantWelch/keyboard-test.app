import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  TestMode, 
  WordCountOption, 
  TimeOption, 
  TestStats,
  WordStatus,
  TypedWord,
  TypingTestProps
} from './types';
import { getRandomWords, getRandomSentences, getRandomParagraphs } from './words';

// Styled components
const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const TestOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1.5rem;
`;

const OptionLabel = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const OptionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const OptionButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : `${props.theme.colors.primary}20`};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TestArea = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  position: relative;
  min-height: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const WordsDisplay = styled.div`
  font-size: 1.35rem;
  line-height: 1.75;
  height: calc(1.35rem * 1.75 * 5);
  position: relative;
  color: ${props => props.theme.colors.text};
  overflow: hidden;
  cursor: text;
  user-select: none;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
`;

const Word = styled.span<{ $status: WordStatus }>`
  position: relative;
  color: ${props => {
    if (props.$status === 'incorrect') return props.theme.colors.error;
    if (props.$status === 'correct') return `${props.theme.colors.text}99`;
    return `${props.theme.colors.text}cc`;
  }};
  text-decoration: ${props => props.$status === 'incorrect' ? 'underline' : 'none'};
`;

const Char = styled.span<{ $state: 'wait' | 'ok' | 'bad' }>`
  color: ${props => {
    if (props.$state === 'ok') return props.theme.colors.primary;
    if (props.$state === 'bad') return props.theme.colors.error;
    return 'inherit';
  }};
  text-decoration: ${props => props.$state === 'bad' ? 'underline' : 'none'};
`;

const Caret = styled.span<{ $chars: number }>`
  position: absolute;
  left: ${props => props.$chars}ch;
  top: 0.12em;
  width: 2px;
  height: 1.15em;
  background: ${props => props.theme.colors.primary};
  pointer-events: none;
  animation: caret-blink 1s steps(1) infinite;

  @keyframes caret-blink {
    50% { opacity: 0; }
  }
`;

const InputField = styled.input`
  position: fixed;
  opacity: 0;
  pointer-events: none;
  width: 1px;
  height: 1px;
  border: 0;
  padding: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
`;

const StatBox = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 6px;
  padding: 1rem;
  flex: 1;
  margin: 0 0.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text}80;
`;

const ActionButton = styled(motion.button)`
  align-self: center;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}cc;
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.primary}60;
    cursor: not-allowed;
  }
`;

const Timer = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  text-align: right;
`;

// Initial test stats
const initialStats: TestStats = {
  wpm: 0,
  accuracy: 0,
  correctWords: 0,
  incorrectWords: 0,
  timeElapsed: 0
};

const calculateStatsFromWords = (
  testWords: TypedWord[],
  startedAt: number | null,
  completedAt: number
): TestStats => {
  if (!startedAt) {
    return initialStats;
  }

  const timeElapsed = Math.max(completedAt - startedAt, 1);
  const timeInMinutes = timeElapsed / 1000 / 60;
  const correctWords = testWords.filter(word => word.status === 'correct').length;
  const incorrectWords = testWords.filter(word => word.status === 'incorrect').length;
  const totalTypedWords = correctWords + incorrectWords;

  return {
    wpm: Math.round(correctWords / timeInMinutes),
    accuracy: totalTypedWords > 0
      ? Math.round((correctWords / totalTypedWords) * 100)
      : 0,
    correctWords,
    incorrectWords,
    timeElapsed
  };
};

const TypingTest: React.FC<TypingTestProps> = ({ onReset }) => {
  // State for test configuration
  const [testMode, setTestMode] = useState<TestMode>('wordCount');
  const [wordCount, setWordCount] = useState<WordCountOption>(50);
  const [timedOption, setTimedOption] = useState<TimeOption>('1m');
  
  // State for test data and progress
  const [words, setWords] = useState<TypedWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TestStats>(initialStats);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const currentWordRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordsRef = useRef<TypedWord[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const updateWords = useCallback((nextWords: TypedWord[]) => {
    wordsRef.current = nextWords;
    setWords(nextWords);
  }, []);
  
  // Convert timed option to seconds
  const getTimeInSeconds = (option: TimeOption): number => {
    switch (option) {
      case '15s':
        return 15;
      case '30s':
        return 30;
      case '1m':
        return 60;
      case '2m':
        return 120;
      case '3m':
        return 180;
      default:
        return 60;
    }
  };

  // Initialize test words based on selected mode
  const initializeTest = useCallback(() => {
    if (testMode === 'wordCount') {
      // Get random words for word count test
      const randomWords = getRandomWords(wordCount);
      const typedWords = randomWords.map(word => ({
        text: word,
        status: 'upcoming' as WordStatus
      }));
      
      // Set the first word as current
      if (typedWords.length > 0) {
        typedWords[0].status = 'current';
      }
      
      updateWords(typedWords);
    } else {
      // Get random sentences or paragraphs for timed test
      // For timed tests, we need more words than expected to be typed
      // Estimate words per minute at 40 and multiply by time limit
      const timeInSeconds = getTimeInSeconds(timedOption);
      const estimatedWordCount = Math.ceil(40 * (timeInSeconds / 60) * 1.5); // Add 50% buffer
      
      let text: string;
      if (timeInSeconds <= 60) {
        text = getRandomSentences(estimatedWordCount);
      } else {
        text = getRandomParagraphs(estimatedWordCount);
      }
      
      // Split text into words
      const textWords = text.split(/\s+/).filter(word => word.length > 0);
      const typedWords = textWords.map(word => ({
        text: word,
        status: 'upcoming' as WordStatus
      }));
      
      // Set the first word as current
      if (typedWords.length > 0) {
        typedWords[0].status = 'current';
      }
      
      updateWords(typedWords);
    }
    
    // Reset test state
    setCurrentWordIndex(0);
    setCurrentInput('');
    setIsTestActive(false);
    setIsTestComplete(false);
    setStartTime(null);
    setEndTime(null);
    startTimeRef.current = null;
    setStats(initialStats);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [testMode, wordCount, timedOption, updateWords]);

  // Complete the test using the latest word state, even from timer callbacks.
  const completeTest = useCallback((
    finalWords: TypedWord[] = wordsRef.current,
    completedAt: number = Date.now(),
    startedAt: number | null = startTimeRef.current
  ) => {
    setIsTestActive(false);
    setIsTestComplete(true);
    setEndTime(completedAt);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setStats(calculateStatsFromWords(finalWords, startedAt, completedAt));
  }, []);

  // Start the test
  const startTest = () => {
    const startedAt = Date.now();
    setIsTestActive(true);
    setStartTime(startedAt);
    startTimeRef.current = startedAt;
    
    if (testMode === 'timed') {
      // Calculate the exact end time
      const timeLimit = getTimeInSeconds(timedOption) * 1000;
      const endTimeValue = startedAt + timeLimit;
      
      // Start the timer that checks every 100ms
      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        
        // Check if we've reached or passed the end time
        if (currentTime >= endTimeValue) {
          completeTest(wordsRef.current, endTimeValue, startedAt);
        }
      }, 100); // Check more frequently (every 100ms) for more precise timing
    }
    
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const refreshStats = useCallback(() => {
    setStats(calculateStatsFromWords(wordsRef.current, startTimeRef.current, Date.now()));
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Start the test if it's not active
    if (!isTestActive && value.length > 0) {
      startTest();
    }
    
    // If the test is complete, don't process input
    if (isTestComplete) return;
    
    // If there's a space, check the word
    if (value.endsWith(' ')) {
      checkWord(value.trim());
      setCurrentInput('');
    } else {
      setCurrentInput(value);
    }
  };

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isTestActive) return;
    
    // Handle Tab key to skip current word
    if (e.key === 'Tab') {
      e.preventDefault();
      skipWord();
    }
  };

  // Check the current word
  const checkWord = (input: string) => {
    if (currentWordIndex >= words.length) return;
    
    const currentWord = words[currentWordIndex];
    const isCorrect = input === currentWord.text;
    
    // Update word status
    const updatedWords = [...words];
    updatedWords[currentWordIndex].status = isCorrect ? 'correct' : 'incorrect';
    
    // Move to next word if available
    if (currentWordIndex + 1 < words.length) {
      updatedWords[currentWordIndex + 1].status = 'current';
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // End of test for word count mode
      if (testMode === 'wordCount') {
        completeTest(updatedWords);
      }
    }
    
    updateWords(updatedWords);
  };

  // Skip the current word
  const skipWord = () => {
    if (currentWordIndex >= words.length) return;
    
    // Mark current word as incorrect
    const updatedWords = [...words];
    updatedWords[currentWordIndex].status = 'incorrect';
    
    // Move to next word if available
    if (currentWordIndex + 1 < words.length) {
      updatedWords[currentWordIndex + 1].status = 'current';
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // End of test for word count mode
      if (testMode === 'wordCount') {
        completeTest(updatedWords);
      }
    }
    
    updateWords(updatedWords);
    setCurrentInput('');
  };

  // Reset the test
  const resetTest = useCallback(() => {
    initializeTest();
    
    // Call the onReset prop if provided
    if (onReset) {
      onReset();
    }
  }, [initializeTest, onReset]);

  // Format time in mm:ss format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Format elapsed time in mm:ss format
  const formatElapsedTime = () => {
    if (!isTestActive && !isTestComplete) return '0:00';
    
    const timeElapsed = isTestComplete && endTime && startTime
      ? endTime - startTime 
      : startTime ? Date.now() - startTime : 0;
    
    return formatTime(Math.floor(timeElapsed / 1000));
  };

  // Initialize test on mount and when test configuration changes
  useEffect(() => {
    initializeTest();
    
    // Cleanup function to clear timer
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testMode, wordCount, timedOption, initializeTest]);
  
  // Listen for reset events
  useEffect(() => {
    const handleReset = () => {
      resetTest();
    };
    
    window.addEventListener('typing-test-reset', handleReset);
    
    return () => {
      window.removeEventListener('typing-test-reset', handleReset);
    };
  }, [resetTest]);
  
  // Update stats periodically during the test
  useEffect(() => {
    if (isTestActive && startTime) {
      const statsInterval = setInterval(() => {
        refreshStats();
      }, 250);
      
      return () => clearInterval(statsInterval);
    }
  }, [isTestActive, startTime, refreshStats]);
  
  useEffect(() => {
    const node = currentWordRef.current;
    const parent = node?.parentElement;
    if (!node || !parent) {
      return;
    }

    if (currentWordIndex === 0) {
      parent.scrollTop = 0;
      return;
    }

    const lineHeight = parseFloat(getComputedStyle(parent).lineHeight) || node.offsetHeight;
    const lastComfortableLine = parent.scrollTop + parent.clientHeight - lineHeight * 2;
    if (node.offsetTop > lastComfortableLine + 1) {
      const target = node.offsetTop - (parent.clientHeight - lineHeight * 2);
      parent.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    } else if (node.offsetTop < parent.scrollTop) {
      parent.scrollTop = node.offsetTop;
    }
  }, [currentWordIndex]);
  useEffect(() => {
    // Focus the input field after a short delay to ensure it's rendered
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <TestContainer>
      <TestOptions>
        <OptionGroup>
          <OptionLabel>Test Mode</OptionLabel>
          <OptionButtons>
            <OptionButton 
              active={testMode === 'wordCount'} 
              onClick={() => setTestMode('wordCount')}
              disabled={isTestActive}
            >
              Word Count
            </OptionButton>
            <OptionButton 
              active={testMode === 'timed'} 
              onClick={() => setTestMode('timed')}
              disabled={isTestActive}
            >
              Timed
            </OptionButton>
          </OptionButtons>
        </OptionGroup>
        
        {testMode === 'wordCount' ? (
          <OptionGroup>
            <OptionLabel>Word Count</OptionLabel>
            <OptionButtons>
              {[10, 25, 50, 100, 250].map(count => (
                <OptionButton 
                  key={count}
                  active={wordCount === count} 
                  onClick={() => setWordCount(count as WordCountOption)}
                  disabled={isTestActive}
                >
                  {count}
                </OptionButton>
              ))}
            </OptionButtons>
          </OptionGroup>
        ) : (
          <OptionGroup>
            <OptionLabel>Time Limit</OptionLabel>
            <OptionButtons>
              <OptionButton 
                active={timedOption === '15s'} 
                onClick={() => setTimedOption('15s')}
                disabled={isTestActive}
              >
                15s
              </OptionButton>
              <OptionButton 
                active={timedOption === '30s'} 
                onClick={() => setTimedOption('30s')}
                disabled={isTestActive}
              >
                30s
              </OptionButton>
              <OptionButton 
                active={timedOption === '1m'} 
                onClick={() => setTimedOption('1m')}
                disabled={isTestActive}
              >
                1m
              </OptionButton>
              <OptionButton 
                active={timedOption === '2m'} 
                onClick={() => setTimedOption('2m')}
                disabled={isTestActive}
              >
                2m
              </OptionButton>
              <OptionButton 
                active={timedOption === '3m'} 
                onClick={() => setTimedOption('3m')}
                disabled={isTestActive}
              >
                3m
              </OptionButton>
            </OptionButtons>
          </OptionGroup>
        )}
      </TestOptions>
      
      <TestArea>
        {testMode === 'timed' && (
          <Timer>
            {formatElapsedTime()} / {formatTime(getTimeInSeconds(timedOption))}
          </Timer>
        )}
        
        <WordsDisplay onClick={() => inputRef.current?.focus()}>
          {words.map((word, index) => {
            const isCurrent = word.status === 'current';
            return (
              <Word
                key={`${word.text}-${index}`}
                $status={word.status}
                ref={isCurrent ? currentWordRef : undefined}
              >
                {isCurrent ? (
                  <>
                    {word.text.split('').map((character, characterIndex) => {
                      let state: 'wait' | 'ok' | 'bad' = 'wait';
                      if (characterIndex < currentInput.length) {
                        state = currentInput[characterIndex] === character ? 'ok' : 'bad';
                      }
                      return (
                        <Char key={characterIndex} $state={state}>
                          {character}
                        </Char>
                      );
                    })}
                    {currentInput.length > word.text.length && (
                      <Char $state="bad">{currentInput.slice(word.text.length)}</Char>
                    )}
                    <Caret $chars={currentInput.length} />
                  </>
                ) : word.text}
                {index < words.length - 1 ? ' ' : ''}
              </Word>
            );
          })}
        </WordsDisplay>
        
        <InputField 
          ref={inputRef}
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Type the words shown above"
          disabled={isTestComplete}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </TestArea>
      
      <StatsContainer>
        <StatBox>
          <StatValue>{stats.wpm}</StatValue>
          <StatLabel>WPM</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{stats.accuracy}%</StatValue>
          <StatLabel>Accuracy</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{stats.correctWords}</StatValue>
          <StatLabel>Correct Words</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{stats.incorrectWords}</StatValue>
          <StatLabel>Incorrect Words</StatLabel>
        </StatBox>
      </StatsContainer>
      
      {isTestComplete ? (
        <ActionButton 
          onClick={resetTest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Restart Test
        </ActionButton>
      ) : null}
    </TestContainer>
  );
};

export default TypingTest;
