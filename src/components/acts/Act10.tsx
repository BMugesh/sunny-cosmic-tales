import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { useStory } from '@/contexts/StoryContext';
import { Trophy, Heart, Sparkles, Zap, Globe } from 'lucide-react';

export const Act10 = () => {
  const { resetStory, computeEnding, story } = useStory();
  const ending = computeEnding();

  const endings = {
    'epic-heroes': {
      title: '🏆 Epic Space Heroes!',
      icon: Trophy,
      description: 'Sunny, Luna, Sally, and Captain Starling unite to form the Space Weather Heroes—protectors of Earth and guardians of the cosmos!',
      color: 'text-primary',
      detail: `With Sunny's bravery, Luna's wisdom, Sally's trust, and the Captain's expertise, the team stands ready to face any cosmic threat. Earth celebrates their new protectors with auroras dancing across every sky!`,
    },
    'cosmic-comedian': {
      title: '😂 The Cosmic Comedian!',
      icon: Sparkles,
      description: 'Sunny becomes a legendary prankster, traveling the cosmos creating harmless chaos and bringing laughter wherever they go!',
      color: 'text-accent',
      detail: `Space stations tell tales of the mischievous solar flare who made satellites dance and astronauts laugh. Earth's tech gets disrupted sometimes, but everyone agrees—Sunny made space a lot more fun!`,
    },
    'solo-wanderer': {
      title: '⭐ The Solo Wanderer',
      icon: Zap,
      description: 'Sunny continues their journey alone, a free spirit exploring the infinite cosmos on their own terms.',
      color: 'text-secondary',
      detail: `Not every hero needs a team. Sunny drifts through space, leaving trails of light and wonder. Luna watches from afar, hoping one day they'll reconnect. The cosmos is vast, and Sunny has all the time in the universe.`,
    },
    'earth-protector': {
      title: '🛡️ Earth\'s Guardian',
      icon: Globe,
      description: 'Sunny dedicates their existence to shielding Earth from dangerous solar events, becoming a silent protector.',
      color: 'text-primary',
      detail: `Professor Photon monitors Sunny's heroic efforts. When massive CMEs threaten Earth, Sunny deflects them. The planet below may never know their name, but Sunny doesn't need fame—protecting life is reward enough.`,
    },
    'aurora-festival': {
      title: '🌈 Aurora Festival!',
      icon: Heart,
      description: 'Sunny creates the most beautiful auroras Earth has ever seen, bringing joy and wonder to millions!',
      color: 'text-secondary',
      detail: `People from every country gather to watch the magical light show. Scientists marvel, artists paint, children point in awe. Sunny learns that sometimes the greatest adventure is bringing happiness to others.`,
    },
  };

  const currentEnding = endings[ending as keyof typeof endings];
  const EndingIcon = currentEnding.icon;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
    >
      <div className="max-w-5xl w-full space-y-8">
        <motion.div
          className="text-center space-y-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <EndingIcon className={`w-24 h-24 ${currentEnding.color}`} />
          </motion.div>

          <h1 className={`text-7xl font-fredoka font-bold mb-6 ${currentEnding.color} text-glow`}>
            {currentEnding.title}
          </h1>
        </motion.div>

        {/* Character Sprites Based on Ending */}
        <motion.div
          className="flex justify-center gap-8 my-12 flex-wrap"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CharacterSprite character="sunny" emotion="happy" size="lg" />
          {(ending === 'epic-heroes' || story.lunaRelationship === 'mentor' || story.lunaRelationship === 'friend') && (
            <CharacterSprite character="luna" emotion="happy" size="lg" />
          )}
          {(ending === 'epic-heroes' || story.sallyTrust === 'trusted') && (
            <CharacterSprite character="sally" emotion="happy" size="lg" />
          )}
          {(ending === 'epic-heroes' || story.astronautStatus === 'ally') && (
            <CharacterSprite character="astronaut" emotion="happy" size="lg" />
          )}
          {ending === 'earth-protector' && (
            <CharacterSprite character="professor" emotion="excited" size="lg" />
          )}
        </motion.div>

        <motion.div
          className="bg-card/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-primary/30 shadow-cosmic space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-2xl font-fredoka leading-relaxed text-center font-bold">
            {currentEnding.description}
          </p>
          <p className="text-lg font-space leading-relaxed text-center text-muted-foreground">
            {currentEnding.detail}
          </p>

          {/* Story Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{story.heroismScore}</div>
              <div className="text-sm text-muted-foreground font-space">Heroism</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">{story.chaosLevel}</div>
              <div className="text-sm text-muted-foreground font-space">Chaos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{story.decisions.length}</div>
              <div className="text-sm text-muted-foreground font-space">Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{story.visitedNodes.length + 1}</div>
              <div className="text-sm text-muted-foreground font-space">Nodes Visited</div>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <p className="text-center text-xl font-fredoka font-bold text-primary">
              🎭 Your Unique Story Path 🎭
            </p>
            <p className="text-center text-lg font-space text-foreground/80">
              Personality: <span className="font-bold capitalize text-accent">{story.sunnyPersonality}</span>
            </p>
            <div className="flex justify-center gap-6 flex-wrap text-sm font-space">
              <span>🌙 Luna: <span className="capitalize">{story.lunaRelationship}</span></span>
              <span>📡 Sally: <span className="capitalize">{story.sallyTrust}</span></span>
              <span>🚀 Astronaut: <span className="capitalize">{story.astronautStatus}</span></span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-accent/10 rounded-2xl p-6 border border-accent/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-center text-lg font-fredoka mb-4">
            ✨ <span className="font-bold">Every choice created YOUR unique story!</span> ✨
          </p>
          <p className="text-center text-muted-foreground font-space">
            Want to see a different ending? Try making different choices next time!
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ChoiceButton onClick={resetStory} variant="solar">
            <span className="text-xl font-fredoka">🔄 Start a New Adventure!</span>
          </ChoiceButton>
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground text-sm font-space italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          "In space, every flare writes its own story..." ✨
        </motion.p>
      </div>
    </motion.div>
  );
};