import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act2 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const stretchedEarly = story.decisions[0]?.choice === 'stretch';

  const handleChoice = (choice: 'follow' | 'explore') => {
    const descriptions = {
      follow: 'Followed Luna',
      explore: 'Explored alone',
    };
    makeDecision('luna-meeting', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-secondary text-glow">
            🌙 Meeting Luna
          </h1>
          <p className="text-xl text-muted-foreground font-space">
            A mysterious figure glows in the distance...
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
            emotion={stretchedEarly ? 'neutral' : 'excited'} 
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
          <p className="text-lg font-fredoka leading-relaxed mb-4">
            "Well, well, well... look who finally woke up!" A silvery voice echoes through space. 
            It's Luna, a wise and slightly sassy moon orbiting nearby.
          </p>
          {stretchedEarly ? (
            <p className="text-lg font-fredoka leading-relaxed mb-6">
              "Took your sweet time, didn't you?" Luna chuckles. "I've been watching solar 
              flares zip by all morning. You're the slowest one yet! But hey, slow and steady 
              wins the space race, right?"
            </p>
          ) : (
            <p className="text-lg font-fredoka leading-relaxed mb-6">
              "Whoa! Someone's in a hurry!" Luna laughs. "You shot out of there like a rocket! 
              I like your energy, little flare. Want some company on your journey?"
            </p>
          )}
          <p className="text-lg font-space leading-relaxed text-muted-foreground italic">
            Luna knows all the shortcuts through space and has seen countless adventures. 
            Following her could be wise... or Sunny could explore alone and forge their own path!
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('follow')} variant="lunar">
            🌙 Follow Luna's guidance
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('explore')} variant="solar">
            ⭐ Explore space alone
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};