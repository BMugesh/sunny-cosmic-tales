import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act6 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const savedAstronaut = story.decisions.find(d => d.nodeId === 'astronaut-crisis')?.choice === 'save';

  const handleChoice = (choice: 'gentle' | 'strong') => {
    const descriptions = {
      gentle: 'Gentle auroras',
      strong: 'Strong interference',
    };
    makeDecision('earth-atmosphere', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, scale: 1.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 aurora-gradient text-transparent bg-clip-text text-glow">
            🌍 Earth's Atmosphere
          </h1>
          <p className="text-xl text-muted-foreground">
            The beautiful blue planet comes into view!
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
            emotion={savedAstronaut ? 'happy' : 'mischievous'} 
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
            Earth! Home of billions of people, cute animals, and surprisingly fragile technology!
          </p>
          {savedAstronaut ? (
            <p className="text-lg leading-relaxed mb-4">
              "Thank you, little flare!" Captain Starling's voice echoes. "Earth's gonna 
              love the light show you're about to put on!"
            </p>
          ) : (
            <p className="text-lg leading-relaxed mb-4">
              Captain Starling's ship limps along behind, still recovering from Sunny's prank. 
              "Please... be gentle with Earth..." the Captain pleads weakly.
            </p>
          )}
          <p className="text-lg leading-relaxed mb-6">
            When solar flares hit Earth's magnetic field, magical auroras dance in the sky! 
            But too much energy can also mess with satellites, power grids, and GPS systems.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Sunny can choose: enter gently for beautiful auroras and minimal disruption, 
            or come in strong and powerful (which might cause some technical hiccups but 
            create the <span className="text-accent font-bold">MOST EPIC</span> auroras ever seen!).
          </p>
          <p className="text-lg leading-relaxed text-accent italic font-bold">
            Beauty and safety... or spectacular chaos?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('gentle')} variant="lunar">
            🌈 Enter gently—beautiful auroras!
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('strong')} variant="solar">
            ⚡ Go strong—EPIC light show!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
