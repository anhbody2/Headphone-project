import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../hook/authContext';
export const AdminRoute = () => {
  const {user, authReady} = useAuth();
  if (!authReady){
    return <p className="p-10 text-center text-gray-500">Loading profile...</p>;
  }
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};3