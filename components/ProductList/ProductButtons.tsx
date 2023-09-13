'use client';
import { GlobalContext } from '@/context';
import { deleteProduct } from '@/services/product';
import { Options } from '@/types/input';
import { IProduct } from '@/types/product';
import { showErrorToast, showSuccessToast } from '@/utils/toastHandler';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import ComponentLevelLoader from '../Loader';
import { ToastContainer } from 'react-toastify';
import { addToCart } from '@/services/cart';

type Props = {
  item: IProduct<Options[]>;
};

const ProductButton = ({ item }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setSelectedProduct, user, setCartItems, cartItems } =
    useContext(GlobalContext);

  const isAdminView = pathname.includes('admin-view');

  const updateProduct = () => {
    setSelectedProduct(item);
    router.push('/admin-view/add-product');
  };

  const handleAddToCart = async () => {
    setCartItems((prev) => [...prev, item]);
    try {
      setIsLoading(true);
      const res = await addToCart(user?.id!, item);
      //   if (res.status === 'fail') throw new Error(res.message);
      showSuccessToast(res.message);
    } catch (error) {
      showErrorToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      const res = await deleteProduct(item._id!);

      if (!res?.data) throw new Error(res?.message);
      showSuccessToast(res.message);

      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      showErrorToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer className='mt-20' />
      {isAdminView ? (
        <>
          <button className='btn' onClick={updateProduct}>
            Update
          </button>
          <button
            disabled={isLoading}
            onClick={handleDeleteProduct}
            className='btn'
          >
            {isLoading ? (
              <ComponentLevelLoader
                text={'Deleting the product'}
                color={'#ffffff'}
                loading={isLoading}
              />
            ) : (
              'Delete'
            )}
          </button>
        </>
      ) : (
        <>
          <button onClick={handleAddToCart} className='btn'>
            {isLoading ? (
              <ComponentLevelLoader
                text={'Adding the product'}
                color={'#ffffff'}
                loading={isLoading}
              />
            ) : (
              'Add Product'
            )}
          </button>
        </>
      )}
    </>
  );
};

export default ProductButton;
