import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act3 = () => {
  const { makeDecision, nextAct, story } = useStory();
  const followedLuna = story.decisions[1]?.choice === 'follow';

  const handleChoice = (choice: 'help' | 'scare') => {
    const descriptions = {
      help: 'Helped Sally',
      scare: 'Scared Sally',
    };
    makeDecision(3, choice, descriptions[choice]);
    nextAct();
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-accent text-glow">
            Act 3: Sally the Satellite
          </h1>
          <p className="text-xl text-muted-foreground">
            {followedLuna 
              ? "Following Luna's path, Sunny spots something wobbling in orbit..."
              : "Blazing independently, Sunny nearly crashes into...!"
            }
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-12 my-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <CharacterSprite 
            character="sunny" 
            emotion="happy" 
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
          <p className="text-lg leading-relaxed mb-4">
            "BEEP BEEP BOOP! Warning! Solar activity detected!" squeaks Sally the Satellite. 
            She's spinning nervously, her solar panels flapping like frightened wings.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            {followedLuna 
              ? "Luna floats nearby, watching with an amused smile. \"Be nice to Sally, Sunny. She's helpful... when she's not panicking.\""
              : "Sally's sensors are going haywire! \"Unidentified solar flare! Unidentified solar flare!\""
            }
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Sally looks genuinely scared of Sunny's bright, hot energy. But she also seems like she 
            could be a useful friend—she knows all the satellite gossip and space traffic routes!
          </p>
          <p className="text-lg leading-relaxed text-destructive italic font-bold">
            What should Sunny do? Help calm her down... or have a little fun?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('help')} variant="lunar">
            🤝 Help Sally and calm her down
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('scare')} variant="solar">
            😈 Flash brightly and watch her spin!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
