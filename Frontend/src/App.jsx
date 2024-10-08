import Login from './auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Signup from './auth/Signup';
import Jobs from './Pages/Jobs/Jobs';
import Browse from './Pages/browse/Browse';
import Profile from './components/shared/Profile'
import JobDescription from './Pages/Jobs/components/JobDescription';
import Companies from './admin/Companies';
import CreateCompany from './admin/CreateCompany';
import EditCompany from './admin/EditCompany';
import Adminjobs from './admin/Adminjobs';
import PostJobs from './admin/PostJobs';
import JobApplicants from './admin/JobApplicants';
import ProtectedRoute from './admin/ProtectedRoute';

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
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  // for admins 
  {
    path: 'admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: 'admin/companies/create',
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path: 'admin/companies/:id',
    element: <ProtectedRoute><EditCompany /></ProtectedRoute>
  },
  {
    path: 'admin/jobs',
    element: <ProtectedRoute><Adminjobs /></ProtectedRoute>
  },
  {
    path: 'admin/jobs/post',
    element: <ProtectedRoute><PostJobs /></ProtectedRoute>
  },
  {
    path: 'admin/jobs/:id/applicants',
    element: <ProtectedRoute><JobApplicants /></ProtectedRoute>
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
