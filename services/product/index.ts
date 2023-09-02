import Cookies from 'js-cookie';

export const addNewProduct = async (formData): Promise<any> => {
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
