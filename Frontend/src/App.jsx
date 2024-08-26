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
    element: <Companies />
  },
  {
    path: 'admin/companies/create',
    element: <CreateCompany />
  },
  {
    path: 'admin/companies/:id',
    element: <EditCompany />
  },
  {
    path: 'admin/jobs',
    element: <Adminjobs />
  },
  {
    path: 'admin/jobs/post',
    element: <PostJobs />
  },
  {
    path: 'admin/jobs/:id/applicants',
    element: <JobApplicants />
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
