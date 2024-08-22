import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className='p-5 flex items-center justify-center max-w-7xl mx-auto'>
                <form action='' className='md:w-1/2 border-gray-200 rounded-lg p-4 my-10 shadow-md'>
                    <h1 className='font-bold text-center text-xl mb-5'>Sign Up </h1>
                    {/* Full Name */}
                    <div className='gap-2 my-3 flex flex-col'>
                        <Label>Full Name</Label>
                        <Input type='text' placeholder='Enter your name' />
                    </div>
                    {/* Email */}
                    <div className='gap-2 my-3 flex flex-col'>
                        <Label>E mail</Label>
                        <Input type='email' placeholder='Enter your email' />
                    </div>
                    {/* Phone Number */}
                    <div className='gap-2 my-3 flex flex-col'>
                        <Label>Phone Number</Label>
                        <Input type='text' placeholder='Enter your phone number' />
                    </div>
                    {/* Password */}
                    <div className='gap-2 my-3 flex flex-col'>
                        <Label>Password</Label>
                        <Input type='password' placeholder='Enter your name' />
                    </div>
                    {/* Job type */}
                    <div className='flex flex-col my-3'>
                        <Label>Type</Label>
                        <RadioGroup className='flex gap-5 items-center p-2'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='job seeker'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="option-one">Job_Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='job seeker'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {/* Profile Picture */}
                    <div className='flex flex-col my-3 gap-2'>
                        <Label>Profile</Label>
                        <Input accept='image/*'
                            type='file'
                            className='cursor-pointer'
                        />
                    </div>
                    <Button type='submit' className='w-full my-3'>Submit</Button>
                    <span className='text-sm'>Already have an account <Link to={'/login'}><span className='font-bold text-blue-600'>Login</span></Link></span>

                </form>
            </div>
        </div>
    )
}
export default Signup