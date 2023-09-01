'use client';

import React, { useState } from 'react';
import ButtonBurgerMenu from '../Button/ButtonBurgerMenu';
import NavItems from './NavbarItems';

type Props = {};

const isAdminView = true;
const isAuthedUser = true;
const user = {
  role: 'admin',
};

const Navbar = (props: Props) => {
  const [showNavModal, setShowNavModal] = useState(false);

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

          <ButtonBurgerMenu onClick={() => setShowNavModal(true)} />
          {/* Middle navbar items */}
          <NavItems isAdminView={isAdminView} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
