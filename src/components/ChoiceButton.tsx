import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ChoiceButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: 'solar' | 'lunar' | 'cosmic';
  disabled?: boolean;
};

export const ChoiceButton = ({ onClick, children, variant = 'solar', disabled = false }: ChoiceButtonProps) => {
  const variantStyles = {
    solar: 'solar-gradient glow-solar border-primary text-primary-foreground',
    lunar: 'lunar-gradient glow-lunar border-secondary text-secondary-foreground',
    cosmic: 'cosmic-bg shadow-cosmic border-accent text-foreground',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]}
        px-8 py-4 rounded-xl border-2 font-bold text-lg
        transition-all duration-300
        hover:scale-105 hover:brightness-110
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg
      `}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.button>
  );
};
