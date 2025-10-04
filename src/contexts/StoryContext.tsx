import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Decision = {
  nodeId: string;
  choice: string;
  description: string;
  timestamp: number;
};

export type StoryNode = {
  id: string;
  title: string;
  category: 'intro' | 'character' | 'cosmic' | 'earth' | 'finale';
  unlockConditions?: (decisions: Decision[]) => boolean;
  weight?: number; // For random selection among eligible nodes
};

export type StoryState = {
  currentNodeId: string;
  visitedNodes: string[];
  decisions: Decision[];
  // Dynamic traits computed from decisions
  sunnyPersonality: 'playful' | 'cautious' | 'bold' | 'mischievous' | 'heroic';
  lunaRelationship: 'friend' | 'rival' | 'mentor' | 'neutral';
  sallyTrust: 'trusted' | 'neutral' | 'scared';
  astronautStatus: 'ally' | 'neutral' | 'pranked';
  professorKnowledge: boolean;
  earthProtector: boolean;
  chaosLevel: number; // 0-10 scale
  heroismScore: number; // 0-10 scale
};

type StoryContextType = {
  story: StoryState;
  makeDecision: (nodeId: string, choice: string, description: string) => void;
  navigateToNode: (nodeId: string) => void;
  getAvailableNodes: () => StoryNode[];
  getNextNode: () => StoryNode | null;
  resetStory: () => void;
  computeEnding: () => string;
};

const initialState: StoryState = {
  currentNodeId: 'intro',
  visitedNodes: [],
  decisions: [],
  sunnyPersonality: 'playful',
  lunaRelationship: 'neutral',
  sallyTrust: 'neutral',
  astronautStatus: 'neutral',
  professorKnowledge: false,
  earthProtector: false,
  chaosLevel: 0,
  heroismScore: 0,
};

// Define all story nodes with unlock conditions
export const STORY_NODES: StoryNode[] = [
  { id: 'intro', title: 'Awakening', category: 'intro' },
  { id: 'luna-meeting', title: 'Meeting Luna', category: 'character', unlockConditions: (d) => d.length >= 1 },
  { id: 'sally-encounter', title: 'Sally the Satellite', category: 'character', unlockConditions: (d) => d.length >= 2 },
  { id: 'deep-space', title: 'Deep Space Travel', category: 'cosmic', unlockConditions: (d) => d.length >= 3 },
  { id: 'astronaut-crisis', title: 'Astronaut in Distress', category: 'cosmic', unlockConditions: (d) => d.length >= 4 },
  { id: 'earth-atmosphere', title: 'Earth\'s Doorstep', category: 'earth', unlockConditions: (d) => d.length >= 5 },
  { id: 'professor-photon', title: 'Professor Photon', category: 'earth', unlockConditions: (d) => d.length >= 6 },
  { id: 'cosmic-event', title: 'The Big Event', category: 'cosmic', unlockConditions: (d) => d.length >= 7 },
  { id: 'luna-reunion', title: 'Luna Returns', category: 'character', unlockConditions: (d) => d.length >= 8 },
  { id: 'finale', title: 'The Finale', category: 'finale', unlockConditions: (d) => d.length >= 9 },
];

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [story, setStory] = useState<StoryState>(initialState);

  const makeDecision = (nodeId: string, choice: string, description: string) => {
    setStory(prev => {
      const newDecision: Decision = {
        nodeId,
        choice,
        description,
        timestamp: Date.now(),
      };
      const newDecisions = [...prev.decisions, newDecision];
      let newState = { ...prev, decisions: newDecisions };

      // Dynamic personality and relationship updates based on choices
      if (nodeId === 'intro') {
        newState.sunnyPersonality = choice === 'stretch' ? 'cautious' : 'bold';
        newState.chaosLevel += choice === 'zoom' ? 1 : 0;
      }
      if (nodeId === 'luna-meeting') {
        newState.lunaRelationship = choice === 'follow' ? 'friend' : 'rival';
        newState.heroismScore += choice === 'follow' ? 1 : 0;
      }
      if (nodeId === 'sally-encounter') {
        newState.sallyTrust = choice === 'help' ? 'trusted' : 'scared';
        newState.heroismScore += choice === 'help' ? 2 : 0;
        newState.chaosLevel += choice === 'scare' ? 2 : 0;
      }
      if (nodeId === 'deep-space') {
        newState.sunnyPersonality = choice === 'careful' ? 'cautious' : 'mischievous';
        newState.chaosLevel += choice === 'tricks' ? 1 : 0;
      }
      if (nodeId === 'astronaut-crisis') {
        newState.astronautStatus = choice === 'save' ? 'ally' : 'pranked';
        newState.heroismScore += choice === 'save' ? 2 : 0;
        newState.chaosLevel += choice === 'prank' ? 2 : 0;
      }
      if (nodeId === 'earth-atmosphere') {
        newState.chaosLevel += choice === 'strong' ? 2 : 0;
        newState.heroismScore += choice === 'gentle' ? 1 : 0;
      }
      if (nodeId === 'professor-photon') {
        newState.professorKnowledge = choice === 'listen';
        newState.heroismScore += choice === 'listen' ? 1 : 0;
      }
      if (nodeId === 'cosmic-event') {
        newState.earthProtector = choice === 'protect';
        newState.heroismScore += choice === 'protect' ? 3 : 0;
        newState.chaosLevel += choice === 'join' ? 2 : 0;
      }
      if (nodeId === 'luna-reunion') {
        newState.lunaRelationship = choice === 'team' ? 'mentor' : newState.lunaRelationship;
        newState.heroismScore += choice === 'team' ? 2 : 0;
      }

      return newState;
    });
  };

  const navigateToNode = (nodeId: string) => {
    setStory(prev => ({
      ...prev,
      currentNodeId: nodeId,
      visitedNodes: [...prev.visitedNodes, prev.currentNodeId],
    }));
  };

  const getAvailableNodes = (): StoryNode[] => {
    return STORY_NODES.filter(node => {
      // Already visited
      if (story.visitedNodes.includes(node.id) || story.currentNodeId === node.id) {
        return false;
      }
      // Check unlock conditions
      if (node.unlockConditions) {
        return node.unlockConditions(story.decisions);
      }
      return true;
    });
  };

  const getNextNode = (): StoryNode | null => {
    const available = getAvailableNodes();
    if (available.length === 0) return null;

    // Smart selection based on story state
    const currentNode = STORY_NODES.find(n => n.id === story.currentNodeId);
    
    // Prioritize certain categories based on story flow
    if (currentNode?.category === 'intro') {
      return available.find(n => n.id === 'luna-meeting') || available[0];
    }
    if (currentNode?.category === 'character' && story.decisions.length >= 2) {
      const cosmicOrEarth = available.filter(n => n.category === 'cosmic' || n.category === 'earth');
      if (cosmicOrEarth.length > 0) return cosmicOrEarth[0];
    }
    if (story.decisions.length >= 9) {
      return available.find(n => n.id === 'finale') || available[0];
    }

    // Default: return first available or random
    return available[Math.floor(Math.random() * available.length)];
  };

  const computeEnding = (): string => {
    const { lunaRelationship, sallyTrust, astronautStatus, heroismScore, chaosLevel, earthProtector } = story;

    // Epic Heroes Ending
    if (heroismScore >= 8 && lunaRelationship === 'mentor' && sallyTrust === 'trusted' && astronautStatus === 'ally') {
      return 'epic-heroes';
    }

    // Chaos Comedian Ending
    if (chaosLevel >= 6 && heroismScore < 5) {
      return 'cosmic-comedian';
    }

    // Solo Wanderer Ending
    if (lunaRelationship === 'rival' || (lunaRelationship !== 'mentor' && heroismScore < 4)) {
      return 'solo-wanderer';
    }

    // Earth Protector Ending
    if (earthProtector && heroismScore >= 6) {
      return 'earth-protector';
    }

    // Default: Aurora Festival (Happy Ending)
    return 'aurora-festival';
  };

  const resetStory = () => {
    setStory(initialState);
  };

  return (
    <StoryContext.Provider value={{ 
      story, 
      makeDecision, 
      navigateToNode, 
      getAvailableNodes, 
      getNextNode, 
      resetStory,
      computeEnding,
    }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};