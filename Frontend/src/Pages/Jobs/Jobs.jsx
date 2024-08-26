import Filter from './components/Filter'
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import Job from './components/Job';
import { useSelector } from 'react-redux';


const Jobs = () => {
    const { allJobs } = useSelector(store => store.job)
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%] hidden sm:block'>
                        <Filter />
                    </div>
                    {
                        allJobs.length > 0 ? (
                            <div className='flex-1 p-2 h-[80vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {allJobs.map((job, idx) => (
                                        <div>
                                            <Job key={idx} job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <span>No jobs listed</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs