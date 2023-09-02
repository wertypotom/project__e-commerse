import React from 'react';
import { LOGIN_FORM_CONTROLS, REGISTRATION_FORM_CONTROLS } from '../consts';
import Link from 'next/link';
import Select from '@/component/Form/Select';
import Input from '@/component/Form/Input';

type Props = {};

const LoginPage = (props: Props) => {
  const renderFormFields = () => {
    return LOGIN_FORM_CONTROLS.map((item) => {
      return item.componentType === 'input' ? (
        <Input
          inputLabel={item.label}
          type={item.type}
          placeholder={item.placeholder}
        />
      ) : (
        <Select inputLabel={item.label} options={item.options!} />
      );
    });
  };

  return (
    <div className='bg-white relative'>
      <div className='flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto  xl:px-5 lg:flex-row'>
        <div className='flex flex-col justify-center items-center w-full px-10 lg:flex-row'>
          <div className='w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
            <div className='flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10'>
              <p className='w-full text-4xl font-medium text-center font-serif'>
                Login
              </p>

              <div className='w-full mt-6 mr-0 mb-7 ml-0 relative space-y-8'>
                {renderFormFields()}
              </div>

              <button className='btn-full'>Login</button>

              <div className='flex flex-col gap-2 self-start mt-8'>
                New to website ?
              </div>

              <Link className='btn-full' href='/register'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// inline-flex w-full items-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide

export default LoginPage;
