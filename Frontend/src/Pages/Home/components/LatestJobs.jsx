import { LatestJob } from '@/Data/LatestJOb'
import React from 'react'
import LatestJobCard from './LatestJobCard'

const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto p-2 my-20'>
      <h1 className='text-3xl md:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
      {/* Multiple job card display */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-5'>
        {
          LatestJob.slice(0,6).map((job, idx) => (
            <LatestJobCard />
          ))
        }
      </div>
    </div>
  )
}

export default LatestJobs