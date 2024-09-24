import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './components/AdminJobsTable'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/job.slice'

const Adminjobs = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    useGetAllAdminJobs();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl p-3 mx-auto my-10'>
                <div className='flex items-center justify-between gap-3' >
                    <Input className='rounded-full w-fit basis-3/4' onChange={(e) => setInput(e.target.value)} placeholder='Filter by Company name and Role' />
                    <Button className='rounded-full basis-1/4' onClick={() => navigate('/admin/jobs/post')}>New Job</Button>
                </div>
                <div className='my-7'>
                    <AdminJobsTable />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0'>
            <Footer />
            </div>
        </div>
    )
}

export default Adminjobs