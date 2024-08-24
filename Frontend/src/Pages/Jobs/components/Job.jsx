import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate();
    const jobId = 'fhdjkfgjdsgf'
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>
            <div className='flex items-center justify-between'>
                <p>2 days ago</p>
                <Button variant='outline' className='rounded-full' size='icon' ><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6 rounded-full' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src='/vite.svg' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm to-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm to-gray-400 text-justify'> Description</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="outline" className={'text-blue-700 font-bold'}>12 Positions</Badge>
                <Badge variant="outline" className={'text-[#F83002] font-bold'}>Part time</Badge>
                <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>24 LPA</Badge>
            </div>
            <div className='flex items-center justify-end gap-3 mt-5'>
                <Button onClick={()=>navigate(`/jobs/description/${jobId}`)} variant='outline'>Details</Button>
                <Button className='bg-[#7209b7]'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job