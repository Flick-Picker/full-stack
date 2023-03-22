import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CreateGroup from './pages/CreateGroup';
import ErrorPage from './pages/ErrorPage';
import GroupDetails from './pages/GroupDetails';
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
import UsernameChange from './pages/UsernameChange';
import BestMatch from './pages/BestMatch';
import UserSessionDetails from './pages/UserSessionDetails';
import History from './pages/History';

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
    path: '/profile/username',
    element: <UsernameChange />
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
    path: '/group',
    element: <GroupDetails />,
  },
  {
    path: '/group/vote',
    element: <VotingPage />,
  },
  {
    path: '/group/match',
    element: <BestMatch />,
  },
  {
    path: '/group/history',
    element: <History />,
  },
  {
    path: '/user/session',
    element: <UserSessionDetails />,
  },
  {
    path: '/user/vote',
    element: <VotingPage />,
  },
  {
    path: '/user/history',
    element: <History />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);

export default router;
