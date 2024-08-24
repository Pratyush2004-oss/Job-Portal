import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React from 'react'

const JobDescription = () => {
    const isAppled = false;
    return (
        <div className='max-w-7xl mx-auto my-10 p-2'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-xl'>Frontend Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge variant="outline" className={'text-blue-700 font-bold'}>12 Positions</Badge>
                        <Badge variant="outline" className={'text-[#F83002] font-bold'}>Part time</Badge>
                        <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>24 LPA</Badge>
                    </div>
                </div>
                {
                    <Button className='rounded-full bg-[#7209b7]' disabled={isAppled}>{isAppled ? 'Applied already' : 'Apply now'}</Button>
                }
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4 p-3'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Banglore</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>this is the job for frontend developers</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>10LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>17-07-2024</span></h1>
            </div>
        </div>
    )
}

export default JobDescription