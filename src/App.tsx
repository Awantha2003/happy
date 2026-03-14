import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DateUnlock } from './components/DateUnlock';
import { IntroScreen } from './components/IntroScreen';
import { MemoryBook } from './components/MemoryBook';
type ScreenState = 'unlock' | 'intro' | 'book';
export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('unlock');
  return (
    <div className="w-full min-h-screen bg-[#1F1225] overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'unlock' &&
        <DateUnlock key="unlock" onUnlock={() => setCurrentScreen('intro')} />
        }

        {currentScreen === 'intro' &&
        <IntroScreen
          key="intro"
          onComplete={() => setCurrentScreen('book')} />

        }

        {currentScreen === 'book' && <MemoryBook key="book" />}
      </AnimatePresence>
    </div>);

}