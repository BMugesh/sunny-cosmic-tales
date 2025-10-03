import { motion } from 'framer-motion';
import { Sparkles, Moon, Satellite, Rocket, Glasses } from 'lucide-react';

type CharacterType = 'sunny' | 'luna' | 'sally' | 'astronaut' | 'professor';

type CharacterSpriteProps = {
  character: CharacterType;
  emotion?: 'happy' | 'excited' | 'worried' | 'mischievous' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
};

export const CharacterSprite = ({ character, emotion = 'neutral', size = 'md' }: CharacterSpriteProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const characterConfig = {
    sunny: {
      icon: Sparkles,
      color: 'text-primary',
      glow: 'glow-solar',
      animation: 'animate-pulse-glow',
    },
    luna: {
      icon: Moon,
      color: 'text-secondary',
      glow: 'glow-lunar',
      animation: 'animate-float',
    },
    sally: {
      icon: Satellite,
      color: 'text-accent',
      glow: '',
      animation: 'animate-twinkle',
    },
    astronaut: {
      icon: Rocket,
      color: 'text-blue-400',
      glow: '',
      animation: '',
    },
    professor: {
      icon: Glasses,
      color: 'text-purple-400',
      glow: '',
      animation: '',
    },
  };

  const config = characterConfig[character];
  const Icon = config.icon;

  const emotionRotation = {
    happy: 0,
    excited: 15,
    worried: -10,
    mischievous: 5,
    neutral: 0,
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${config.glow} 
        ${config.animation}
        flex items-center justify-center
        rounded-full
        backdrop-blur-sm
      `}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: emotionRotation[emotion],
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ scale: 1.1, rotate: emotionRotation[emotion] + 5 }}
    >
      <Icon className={`${config.color} w-full h-full p-4`} strokeWidth={1.5} />
    </motion.div>
  );
};
