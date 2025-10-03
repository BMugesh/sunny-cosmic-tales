import { motion } from 'framer-motion';
import { useStory } from '@/contexts/StoryContext';
import { CheckCircle, Circle } from 'lucide-react';

export const ProgressTracker = () => {
  const { story } = useStory();
  const totalActs = 10;

  return (
    <div className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-md rounded-2xl p-4 shadow-cosmic border border-border">
      <h3 className="text-sm font-bold mb-3 text-accent">Journey Progress</h3>
      <div className="flex flex-col gap-2">
        {Array.from({ length: totalActs }).map((_, index) => {
          const actNumber = index + 1;
          const isCompleted = actNumber < story.currentAct;
          const isCurrent = actNumber === story.currentAct;
          const decision = story.decisions.find(d => d.actId === actNumber);

          return (
            <motion.div
              key={actNumber}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-primary" />
              ) : (
                <Circle 
                  className={`w-5 h-5 ${isCurrent ? 'text-accent animate-pulse' : 'text-muted'}`} 
                />
              )}
              <div className="flex-1">
                <p className={`text-xs ${isCurrent ? 'text-accent font-bold' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Act {actNumber}
                </p>
                {decision && (
                  <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                    {decision.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
