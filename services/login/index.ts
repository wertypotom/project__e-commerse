import { IUser } from '@/types/user';

export const loginUser = async (formData: Partial<IUser>) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return response.json();
  } catch (err) {
    console.error('ERROR', (err as Error).message);
  }
};
