'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LOGIN_FORM_CONTROLS } from '../consts';
import Link from 'next/link';
import Select from '@/components/Form/Select';
import Input from '@/components/Form/Input';
import { IUser } from '@/types/user';
import { loginUser } from '@/services/login';
import { userSchemaForValidationOnLogin } from '@/utils/validation';
import { redirect } from 'next/navigation';
import { GlobalContext } from '@/context';
import Cookies from 'js-cookie';
import ComponentLevelLoader from '@/components/Loader';
import { toast, ToastContainer } from 'react-toastify';

type Props = {};

const initialFormData: Partial<IUser> = {
  email: '',
  password: '',
};

const LoginPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<IUser>>(initialFormData);
  const { isAuthedUser, setIsAuthedUser, user, setUser } =
    useContext(GlobalContext);

  useEffect(() => {
    if (isAuthedUser) {
      redirect('/');
    }
  }, [isAuthedUser]);

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const { error: userFieldsValidationError } =
    userSchemaForValidationOnLogin.validate({
      ...formData,
    });

  const handleLoginUser = async () => {
    // TODO: Rewrite to Next-auth

    try {
      setIsLoading(true);
      const data = await loginUser(formData);

      if (!data?.data) throw new Error(data?.message);

      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsAuthedUser(true);
      setUser(data.data.user);

      Cookies.set('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    } catch (err) {
      toast.error((err as Error).message, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });

      setIsAuthedUser(false);
      setUser(undefined);
    } finally {
      setFormData(initialFormData);
      setIsLoading(false);
    }
  };

  const renderFormFields = () => {
    return LOGIN_FORM_CONTROLS.map((item) => {
      return item.componentType === 'input' ? (
        <Input
          key={item.id}
          inputLabel={item.label}
          type={item.type}
          placeholder={item.placeholder}
          name={item.label.toLowerCase()}
          onChange={handleFormDataChange}
          value={formData[item.label.toLowerCase() as keyof typeof formData]}
        />
      ) : (
        <Select
          key={item.id}
          inputLabel={item.label}
          options={item.options!}
          name={item.label.toLowerCase()}
          value={formData[item.label.toLowerCase() as keyof typeof formData]}
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
                Login
              </p>

              <div className='w-full mt-6 mr-0 mb-7 ml-0 relative space-y-8'>
                {renderFormFields()}
              </div>

              <button
                disabled={!!userFieldsValidationError}
                className='btn-full'
                onClick={handleLoginUser}
              >
                {isLoading ? (
                  <ComponentLevelLoader
                    text={'Logging In'}
                    color={'#ffffff'}
                    loading={isLoading}
                  />
                ) : (
                  'Login'
                )}
              </button>

              <ToastContainer className='mt-20' />

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

export default LoginPage;
