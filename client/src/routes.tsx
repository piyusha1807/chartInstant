/* eslint-disable react/react-in-jsx-scope */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// //
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Charts from './pages/Charts';
import { Settings } from './pages/Settings';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="chart/new/upload" replace /> },
        { path: 'chart/:chartId/:stepName', element: <Charts /> },
        // { path: 'library', element: <Charts /> },
        // { path: 'settings', element: <Navigate to="settings/profile" replace /> },
        { path: 'settings/:settingTab', element: <Settings /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
