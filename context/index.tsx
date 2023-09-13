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
import { IProduct } from '@/types/product';
import { Options } from '@/types/input';

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

type GlobalStateProps = {
  children: React.ReactNode;
};

type GlobalContextProviderProps = {
  cartItems: IProduct<Options[]>[];
  setCartItems: TypeSetState<IProduct<Options[]>[]>;
  showCartModal: boolean;
  setShowCartModal: TypeSetState<boolean>;
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
  selectedProduct: IProduct<Options[]> | null;
  setSelectedProduct: TypeSetState<IProduct<Options[]> | null>;
};

export const GlobalContext = createContext<GlobalContextProviderProps>({
  cartItems: [],
  showCartModal: false,
  isAuthedUser: false,
  selectedProduct: null,
  showNavModal: false,
  user: undefined,
  setCartItems: () => {},
  setShowCartModal: () => {},
  setIsAuthedUser: () => {},
  setSelectedProduct: () => {},
  setShowNavModal: () => {},
  setUser: () => {},
});

export default function GlobalState({ children }: GlobalStateProps) {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthedUser, setIsAuthedUser] = useState(false);
  const [user, setUser] = useState<Partial<IUser & { id: string }> | undefined>(
    undefined
  );
  const [selectedProduct, setSelectedProduct] = useState<IProduct<
    Options[]
  > | null>(null);
  const [cartItems, setCartItems] = useState<IProduct<Options[]>[]>([]);

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
      showCartModal,
      setShowCartModal,
      cartItems,
      setCartItems,
    }),
    [
      isAuthedUser,
      selectedProduct,
      showCartModal,
      showNavModal,
      user,
      cartItems,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
