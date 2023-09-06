'use client';

import { IUser } from '@/types/user';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { IProduct, IProductWithServerId } from '@/types/product';
import { Options } from '@/types/input';

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

type GlobalStateProps = {
  children: React.ReactNode;
};

type GlobalContextProviderProps = {
  showNavModal: boolean;
  setShowNavModal: TypeSetState<boolean>;
  isAuthedUser: boolean;
  setIsAuthedUser: TypeSetState<boolean>;
  user: Partial<IUser & { id: string }> | undefined;
  setUser: TypeSetState<
    | Partial<
        IUser & {
          id: string;
        }
      >
    | undefined
  >;
  selectedProduct: IProductWithServerId<Options[]> | null;
  setSelectedProduct: TypeSetState<IProductWithServerId<Options[]> | null>;
};

export const GlobalContext = createContext<GlobalContextProviderProps>({
  isAuthedUser: false,
  selectedProduct: null,
  showNavModal: false,
  user: undefined,
  setIsAuthedUser: () => {},
  setSelectedProduct: () => {},
  setShowNavModal: () => {},
  setUser: () => {},
});

export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthedUser, setIsAuthedUser] = useState(false);
  const [user, setUser] = useState<Partial<IUser & { id: string }> | undefined>(
    undefined
  );
  const [selectedProduct, setSelectedProduct] = useState<IProductWithServerId<
    Options[]
  > | null>(null);

  useEffect(() => {
    if (!Cookies.get('token')) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}') as Partial<
      IUser & { id: string }
    >;

    setUser(user);
    setIsAuthedUser(true);
  }, []);

  const value: GlobalContextProviderProps = useMemo(
    () => ({
      showNavModal,
      setShowNavModal,
      isAuthedUser,
      setIsAuthedUser,
      user,
      setUser,
      selectedProduct,
      setSelectedProduct,
    }),
    [isAuthedUser, selectedProduct, showNavModal, user]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
