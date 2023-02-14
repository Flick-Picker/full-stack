import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CreateGroup from './pages/CreateGroup';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import JoinGroup from './pages/JoinGroup';
import LoginPage from './pages/LoginPage';
import Preferences from './pages/Preferences';
import SignUpPage from './pages/SignUpPage';
import Social from './pages/Social';
import VotingPage from './pages/VotingPage';
import ProfilePage from './pages/ProfilePage';
import EmailChange from './pages/EmailChange';
import PasswordChange from './pages/PasswordChange';

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
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/emailchange',
    element: <EmailChange />
  },
  {
    path: '/profile/passwordchange',
    element: <PasswordChange />
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
    path: '/social',
    element: <Social />,
  },
  {
    path: '/preferences',
    element: <Preferences />,
  },
  {
    path: '/group/vote',
    element: <VotingPage />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);

export default router;
