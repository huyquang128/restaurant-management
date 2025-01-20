/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';

function ToastMsg({ status = 'success', msg }) {
    const typeToast = status === 'success' ? toast.success : toast.error;
    typeToast(`${msg}`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
    });
}

export default ToastMsg;
