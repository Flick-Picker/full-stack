import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CreateGroup from './pages/CreateGroup';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import JoinGroup from './pages/JoinGroup';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/group/create',
    element: <CreateGroup />,
  },
  {
    path: '/group/join',
    element: <JoinGroup />,
  },
  {
      path: '/error',
      element: <ErrorPage />,
  }
]);

export default router;
