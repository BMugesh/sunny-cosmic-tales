import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';

export const Act9 = () => {
  const { makeDecision, navigateToNode, getNextNode, story } = useStory();
  const followedLunaEarly = story.decisions.find(d => d.nodeId === 'luna-meeting')?.choice === 'follow';
  const protectedEarth = story.decisions.find(d => d.nodeId === 'cosmic-event')?.choice === 'protect';

  const handleChoice = (choice: 'team' | 'solo') => {
    const descriptions = {
      team: 'Team up with Luna',
      solo: 'Go solo',
    };
    makeDecision('luna-reunion', choice, descriptions[choice]);
    const nextNode = getNextNode();
    if (nextNode) {
      navigateToNode(nextNode.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-6xl font-fredoka font-bold mb-4 text-secondary text-glow">
            🌙 Luna Returns
          </h1>
          <p className="text-xl text-muted-foreground">
            A familiar face appears in the cosmic dust...
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
            emotion={protectedEarth ? 'happy' : 'excited'} 
            size="lg" 
          />
          <CharacterSprite 
            character="luna" 
            emotion={followedLunaEarly ? 'happy' : 'mischievous'} 
            size="lg" 
          />
        </motion.div>

        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border shadow-cosmic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {followedLunaEarly ? (
            <>
              <p className="text-lg leading-relaxed mb-4">
                "There you are!" Luna glides over with a warm smile. "I've been watching your 
                whole journey, Sunny! You've come so far since we met!"
              </p>
              {protectedEarth ? (
                <p className="text-lg leading-relaxed mb-4">
                  "And trying to protect Earth from that CME? That was incredibly brave! 
                  I'm proud of you, little flare. You're becoming a real space hero!"
                </p>
              ) : (
                <p className="text-lg leading-relaxed mb-4">
                  "Surfing that CME was... certainly a choice! You're bold, I'll give you that! 
                  Always were an adventurous one!"
                </p>
              )}
              <p className="text-lg leading-relaxed mb-6">
                "Listen," Luna's expression turns serious. "Something big is coming. Earth needs 
                protection from future space weather. We could team up—you, me, Sally, maybe 
                even Captain Starling. Become the Space Weather Heroes!"
              </p>
            </>
          ) : (
            <>
              <p className="text-lg leading-relaxed mb-4">
                "Oh, look who it is." Luna's tone is cool, maybe a bit sarcastic. "The solar 
                flare who thought they were too cool to follow my advice back at the start."
              </p>
              <p className="text-lg leading-relaxed mb-4">
                "I've been watching your journey. You've had quite the adventure going solo. 
                Made some... interesting choices."
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Luna sighs. "Look, despite everything, I care about Earth and space. There's 
                talk of forming some kind of team to handle space weather threats. You could 
                join... if you want. Or keep doing your solo thing. Your call."
              </p>
            </>
          )}
          <p className="text-lg leading-relaxed text-accent italic font-bold">
            The final choice: team up with Luna... or finish this journey alone?
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChoiceButton onClick={() => handleChoice('team')} variant="lunar">
            🤝 Team up with Luna!
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('solo')} variant="solar">
            ⭐ Finish the journey solo!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
