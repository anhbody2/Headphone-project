import toast from 'react-hot-toast';
import api from './axios';

export const sendPayment = async (data: any) => {
  const res = await api.post("/checkout", data);
  toast.success("Payment processed successfully");
  return res.data;
};
