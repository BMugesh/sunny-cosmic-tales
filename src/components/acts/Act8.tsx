import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act8 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const listenedToProfessor = story.decisions.find(d => d.nodeId === 'professor-photon')?.choice === 'listen';

  const handleChoice = (choice: 'join' | 'protect') => {
    const descriptions = {
      join: 'Joined CME party',
      protect: 'Protected Earth',
    };
    makeDecision('cosmic-event', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 10 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-primary text-glow animate-pulse-glow">
            💥 The Big Cosmic Event
          </h1>
          <p className="text-xl text-muted-foreground">
            Something HUGE is happening!
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center my-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CharacterSprite 
            character="sunny" 
            emotion={listenedToProfessor ? 'excited' : 'worried'} 
            size="lg" 
          />
        </motion.div>

        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border shadow-cosmic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg leading-relaxed mb-4">
            The Sun rumbles behind Sunny. A MASSIVE Coronal Mass Ejection (CME) erupts—
            billions of tons of plasma and magnetic field exploding into space!
          </p>
          {listenedToProfessor ? (
            <p className="text-lg leading-relaxed mb-4">
              "Ah ha!" Sunny remembers Professor Photon's lesson. "That's a CME! Way bigger 
              than me! It could cause serious problems for Earth if it hits directly..."
            </p>
          ) : (
            <p className="text-lg leading-relaxed mb-4">
              "Whoa! WHAT IS THAT?!" Sunny watches in awe as the massive wave of solar energy 
              rushes toward them. It's beautiful... and terrifying!
            </p>
          )}
          <p className="text-lg leading-relaxed mb-6">
            The CME is heading toward Earth! If it hits at full force, it could knock out 
            power grids, satellites, and communications for days. This is serious!
          </p>
          <p className="text-lg leading-relaxed mb-6">
            But... it also looks like an AMAZING cosmic surfing opportunity. The CME's 
            magnetic waves are massive! Sunny could ride them and have the adventure of 
            a lifetime!
          </p>
          <p className="text-lg leading-relaxed text-destructive italic font-bold">
            Join the cosmic chaos... or try to shield Earth?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('protect')} variant="lunar">
            🛡️ Try to deflect and protect Earth!
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('join')} variant="solar">
            🌊 Surf the CME waves—YOLO!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
