import { Badge } from '@/components/ui/badge'
import React from 'react'

const LatestJobCard = ({ job }) => {
    return job && (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='text-lg font-medium'>{job.companyId.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job.title}</h1>
                <p className='text-sm text-gray-600 text-justify'>{job.description} </p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge variant="outline" className={'text-blue-700 font-bold'}>{job.position} Positions</Badge>
                <Badge variant="outline" className={'text-[#F83002] font-bold'}>{job.jobType}</Badge>
                <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>{job.salary} LPA</Badge>
                <Badge variant="ghost" className={'text-green-700 font-bold'}>{job.location}</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard