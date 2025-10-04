import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act4 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const helpedSally = story.decisions.find(d => d.nodeId === 'sally-encounter')?.choice === 'help';

  const handleChoice = (choice: 'careful' | 'tricks') => {
    const descriptions = {
      careful: 'Traveled carefully',
      tricks: 'Did space tricks',
    };
    makeDecision('deep-space', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-purple-400 text-glow">
            🌌 Deep Space
          </h1>
          <p className="text-xl text-muted-foreground font-space">
            The vast emptiness of space stretches ahead...
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
            emotion={helpedSally ? 'happy' : 'mischievous'} 
            size="lg" 
          />
        </motion.div>

        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border shadow-cosmic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg font-fredoka leading-relaxed mb-4">
            The darkness between planets is... well, dark! And quiet. And maybe a little bit spooky.
          </p>
          {helpedSally ? (
            <p className="text-lg font-fredoka leading-relaxed mb-6">
              "BEEP! Safe route ahead!" Sally's voice crackles through space. 
              "Thanks for being nice, Sunny! Here's a shortcut that avoids the asteroid belt!"
            </p>
          ) : (
            <p className="text-lg font-fredoka leading-relaxed mb-6">
              Without Sally's help, Sunny is flying solo. There might be asteroids ahead, 
              or maybe... a comet party? Who knows! Space is full of surprises!
            </p>
          )}
          <p className="text-lg font-fredoka leading-relaxed mb-6">
            Sunny has two ways to cross this cosmic void: take it slow and careful, 
            or put on a wild space show with loops and swirls!
          </p>
          <p className="text-lg font-space leading-relaxed text-accent italic font-bold">
            What's it gonna be, space traveler?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('careful')} variant="lunar">
            🛡️ Navigate carefully and safely
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('tricks')} variant="solar">
            🎢 Go wild with cosmic acrobatics!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};