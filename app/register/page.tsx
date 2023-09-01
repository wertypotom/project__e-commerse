import React from 'react';
import { REGISTRATION_FORM_CONTROLS } from '../consts';
import Input from '../component/Form/Input';
import Select from '../component/Form/Select';

type Props = {};

const isRegistered = false;

const RegistrationPage = (props: Props) => {
  const renderFormFields = () => {
    return REGISTRATION_FORM_CONTROLS.map((item) => {
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
                {isRegistered
                  ? 'Registartion Successfull'
                  : 'Sign up for an account'}
              </p>
              {isRegistered ? (
                <button className='btn-full'>Login</button>
              ) : (
                <div className='w-full mt-6 mr-0 mb-7 ml-0 relative space-y-8'>
                  {renderFormFields()}
                </div>
              )}
              <button className='btn-full'>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// inline-flex w-full items-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide

export default RegistrationPage;
