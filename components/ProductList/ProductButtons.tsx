'use client';
import { GlobalContext } from '@/context';
import { deleteProduct } from '@/services/product';
import { Options } from '@/types/input';
import { IProduct, IProductWithServerId } from '@/types/product';
import { showErrorToast, showSuccessToast } from '@/utils/toastHandler';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import ComponentLevelLoader from '../Loader';
import { ToastContainer } from 'react-toastify';

type Props = {
  item: IProductWithServerId<Options[]>;
};

const ProductButton = ({ item }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setSelectedProduct } = useContext(GlobalContext);

  const isAdminView = pathname.includes('admin-view');

  const updateProduct = () => {
    setSelectedProduct(item);
    router.push('/admin-view/add-product');
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await deleteProduct(id);

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
            onClick={() => handleDeleteProduct(item._id || '')}
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
          <button className='btn'>Add to cart</button>
        </>
      )}
    </>
  );
};

export default ProductButton;
