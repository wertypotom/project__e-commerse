'use client';

import React, { useContext } from 'react';
import NavItems from './NavbarItems';
import Modal from '../Modal';
import { GlobalContext } from '@/context';
import useMediaQuery from '@/hooks/useMediaQuery';
import ButtonBurgerMenu from '../Button/ButtonBurgerMenu';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';

type Props = {};

const Navbar = (props: Props) => {
  const {
    showNavModal,
    setShowNavModal,
    isAuthedUser,
    user,
    setIsAuthedUser,
    setUser,
  } = useContext(GlobalContext);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const pathname = usePathname();

  const isAdminView = pathname === '/admin-view';

  const handleLogout = () => {
    setIsAuthedUser(false);
    setUser(false);
    localStorage.clear();
    Cookies.remove('token');
    router.push('/');
  };

  const navigateTo = (route: string) => router.push(route);

  return (
    <>
      {/* Navbar */}
      <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
        {/* Content-Wrapper */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          {/* Logo left */}
          <div
            onClick={() => navigateTo('/')}
            className='flex items-center cursor-pointer'
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
                <button className='btn'>Cart</button>
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
        showModalTitle={false}
        show={showNavModal}
        onClose={() => setShowNavModal(false)}
      />
    </>
  );
};

export default Navbar;
