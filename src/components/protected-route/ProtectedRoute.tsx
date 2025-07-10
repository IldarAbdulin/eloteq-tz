import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const access_token = localStorage.getItem('eloteq_tz_access_token');
  const location = useLocation();

  if (!access_token && location.pathname !== `/auth`) {
    return <Navigate to={`/auth`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
