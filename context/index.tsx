'use client';

import { IUser } from '@/types/user';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type GlobalStateProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<any | null>(null);

export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthedUser, setIsAuthedUser] = useState(false);
  const [user, setUser] = useState<Partial<IUser & { id: string }> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!Cookies.get('token')) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}') as Partial<
      IUser & { id: string }
    >;

    setUser(user);
    setIsAuthedUser(true);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthedUser,
        setIsAuthedUser,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
