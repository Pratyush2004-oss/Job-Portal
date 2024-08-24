import Navbar from '@/components/shared/Navbar'
import React from 'react'
import Job from '../Jobs/components/Job';

const randomjobs = [1, 2, 3, 4, 5];
const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl p-2 mx-auto my-10'>
                <h1>Search results ({randomjobs.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5'>
                    {
                        randomjobs.map((job, idx) => {
                            return (
                                <Job />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse