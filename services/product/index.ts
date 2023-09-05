import { Options } from '@/types/input';
import { IProduct } from '@/types/product';
import Cookies from 'js-cookie';

type ReturnType = {
  status: string;
  message: string;
  data: {
    product: IProduct<Options[]>;
  };
};

export const addNewProduct = async (
  formData: IProduct<any[]>
): Promise<ReturnType | undefined> => {
  try {
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
