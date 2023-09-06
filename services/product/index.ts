import { Options } from '@/types/input';
import { IProduct, IProductWithServerId } from '@/types/product';
import Cookies from 'js-cookie';

type ReturnTypeToAddProduct = {
  status: string;
  message: string;
  data: {
    product: IProduct<Options[]>;
  };
};

type ReturnTypeToGetProducts = {
  status: string;
  message: string;
  data: {
    products: IProductWithServerId<Options[]>[];
  };
};

type ReturnTypeToGetProduct = {
  status: string;
  message: string;
  data: {
    product: IProductWithServerId<Options[]>;
  };
};

export const addNewProduct = async (
  formData: IProductWithServerId<any[]>
): Promise<ReturnTypeToAddProduct | undefined> => {
  try {
    delete formData._id;

    const response = await fetch('/api/admin/add-product', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  formData: IProduct<any[]>
): Promise<ReturnTypeToAddProduct | undefined> => {
  try {
    const response = await fetch('/api/admin/update-product', {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (
  id: string
): Promise<ReturnTypeToAddProduct | undefined> => {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminProducts = async (): Promise<
  ReturnTypeToGetProducts | undefined
> => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/admin/all-products',
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (
  category: string
): Promise<ReturnTypeToGetProducts | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/client/product-by-category?category=${category}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (
  id: string
): Promise<ReturnTypeToGetProduct | undefined> => {
  try {
    console.log('id', id);
    const response = await fetch(
      `http://localhost:3000/api/client/product-by-id?id=${id}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
