import { motion } from 'framer-motion';
import { CharacterSprite } from '../CharacterSprite';
import { ChoiceButton } from '../ChoiceButton';
import { Sparkles } from 'lucide-react';

type IntroScreenProps = {
  onStart: () => void;
};

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-5xl w-full space-y-12">
        {/* Title */}
        <motion.div
          className="text-center space-y-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-24 h-24 text-primary glow-solar" />
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl font-bold text-primary text-glow leading-tight">
            Sunny's Big Adventure
          </h1>
          
          <p className="text-2xl md:text-3xl text-accent font-bold">
            An Interactive Space Journey
          </p>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join Sunny the Solar Flare on an epic adventure through space! 
            Your choices will shape the story and determine how it all ends.
          </p>
        </motion.div>

        {/* Character Preview */}
        <motion.div
          className="flex justify-center gap-8 flex-wrap"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          <div className="text-center">
            <CharacterSprite character="sunny" emotion="excited" size="md" />
            <p className="mt-2 text-sm font-bold text-primary">Sunny</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="luna" emotion="mischievous" size="md" />
            <p className="mt-2 text-sm font-bold text-secondary">Luna</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="sally" emotion="happy" size="md" />
            <p className="mt-2 text-sm font-bold text-accent">Sally</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="astronaut" emotion="neutral" size="md" />
            <p className="mt-2 text-sm font-bold text-blue-400">Captain Starling</p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border shadow-cosmic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-accent">What Makes This Special?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🌟</div>
              <h3 className="font-bold mb-2">Your Choices Matter</h3>
              <p className="text-sm text-muted-foreground">
                Every decision shapes Sunny's personality and the story's outcome
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="font-bold mb-2">Multiple Endings</h3>
              <p className="text-sm text-muted-foreground">
                Happy, funny, epic, or bittersweet—your journey determines the finale
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔬</div>
              <h3 className="font-bold mb-2">Learn & Laugh</h3>
              <p className="text-sm text-muted-foreground">
                Discover real space science wrapped in comedy and adventure
              </p>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          className="flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <ChoiceButton onClick={onStart} variant="solar">
            ✨ Begin the Adventure! ✨
          </ChoiceButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
