import { toast } from 'react-toastify';

export const showSuccessToast = (message: string) => {
  return toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
export const showErrorToast = (message: string) => {
  return toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
