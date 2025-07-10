import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  Auth,
  Layout,
  NotFound,
  Profile,
  ProtectedRoute,
  Repositories,
  UserDetail,
  UsersSearch,
} from '../components';
import { PAGES } from '../config/page.config';
import AuthCallback from '../components/auth/AuthCallback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Navigate to={PAGES.PROFILE} replace />,
          },
          {
            path: PAGES.PROFILE,
            element: <Profile />,
          },
          {
            path: PAGES.REPOSITORIES,
            element: <Repositories />,
          },
          {
            path: PAGES.USERS_SEARCH,
            element: <UsersSearch />,
          },
          {
            path: PAGES.USER_DETAIL,
            element: <UserDetail />,
          },
        ],
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: PAGES.AUTH,
    element: <Auth />,
  },
  {
    path: PAGES.AUTH_CALLBACK,
    element: <AuthCallback />,
  },
]);
