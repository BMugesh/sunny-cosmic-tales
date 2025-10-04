import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act1 = () => {
  const { makeDecision, navigateToNode, getNextNode } = useStory();

  const handleChoice = (choice: 'stretch' | 'zoom') => {
    const descriptions = {
      stretch: 'Stretched lazily',
      zoom: 'Zoomed excitedly',
    };
    makeDecision('intro', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-primary text-glow">
            ☀️ Sunny Awakens!
          </h1>
          <p className="text-xl text-muted-foreground font-space">
            Deep in the Sun's core, a spark of energy begins to stir...
          </p>
        </motion.div>

        {/* Character */}
        <motion.div
          className="flex justify-center my-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <CharacterSprite character="sunny" emotion="neutral" size="lg" />
        </motion.div>

        {/* Story Text */}
        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border shadow-cosmic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg font-fredoka leading-relaxed mb-6">
            "Mmm... is it time already?" yawns Sunny, a tiny but mighty solar flare. 
            The Sun's magnetic fields crackle around them like a warm blanket. 
            Today feels... different. Special. Maybe even <span className="text-accent font-bold">adventure-ish</span>?
          </p>
          <p className="text-lg font-space leading-relaxed text-muted-foreground italic">
            Sunny has two choices: stretch lazily and take their time, or burst out 
            with maximum energy and zoom into space!
          </p>
        </motion.div>

        {/* Choices */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ChoiceButton onClick={() => handleChoice('stretch')} variant="lunar">
            😌 Stretch lazily and warm up slowly
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('zoom')} variant="solar">
            🚀 ZOOM out with maximum energy!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};