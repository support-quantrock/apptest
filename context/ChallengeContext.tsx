import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChallengeContextType {
  st: number;
  setSt: (value: number) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [st, setSt] = useState(0);

  return (
    <ChallengeContext.Provider value={{ st, setSt }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallengeContext() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallengeContext must be used within a ChallengeProvider');
  }
  return context;
}
