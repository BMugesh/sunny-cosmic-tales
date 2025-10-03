import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Decision = {
  actId: number;
  choice: string;
  description: string;
};

export type StoryState = {
  currentAct: number;
  decisions: Decision[];
  sunnyPersonality: 'playful' | 'cautious' | 'bold' | 'mischievous';
  lunaRelationship: 'friend' | 'rival' | 'mentor';
  sallyTrust: 'trusted' | 'neutral' | 'scared';
  astronautStatus: 'ally' | 'neutral' | 'pranked';
};

type StoryContextType = {
  story: StoryState;
  makeDecision: (actId: number, choice: string, description: string) => void;
  nextAct: () => void;
  resetStory: () => void;
  getAvailableEndings: () => string[];
};

const initialState: StoryState = {
  currentAct: 1,
  decisions: [],
  sunnyPersonality: 'playful',
  lunaRelationship: 'friend',
  sallyTrust: 'neutral',
  astronautStatus: 'neutral',
};

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [story, setStory] = useState<StoryState>(initialState);

  const makeDecision = (actId: number, choice: string, description: string) => {
    setStory(prev => {
      const newDecisions = [...prev.decisions, { actId, choice, description }];
      let newState = { ...prev, decisions: newDecisions };

      // Update personality and relationships based on choices
      if (actId === 1) {
        newState.sunnyPersonality = choice === 'stretch' ? 'cautious' : 'bold';
      }
      if (actId === 2) {
        newState.lunaRelationship = choice === 'follow' ? 'friend' : 'rival';
      }
      if (actId === 3) {
        newState.sallyTrust = choice === 'help' ? 'trusted' : 'scared';
      }
      if (actId === 5) {
        newState.astronautStatus = choice === 'save' ? 'ally' : 'pranked';
      }

      return newState;
    });
  };

  const nextAct = () => {
    setStory(prev => ({ ...prev, currentAct: prev.currentAct + 1 }));
  };

  const resetStory = () => {
    setStory(initialState);
  };

  const getAvailableEndings = () => {
    const { lunaRelationship, sallyTrust, astronautStatus } = story;
    const endings: string[] = [];

    if (lunaRelationship === 'friend' && sallyTrust === 'trusted' && astronautStatus === 'ally') {
      endings.push('epic-heroes');
    }
    if (sallyTrust === 'scared' || astronautStatus === 'pranked') {
      endings.push('funny-chaos');
    }
    if (lunaRelationship === 'rival') {
      endings.push('lonely-journey');
    }
    endings.push('happy-aurora'); // Default happy ending always available

    return endings;
  };

  return (
    <StoryContext.Provider value={{ story, makeDecision, nextAct, resetStory, getAvailableEndings }}>
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
