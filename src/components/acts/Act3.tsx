import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act3 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const followedLuna = story.decisions.find(d => d.nodeId === 'luna-meeting')?.choice === 'follow';

  const handleChoice = (choice: 'help' | 'scare') => {
    const descriptions = {
      help: 'Helped Sally',
      scare: 'Scared Sally',
    };
    makeDecision('sally-encounter', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-accent text-glow">
            📡 Sally the Satellite
          </h1>
          <p className="text-xl text-muted-foreground font-space">
            {followedLuna 
              ? "Following Luna's path, Sunny spots something ahead..."
              : "Flying solo, Sunny encounters a strange beeping object!"}
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-12 my-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CharacterSprite 
            character="sunny" 
            emotion="neutral" 
            size="lg" 
          />
          <CharacterSprite 
            character="sally" 
            emotion="worried" 
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
            "BEEP! BEEP! BEEP!" A nervous satellite spins in orbit, solar panels shaking. 
            "Oh no, oh no! A solar flare! Code RED! Mayday!"
          </p>
          <p className="text-lg font-fredoka leading-relaxed mb-6">
            This is Sally, Earth's communication satellite. She's seen solar flares before, 
            and they usually scramble her circuits! She's terrified—but Sunny could help 
            calm her down and show they're friendly.
          </p>
          {followedLuna ? (
            <p className="text-lg font-space leading-relaxed mb-6 text-secondary italic">
              Luna whispers: "Be gentle with her, Sunny. Satellites remember kindness—or chaos."
            </p>
          ) : (
            <p className="text-lg font-space leading-relaxed mb-6 italic text-muted-foreground">
              Sally looks so scared... but also kind of funny with all that spinning!
            </p>
          )}
          <p className="text-lg font-fredoka leading-relaxed text-accent font-bold">
            Help Sally feel safe... or give her a harmless scare?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('help')} variant="lunar">
            💙 Gently reassure Sally
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('scare')} variant="solar">
            👻 Flash brightly and spook her!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};