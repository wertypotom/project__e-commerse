'use client';

import React, { useContext, useEffect } from 'react';
import NavItems from './NavbarItems';
import Modal from '../Modal';
import { GlobalContext } from '@/context';
import useMediaQuery from '@/hooks/useMediaQuery';
import ButtonBurgerMenu from '../Button/ButtonBurgerMenu';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import CartList from '../Cart/CartList';
import CartButtons from '../Cart/CartButtons';

type Props = {};

const Navbar = (props: Props) => {
  const {
    showNavModal,
    setShowNavModal,
    isAuthedUser,
    user,
    setIsAuthedUser,
    setUser,
    cartItems,
    setSelectedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const pathname = usePathname();

  const isAdminView = pathname.includes('admin-view');

  useEffect(() => {
    if (pathname !== '/admin-view/add-product') {
      setSelectedProduct(null);
    }
  }, [pathname, setSelectedProduct]);

  const handleLogout = () => {
    setIsAuthedUser(false);
    setUser(undefined);
    localStorage.clear();
    Cookies.remove('token');
    router.push('/');
  };

  const navigateTo = (route: string) => {
    router.push(route);
    setShowNavModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
        {/* Content-Wrapper */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          {/* Logo left */}
          <div
            onClick={() => navigateTo('/')}
            className='lg:flex items-center cursor-pointer hidden'
          >
            <span className='self-center text-2xl font-semibold whitespace-nowrap'>
              Ecommercy
            </span>
          </div>
          {/* Admin - User buttons right*/}
          <div className='flex md:order-2 gap-2'>
            {!isAdminView && isAuthedUser && (
              <>
                <button className='btn'>Account</button>
                <button
                  className='btn'
                  onClick={() => setShowCartModal((prev: boolean) => !prev)}
                >
                  Cart
                </button>
              </>
            )}
            {user?.role === 'admin' ? (
              isAdminView ? (
                <button className='btn' onClick={() => navigateTo('/')}>
                  Client view
                </button>
              ) : (
                <button
                  onClick={() => router.push('/admin-view')}
                  className='btn'
                >
                  Admin view
                </button>
              )
            ) : null}
            {isAuthedUser ? (
              <button onClick={handleLogout} className='btn'>
                Log Out
              </button>
            ) : (
              <button onClick={() => navigateTo('/login')} className='btn'>
                Log In
              </button>
            )}
          </div>

          <ButtonBurgerMenu
            onClick={() => setShowNavModal((prev: boolean) => !prev)}
          />
          {/* Middle navbar items */}
          <NavItems show={!isSmallScreen} isAdminView={isAdminView} />
        </div>
      </nav>

      <Modal
        content={<NavItems show isAdminView={isAdminView} />}
        show={showNavModal}
        onClose={() => setShowNavModal(false)}
      />

      <Modal
        content={<CartList />}
        show={showCartModal}
        onClose={() => setShowCartModal(false)}
        buttonComponent={<CartButtons cartItems={cartItems} />}
      />
    </>
  );
};

export default Navbar;
