import { IUser } from '@/types/user';

type ReturnType = {
  status: string;
  message: string;
  data: {
    token: string;
    user: IUser & { id: string };
  };
};

export const loginUser = async (
  formData: Partial<IUser>
): Promise<ReturnType | undefined> => {
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
