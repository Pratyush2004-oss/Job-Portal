import Filter from './components/Filter'
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import Job from './components/Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const { searchQuery } = useSelector(store => store.job)
    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (job.salary >= Number(searchQuery.split(' ')[0].split('-')[0]) && job.salary <= Number(searchQuery.split(' ')[1].split('L')[0]))
            })
            setFilterJobs(filteredJobs)
        }
        else {
            setFilterJobs(allJobs);
        }

    }, [allJobs, searchQuery])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%] hidden sm:block'>
                        <Filter />
                    </div>
                    {
                        filterJobs.length > 0 ? (
                            <div className='flex-1 p-2 h-[80vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Job key={job._id} job={job} />
                                        </motion.div>
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