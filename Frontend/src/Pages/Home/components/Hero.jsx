import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const Hero = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 01 Job Hunt Website</span>
                <h1 className='text-3xl md:text-5xl font-bold'>Search, Apply & <br /> Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p></p>
            </div>
            <div className='relative outline-none rounded-full border-none w-5/6 mx-auto shadow-lg'>
                <Input type='text' placeholder='Find your Dream jobs' className='w-full rounded-full mx-auto' />
                <Button className='absolute rounded-full z-10 top-0 h-full right-0' variant='ghost'><Search /></Button>
            </div>
        </div>
    )
}

export default Hero