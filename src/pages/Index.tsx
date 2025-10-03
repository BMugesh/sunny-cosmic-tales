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
      default:
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-primary">
                More Acts Coming Soon!
              </h1>
              <p className="text-xl text-muted-foreground">
                You've completed the first chapters of Sunny's adventure!
              </p>
            </div>
          </div>
        );
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
