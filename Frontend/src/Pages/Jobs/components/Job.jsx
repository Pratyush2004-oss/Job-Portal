import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongoDBTime) => {
        const createdAt = new Date(mongoDBTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return job && (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>
            <div className='flex items-center justify-between'>
                <p>{daysAgoFunction(job.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon' ><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6 rounded-full' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src={job.companyId.logo ? job.companyId.logo :'/vite.svg'} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job.companyId.name}</h1>
                    <p className='text-sm to-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job.title}</h1>
                <p className='text-sm to-gray-400 text-justify'> {job.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="outline" className={'text-blue-700 font-bold'}>{job.position} Positions</Badge>
                <Badge variant="outline" className={'text-[#F83002] font-bold'}>{job.jobType}</Badge>
                <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>{job.salary} LPA</Badge>
                <Badge variant="ghost" className={'text-green-700 font-bold'}>{job.location}</Badge>
            </div>
            <div className='flex items-center justify-end gap-3 mt-5'>
                <Button onClick={() => navigate(`/jobs/description/${job._id}`)} variant='outline'>Details</Button>
                <Button className='bg-[#7209b7]'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job