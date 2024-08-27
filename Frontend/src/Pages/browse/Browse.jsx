import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import Job from '../Jobs/components/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/job.slice';
import useGetAllJobs from '@/Hooks/useGetAllJobs';

const Browse = () => {
    const { allJobs } = useSelector(store => store.job);
    useGetAllJobs();
    const dispatch = useDispatch();
    useEffect(()=>{
        return () => {
            dispatch(setSearchedQuery(''))
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl p-2 mx-auto my-10'>
                <h1>Search results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse