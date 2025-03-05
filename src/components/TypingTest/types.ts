// Test options
export type TestMode = 'wordCount' | 'timed';
export type WordCountOption = 10 | 25 | 50 | 100 | 250;
export type TimeOption = '30s' | '1m' | '2m' | '3m';

// Word status
export type WordStatus = 'upcoming' | 'current' | 'correct' | 'incorrect';

// Test statistics
export interface TestStats {
  wpm: number;
  accuracy: number;
  correctWords: number;
  incorrectWords: number;
  timeElapsed: number;
}

// Word with its status
export interface TypedWord {
  text: string;
  status: WordStatus;
}

// Test state
export interface TestState {
  words: TypedWord[];
  currentWordIndex: number;
  currentInput: string;
  isTestActive: boolean;
  isTestComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  stats: TestStats;
}

// Props for the TypingTest component
export interface TypingTestProps {
  onReset?: () => void;
}
