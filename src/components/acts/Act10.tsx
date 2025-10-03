import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';
import { Sparkles, Trophy, Laugh, Cloud, Heart } from 'lucide-react';

export const Act10 = () => {
  const { story, resetStory } = useStory();

  // Determine ending based on decisions
  const getEnding = () => {
    const teamedUp = story.decisions[8]?.choice === 'team';
    const savedAstronaut = story.decisions[4]?.choice === 'save';
    const helpedSally = story.decisions[2]?.choice === 'help';
    const followedLuna = story.decisions[1]?.choice === 'follow';
    const protectedEarth = story.decisions[7]?.choice === 'protect';
    const prankedAstronaut = story.decisions[4]?.choice === 'prank';
    const scaredSally = story.decisions[2]?.choice === 'scare';

    // Epic Heroes Ending
    if (teamedUp && savedAstronaut && helpedSally && followedLuna && protectedEarth) {
      return {
        type: 'epic',
        title: '🏆 Epic Heroes Ending',
        icon: Trophy,
        color: 'text-accent',
        description: 'The Space Weather Heroes are born!',
        story: (
          <>
            <p className="text-lg leading-relaxed mb-4">
              Luna, Sunny, Sally, and Captain Starling gather in Earth's orbit. Professor 
              Photon's hologram appears, beaming with pride.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              "You've proven yourselves to be Earth's greatest defenders!" the Professor announces. 
              "From this day forward, you are officially the <span className="text-accent font-bold">Space Weather Heroes</span>!"
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Sally beeps excitedly. Captain Starling salutes. Luna grins at Sunny. "Not bad 
              for a little solar flare, huh?"
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Together, they watch over Earth, ready to protect it from cosmic storms, guide 
              lost spacecraft, and keep the planet safe. Sunny finally found their purpose—
              and their family.
            </p>
            <p className="text-2xl text-center font-bold text-accent animate-pulse-glow">
              ⭐ The Beginning of Legendary Adventures ⭐
            </p>
          </>
        ),
      };
    }

    // Funny Chaos Ending
    if (prankedAstronaut || scaredSally || !protectedEarth) {
      return {
        type: 'funny',
        title: '😂 Cosmic Comedian Ending',
        icon: Laugh,
        color: 'text-primary',
        description: 'Space was never this entertaining!',
        story: (
          <>
            <p className="text-lg leading-relaxed mb-4">
              Sunny returns to the Sun, grinning from ear to ear. What a journey! Sure, they 
              pranked an astronaut, scared a satellite, and maybe caused a few technical 
              hiccups on Earth...
            </p>
            <p className="text-lg leading-relaxed mb-4">
              But MAN, was it FUN! Captain Starling tells the prank story at every space bar. 
              Sally's still nervous but secretly thinks Sunny is hilarious. Even Luna can't 
              help but laugh.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Earth's scientists scratch their heads at the "unpredictable" solar flare patterns. 
              Little do they know, Sunny's just having a good time! They become known as the 
              galaxy's most entertaining solar flare.
            </p>
            <p className="text-2xl text-center font-bold text-primary animate-pulse-glow">
              🎭 The Cosmic Prankster Lives On! 🎭
            </p>
          </>
        ),
      };
    }

    // Lonely Journey Ending
    if (!teamedUp && !followedLuna) {
      return {
        type: 'lonely',
        title: '🌙 Solo Wanderer Ending',
        icon: Cloud,
        color: 'text-secondary',
        description: 'Some journeys are taken alone...',
        story: (
          <>
            <p className="text-lg leading-relaxed mb-4">
              Sunny drifts through space, alone but free. They chose independence, their own 
              path, their own way. No team, no rules, no compromises.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Luna watches from a distance, a bit sad but understanding. "Maybe next time," 
              she whispers. Sally beeps a farewell. Captain Starling waves goodbye.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Sunny learned that freedom has a price—sometimes it means being alone. But they 
              also learned they can handle anything space throws at them. They're independent, 
              strong, and unafraid.
            </p>
            <p className="text-2xl text-center font-bold text-secondary">
              🌟 A Lone Star in the Vast Cosmos 🌟
            </p>
          </>
        ),
      };
    }

    // Happy Aurora Ending (default)
    return {
      type: 'happy',
      title: '🌈 Aurora Festival Ending',
      icon: Heart,
      color: 'text-secondary',
      description: 'A beautiful celebration of light!',
      story: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            Sunny's journey ends with a spectacular aurora display over Earth. Greens, purples, 
            blues, and pinks dance across the polar skies.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            People around the world step outside to watch, cameras ready, hearts full of wonder. 
            "It's the most beautiful aurora we've ever seen!" they exclaim.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            {teamedUp && (
              <>Luna joins Sunny, and together they create an aurora symphony. "We make a good team," 
              Luna says with a smile. </>
            )}
            Sunny realizes that even a small solar flare can bring joy to billions. Sometimes, 
            the best adventures end with beauty and wonder.
          </p>
          <p className="text-2xl text-center font-bold aurora-gradient text-transparent bg-clip-text">
            ✨ The Light That United the World ✨
          </p>
        </>
      ),
    };
  };

  const ending = getEnding();
  const EndingIcon = ending.icon;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <EndingIcon className={`w-32 h-32 mx-auto mb-6 ${ending.color} glow-solar`} />
          <h1 className={`text-6xl font-bold mb-4 ${ending.color} text-glow`}>
            {ending.title}
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            {ending.description}
          </p>
        </motion.div>

        {/* Character Lineup */}
        <motion.div
          className="flex justify-center gap-6 flex-wrap my-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <CharacterSprite character="sunny" emotion="happy" size="md" />
          <CharacterSprite character="luna" emotion="happy" size="md" />
          <CharacterSprite character="sally" emotion="happy" size="md" />
          <CharacterSprite character="astronaut" emotion="happy" size="md" />
          <CharacterSprite character="professor" emotion="excited" size="md" />
        </motion.div>

        {/* Ending Story */}
        <motion.div
          className="bg-card/80 backdrop-blur-md rounded-3xl p-10 border border-border shadow-cosmic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {ending.story}
        </motion.div>

        {/* Journey Summary */}
        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-2xl p-6 border border-border"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <h3 className="text-xl font-bold mb-4 text-center text-accent">Your Journey:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {story.decisions.map((decision, index) => (
              <div key={index} className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="font-bold text-primary">Act {decision.actId}:</span>{' '}
                  <span className="text-muted-foreground">{decision.description}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Play Again */}
        <motion.div
          className="flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <ChoiceButton onClick={resetStory} variant="solar">
            🔄 Play Again & Explore New Paths!
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
