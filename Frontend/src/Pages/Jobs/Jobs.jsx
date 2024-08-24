import Filter from './components/Filter'
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import Job from './components/Job';

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%] hidden sm:block'>
                        <Filter />
                    </div>
                    {
                        jobArray.length > 0 ? (
                            <div className='flex-1 p-2 h-[80vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {jobArray.map((item, idx) => (
                                        <div>
                                            <Job key={idx} />
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