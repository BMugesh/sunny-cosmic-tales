import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StoryProvider, useStory } from '@/contexts/StoryContext';
import { StarField } from '@/components/StarField';
import { ProgressTracker } from '@/components/ProgressTracker';
import { IntroScreen } from '@/components/acts/IntroScreen';
import { Act1 } from '@/components/acts/Act1';
import { Act2 } from '@/components/acts/Act2';
import { Act3 } from '@/components/acts/Act3';
import { Act4 } from '@/components/acts/Act4';
import { Act5 } from '@/components/acts/Act5';
import { Act6 } from '@/components/acts/Act6';
import { Act7 } from '@/components/acts/Act7';
import { Act8 } from '@/components/acts/Act8';
import { Act9 } from '@/components/acts/Act9';
import { Act10 } from '@/components/acts/Act10';

const StoryContent = () => {
  const [started, setStarted] = useState(false);
  const { story } = useStory();

  const renderAct = () => {
    if (!started) {
      return <IntroScreen onStart={() => setStarted(true)} />;
    }

    switch (story.currentAct) {
      case 1:
        return <Act1 />;
      case 2:
        return <Act2 />;
      case 3:
        return <Act3 />;
      case 4:
        return <Act4 />;
      case 5:
        return <Act5 />;
      case 6:
        return <Act6 />;
      case 7:
        return <Act7 />;
      case 8:
        return <Act8 />;
      case 9:
        return <Act9 />;
      case 10:
        return <Act10 />;
      default:
        return <Act10 />;
    }
  };

  return (
    <>
      <StarField />
      {started && <ProgressTracker />}
      <AnimatePresence mode="wait">
        {renderAct()}
      </AnimatePresence>
    </>
  );
};

const Index = () => {
  return (
    <StoryProvider>
      <div className="min-h-screen overflow-hidden" data-theme="cosmic">
        <StoryContent />
      </div>
    </StoryProvider>
  );
};

export default Index;
