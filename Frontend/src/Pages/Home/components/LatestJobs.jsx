import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import store from '@/redux/redux'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)
  return (
    <div className='max-w-7xl mx-auto p-2 my-20'>
      <h1 className='text-3xl md:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
      {/* Multiple job card display */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-5'>
        {
          allJobs.length > 0 ? allJobs.slice(0, 6).map((job) => (
            <LatestJobCard key={job._id} job={job} />
          )) : <span>No Jobs available</span>
        }
      </div>
    </div>
  )
}

export default LatestJobs