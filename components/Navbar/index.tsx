'use client';

import React, { useContext } from 'react';
import NavItems from './NavbarItems';
import Modal from '../Modal';
import { GlobalContext } from '@/context';
import useMediaQuery from '@/hooks/useMediaQuery';
import ButtonBurgerMenu from '../Button/ButtonBurgerMenu';

type Props = {};

const isAdminView = false;
const isAuthedUser = true;
const user = {
  role: 'admin',
};

const Navbar = (props: Props) => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {/* Navbar */}
      <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
        {/* Content-Wrapper */}
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          {/* Logo left */}
          <div className='flex items-center cursor-pointer'>
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
            {user.role === 'admin' ? (
              isAdminView ? (
                <button className='btn'>Client view</button>
              ) : (
                <button className='btn'>Admin view</button>
              )
            ) : null}
            {isAuthedUser ? (
              <button className='btn'>Log Out</button>
            ) : (
              <button className='btn'>Log In</button>
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
