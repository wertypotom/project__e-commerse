'use client';

import {
  ADMIN_PRODUCT_FORM_CONTROLS,
  AVAILABLE_SIZES,
  FIREBASE_CONFIG,
  FIREBASE_STORAGE_URL,
} from '@/app/consts';
import Input from '@/components/Form/Input';
import Select from '@/components/Form/Select';
import Tiles from '@/components/Form/Tile';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  extractImageUrlFirebase,
  getUniqueFilename,
} from '@/utils/filesHandler';
import { IProduct, IProductWithServerId } from '@/types/product';
import { Options } from '@/types/input';
import { addNewProduct, updateProduct } from '@/services/product';
import { showErrorToast, showSuccessToast } from '@/utils/toastHandler';
import { ToastContainer } from 'react-toastify';
import ComponentLevelLoader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context';

const app = initializeApp(FIREBASE_CONFIG);
const storage = getStorage(app, FIREBASE_STORAGE_URL);

type Props = {};

const initialFormData: IProductWithServerId<any[]> = {
  _id: '',
  name: '',
  price: 0,
  description: '',
  category: 'men',
  sizes: [],
  deliveryInfo: '',
  onSale: 'no',
  imageUrl: '',
  priceDrop: 0,
};

const AdminAddNewProduct = (props: Props) => {
  const { selectedProduct } = useContext(GlobalContext);

  const [formData, setFormData] = useState(selectedProduct || initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files as FileList;
    const fileName = getUniqueFilename(file[0]);
    const storageReference = ref(storage, `ecommerce/${fileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file[0]);

    const imageUrl = await extractImageUrlFirebase(uploadImage);

    if (!!imageUrl) {
      setFormData({
        ...formData,
        imageUrl: imageUrl,
      });
    }
  };

  const handleFormFieldsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectSizes = (value: Options) => {
    let sizes = [...formData.sizes];
    const index = sizes.findIndex((item) => item.value === value.value);

    if (index === -1) {
      sizes.push(value);
    } else {
      sizes = sizes.filter((item) => item.value !== value.value);
    }

    setFormData({
      ...formData,
      sizes,
    });
  };

  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      const res = !!selectedProduct
        ? await updateProduct(formData)
        : await addNewProduct(formData);

      if (!res?.data) throw new Error(res?.message);

      showSuccessToast(res.message);
      setFormData(initialFormData);

      setTimeout(() => {
        router.push('/admin-view/all-products');
      }, 1000);
    } catch (error) {
      showErrorToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full mt-5 mb-0 mx-0 relative'>
      <div className='flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative'>
        <div className='w-full mt-6 mb-0 mx-0 space-y-8'>
          <input
            type='file'
            accept='image/*'
            max='1000000'
            onChange={handleUploadImage}
          />
          <div className='flex gap-2 flex-col'>
            <label>Available sizes</label>
            <Tiles
              data={AVAILABLE_SIZES}
              onClick={handleSelectSizes}
              selected={formData.sizes}
            />
          </div>

          {ADMIN_PRODUCT_FORM_CONTROLS.map((item) => {
            return item.componentType === 'input' ? (
              <Input
                inputLabel={item.label}
                type={item.type}
                placeholder={item.placeholder}
                name={item.id}
                key={item.id}
                value={formData[item.id as keyof typeof formData]}
                onChange={handleFormFieldsChange}
              />
            ) : (
              <Select
                inputLabel={item.label}
                options={item.options}
                placeholder={item.placeholder}
                key={item.id}
                name={item.id}
                value={formData[item.id as keyof typeof formData]}
                onChange={handleFormFieldsChange}
              />
            );
          })}

          <ToastContainer className='mt-20' />

          <button
            disabled={isLoading}
            onClick={handleAddProduct}
            className='btn-full'
          >
            {isLoading ? (
              <ComponentLevelLoader
                text={
                  selectedProduct
                    ? 'Updating the product'
                    : 'Adding new product'
                }
                color={'#ffffff'}
                loading={isLoading}
              />
            ) : selectedProduct ? (
              'Update Product'
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddNewProduct;
