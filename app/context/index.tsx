'use client';

import { createContext, useState } from 'react';

type GlobalStateProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<any | null>(null);

export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState(false);

  return (
    <GlobalContext.Provider value={{ showNavModal, setShowNavModal }}>
      {children}
    </GlobalContext.Provider>
  );
}
