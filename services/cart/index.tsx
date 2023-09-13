import { ICart } from '@/types/cart';
import { Options } from '@/types/input';
import { IProduct } from '@/types/product';
import Cookies from 'js-cookie';

interface ReturnType {
  status: 'success' | 'fail';
  message: string;
}

interface SingleProduct extends ReturnType {
  data: {
    product: any;
  };
}

interface MultipleProducts extends ReturnType {
  data: {
    products: any;
  };
}

export const addToCart = async (
  userId: string,
  formData: IProduct<Options[]>
): Promise<SingleProduct> => {
  const res = await fetch('/api/cart/add-to-cart', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    body: JSON.stringify({
      userId: userId,
      productData: formData,
    }),
  });

  return res.json();
};

export const getAllCartItems = async (
  id: string
): Promise<MultipleProducts | undefined> => {
  const res = await fetch(
    `http://localhost:3000/api/cart/all-cart-items?id=${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }
  );

  return res.json();
};

export const deleteFromCart = async (
  id: string
): Promise<SingleProduct | undefined> => {
  const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });

  return res.json();
};
