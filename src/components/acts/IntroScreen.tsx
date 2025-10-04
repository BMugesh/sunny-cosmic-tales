import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { ChoiceButton } from '../ChoiceButton';

type IntroScreenProps = {
  onStart: () => void;
};

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
    >
      {/* Animated Solar Flare Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central Sun Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full solar-gradient opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Solar Flare Bursts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-48 solar-gradient origin-bottom"
            style={{
              rotate: `${i * 45}deg`,
            }}
            animate={{
              scaleY: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-32 h-32 text-primary" />
          </motion.div>

          <h1 className="text-7xl md:text-8xl font-fredoka font-bold solar-gradient text-transparent bg-clip-text animate-pulse-glow">
            Sunny's Adventure
          </h1>
          
          <p className="text-3xl md:text-4xl font-space font-medium text-accent">
            The Solar Flare's Big Journey
          </p>

          <motion.div
            className="flex items-center justify-center gap-4 text-foreground/80"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-6 h-6" />
            <p className="text-xl font-space">Every choice reshapes the cosmos</p>
            <Zap className="w-6 h-6" />
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-card/40 backdrop-blur-xl rounded-3xl p-10 border-2 border-primary/30 shadow-cosmic"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-xl md:text-2xl leading-relaxed text-center font-fredoka">
            Join <span className="text-primary font-bold">Sunny the Solar Flare</span> on a 
            non-linear cosmic adventure where <span className="text-accent font-bold">every decision</span> reshapes 
            the story, unlocks new paths, and changes your destiny!
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ChoiceButton onClick={onStart} variant="solar">
            <span className="text-2xl font-fredoka font-bold">🚀 Begin Your Journey!</span>
          </ChoiceButton>
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground text-lg font-space"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          ✨ Each playthrough creates a unique story ✨
        </motion.p>
      </div>
    </motion.div>
  );
};