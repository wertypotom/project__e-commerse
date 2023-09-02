import { IUser } from '@/types/user';

type ReturnType = {
  status: string;
  message: string;
  data: {
    user: IUser;
  };
};

export const registerUser = async (
  formData: IUser
): Promise<ReturnType | undefined> => {
  try {
    const response = await fetch('/api/register', {
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
