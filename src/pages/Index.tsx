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

  const renderNode = () => {
    if (!started) {
      return <IntroScreen onStart={() => setStarted(true)} />;
    }

    // Map node IDs to components (non-linear rendering)
    const nodeComponents: Record<string, JSX.Element> = {
      'intro': <Act1 />,
      'luna-meeting': <Act2 />,
      'sally-encounter': <Act3 />,
      'deep-space': <Act4 />,
      'astronaut-crisis': <Act5 />,
      'earth-atmosphere': <Act6 />,
      'professor-photon': <Act7 />,
      'cosmic-event': <Act8 />,
      'luna-reunion': <Act9 />,
      'finale': <Act10 />,
    };

    return nodeComponents[story.currentNodeId] || <Act10 />;
  };

  return (
    <>
      <StarField />
      {started && <ProgressTracker />}
      <AnimatePresence mode="wait">
        {renderNode()}
      </AnimatePresence>
    </>
  );
};

const Index = () => {
  return (
    <StoryProvider>
      <div className="min-h-screen overflow-hidden font-fredoka" data-theme="cosmic">
        <StoryContent />
      </div>
    </StoryProvider>
  );
};

export default Index;