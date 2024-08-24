import Login from './auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Signup from './auth/Signup';
import Jobs from './Pages/Jobs/Jobs';
import Browse from './Pages/browse/Browse';
import Profile from './components/shared/Profile'
import JobDescription from './Pages/Jobs/components/JobDescription';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/jobs/description/:id',
    element:<JobDescription/>
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
