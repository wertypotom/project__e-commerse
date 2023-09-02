'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { REGISTRATION_FORM_CONTROLS } from '../consts';
import Input from '@/components/Form/Input';
import Select from '@/components/Form/Select';
import { IUser } from '@/types/user';
import { userSchemaForValidationOnRegistration } from '@/utils/validation';
import { registerUser } from '@/services/registration';
import { GlobalContext } from '@/context';
import { redirect } from 'next/navigation';

type Props = {};

const isRegistered = false;

const initialFormData: IUser = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

const RegistrationPage = (props: Props) => {
  const [formData, setFormData] = useState<IUser>(initialFormData);
  const { isAuthedUser } = useContext(GlobalContext);

  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (isAuthedUser) {
      redirect('/');
    }
  }, [isAuthedUser]);

  const { error: userFieldsValidationError } =
    userSchemaForValidationOnRegistration.validate({
      ...formData,
    });

  const handleRegisterOnSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data = await registerUser(formData);
    setFormData(initialFormData);

    console.log(data);
  };

  const renderFormFields = () => {
    return REGISTRATION_FORM_CONTROLS.map((item) => {
      return item.componentType === 'input' ? (
        <Input
          key={item.id}
          inputLabel={item.label}
          name={item.id}
          type={item.type}
          placeholder={item.placeholder}
          onChange={handleFormDataChange}
          value={formData[item.id as keyof typeof formData]}
        />
      ) : (
        <Select
          key={item.id}
          name={item.id}
          inputLabel={item.label}
          options={item.options!}
          onChange={handleFormDataChange}
          value={formData[item.id as keyof typeof formData]}
        />
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
              <button
                disabled={!!userFieldsValidationError}
                className='btn-full'
                onClick={handleRegisterOnSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
