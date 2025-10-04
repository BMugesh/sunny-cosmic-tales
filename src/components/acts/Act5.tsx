import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act5 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const carefulTravel = story.decisions.find(d => d.nodeId === 'deep-space')?.choice === 'careful';

  const handleChoice = (choice: 'save' | 'prank') => {
    const descriptions = {
      save: 'Saved Astronaut',
      prank: 'Pranked Astronaut',
    };
    makeDecision('astronaut-crisis', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-blue-400 text-glow">
            🚀 Astronaut's Distress
          </h1>
          <p className="text-xl text-muted-foreground">
            {carefulTravel 
              ? "Sunny's careful navigation pays off—there's someone in trouble!"
              : "After wild space acrobatics, Sunny spots a spacecraft spinning!"
            }
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
            emotion="worried" 
            size="lg" 
          />
          <CharacterSprite 
            character="astronaut" 
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
            "Mayday! Mayday! This is Captain Starling!" crackles a voice through space. 
            A small spacecraft tumbles past, its thrusters flickering weakly.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Inside, Captain Starling frantically pushes buttons. "Solar flare knocked out my systems! 
            I'm drifting toward the asteroid belt! If anyone can hear this..."
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Sunny could use their magnetic energy to help stabilize the ship and push it 
            back on course. That's what heroes do, right?
          </p>
          <p className="text-lg leading-relaxed mb-6">
            But... Sunny's mischievous side remembers those wild space acrobatics were fun! 
            What if they gave the Captain a little harmless scare first? Just a tiny flash 
            to make the lights flicker? It would be <span className="text-accent italic">hilarious</span>...
          </p>
          <p className="text-lg leading-relaxed text-destructive italic font-bold">
            Be the hero... or the prankster?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('save')} variant="lunar">
            🦸 Save Captain Starling heroically!
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('prank')} variant="solar">
            😜 Flash lights and prank first!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
