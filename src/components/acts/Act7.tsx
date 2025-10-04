import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act7 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const gentleEntry = story.decisions.find(d => d.nodeId === 'earth-atmosphere')?.choice === 'gentle';

  const handleChoice = (choice: 'listen' | 'ignore') => {
    const descriptions = {
      listen: 'Learned science',
      ignore: 'Ignored professor',
    };
    makeDecision('professor-photon', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-purple-400 text-glow">
            🔬 Professor Photon
          </h1>
          <p className="text-xl text-muted-foreground">
            {gentleEntry 
              ? "The beautiful auroras catch someone's attention..."
              : "Amidst the technical chaos, a scientist appears!"}
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
            character="professor" 
            emotion="excited" 
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
            "Fascinating! Simply fascinating!" A hologram of Professor Photon materializes 
            in space, projected from Earth's research station. Their eyes sparkle behind 
            thick glasses.
          </p>
          {gentleEntry ? (
            <p className="text-lg leading-relaxed mb-4">
              "What a perfectly executed geomagnetic interaction! You've created textbook 
              auroras, little flare. Do you know what you are? You're a stream of charged 
              particles—electrons and protons—traveling at incredible speeds!"
            </p>
          ) : (
            <p className="text-lg leading-relaxed mb-4">
              "Oh my! Quite the energetic arrival! You've caused a G3-class geomagnetic storm! 
              Radio communications are down, but the auroras... magnificent! Let me explain 
              what you are..."
            </p>
          )}
          <p className="text-lg leading-relaxed mb-6">
            Professor Photon launches into an excited lecture about solar flares, magnetic 
            fields, space weather, and how Sunny's journey affects technology on Earth. 
            They pull out holographic charts and graphs.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            "You see, when your magnetic field lines reconnect, they release tremendous energy! 
            And your interaction with Earth's magnetosphere creates these beautiful auroras 
            through a process called—"
          </p>
          <p className="text-lg leading-relaxed text-accent italic font-bold">
            This is actually pretty cool... but also kind of long. Listen or keep adventuring?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('listen')} variant="cosmic">
            🔬 Listen to the science lesson!
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('ignore')} variant="solar">
            🚀 Politely ignore and keep moving!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
