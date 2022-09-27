import {ToastContainer, toast} from 'react-toastify';
export const notify = (message) => {
  console.log('notify called');
  toast(message, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
