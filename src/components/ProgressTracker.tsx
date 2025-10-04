import { motion } from 'framer-motion';
import { useStory } from '@/contexts/StoryContext';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

export const ProgressTracker = () => {
  const { story, getAvailableNodes } = useStory();
  const availableNodes = getAvailableNodes();

  return (
    <motion.div
      className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-border shadow-cosmic z-50"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-fredoka font-bold text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Your Journey
          </h3>
          <div className="text-sm font-space text-muted-foreground">
            {story.decisions.length} decisions made
          </div>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm font-space">
          <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
            <div className="text-xs text-muted-foreground">Heroism</div>
            <div className="text-lg font-bold text-primary">{story.heroismScore}/10</div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/30">
            <div className="text-xs text-muted-foreground">Chaos</div>
            <div className="text-lg font-bold text-destructive">{story.chaosLevel}/10</div>
          </div>
        </div>

        {/* Current Personality */}
        <div className="bg-accent/10 rounded-lg p-3 border border-accent/30">
          <div className="text-xs text-muted-foreground font-space mb-1">Sunny's Vibe</div>
          <div className="text-sm font-fredoka font-bold text-accent capitalize">
            {story.sunnyPersonality}
          </div>
        </div>

        {/* Relationships */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-space">Relationships</div>
          <div className="space-y-1 text-sm font-fredoka">
            <div className="flex justify-between items-center">
              <span className="text-secondary">🌙 Luna:</span>
              <span className="capitalize text-foreground">{story.lunaRelationship}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-accent">📡 Sally:</span>
              <span className="capitalize text-foreground">{story.sallyTrust}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary">🚀 Astronaut:</span>
              <span className="capitalize text-foreground">{story.astronautStatus}</span>
            </div>
          </div>
        </div>

        {/* Recent Decisions */}
        {story.decisions.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground font-space">Recent Choices</div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {story.decisions.slice(-3).reverse().map((decision, index) => (
                <motion.div
                  key={decision.timestamp}
                  className="flex items-start gap-2 text-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80 font-fredoka">{decision.description}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Next Nodes */}
        {availableNodes.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground font-space flex items-center gap-2">
              <Circle className="w-3 h-3" />
              Paths Unlocked: {availableNodes.length}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};