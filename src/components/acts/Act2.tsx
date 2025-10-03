import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act2 = () => {
  const { makeDecision, nextAct, story } = useStory();
  const wasLazy = story.decisions[0]?.choice === 'stretch';

  const handleChoice = (choice: 'follow' | 'ignore') => {
    const descriptions = {
      follow: 'Followed Luna',
      ignore: 'Ignored Luna',
    };
    makeDecision(2, choice, descriptions[choice]);
    nextAct();
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-secondary text-glow">
            Act 2: Meeting Luna
          </h1>
          <p className="text-xl text-muted-foreground">
            {wasLazy 
              ? "Still waking up, Sunny drifts through space..."
              : "Zooming through space, Sunny spots something shiny!"
            }
          </p>
        </motion.div>

        {/* Characters */}
        <motion.div
          className="flex justify-center gap-12 my-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CharacterSprite 
            character="sunny" 
            emotion={wasLazy ? 'neutral' : 'excited'} 
            size="lg" 
          />
          <CharacterSprite 
            character="luna" 
            emotion="mischievous" 
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
            "Well, well, well... look who's finally up!" Luna the Moon appears, 
            spinning gracefully. Her crater-face grins mischievously. 
            {wasLazy 
              ? " \"Took your time, didn't you, sleepyhead?\""
              : " \"Someone's got energy today! Race you to Earth?\""
            }
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Luna seems to know something Sunny doesn't. Her eyes twinkle with secrets 
            and maybe a little bit of teasing. She gestures toward distant Earth.
          </p>
          <p className="text-lg leading-relaxed text-accent italic font-bold">
            "Follow me if you dare! Or... go your own way. Your choice, sparkles!" 
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('follow')} variant="lunar">
            🌙 Follow Luna's lead
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('ignore')} variant="solar">
            ⚡ Ignore her and blaze your own trail!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
