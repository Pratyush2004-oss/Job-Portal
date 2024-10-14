import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { setLoading } from '@/redux/authSlice'
import store from '@/redux/redux'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { LoaderPinwheel } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        formData.append("password", input.password);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center p-5 mx-auto max-w-7xl'>
                <form onSubmit={handleSubmit} className='p-4 my-10 border-gray-200 rounded-lg shadow-md md:w-1/2'>
                    <h1 className='mb-5 text-xl font-bold text-center'>Sign Up </h1>
                    {/* Full Name */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>Full Name</Label>
                        <Input type='text' value={input.fullname} name='fullname' onChange={changeEventHandler} placeholder='Enter your name' />
                    </div>
                    {/* Email */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>E mail</Label>
                        <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='Enter your email' />
                    </div>
                    {/* Phone Number */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>Phone Number</Label>
                        <Input type='text' value={input.phoneNumber} name='phoneNumber' onChange={changeEventHandler} placeholder='Enter your phone number' />
                    </div>
                    {/* Password */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>Password</Label>
                        <Input type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Enter password' />
                    </div>
                    {/* Job type */}
                    <div className='flex flex-col my-3'>
                        <Label>Type</Label>
                        <RadioGroup className='flex items-center gap-5 p-2'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    checked={input.role === 'job seekers'}
                                    onChange={changeEventHandler}
                                    value='job seekers'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="option-one">Job_Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    name='role'
                                    value='recruiter'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {/* Profile Picture */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>Profile</Label>
                        <Input accept='image/*'
                            onChange={changeFileHandler}
                            type='file'
                            className='cursor-pointer'
                        />
                    </div>
                    <Button type='submit' disabled={loading} className='w-full my-3'>{loading ? <LoaderPinwheel className='w-4 h-4 mr-2 animate-spin' /> : 'Submit'}</Button>
                    <span className='text-sm'>Already have an account <Link to={'/login'}><span className='font-bold text-blue-600'>Login</span></Link></span>
                </form>
            </div>
        </div>
    )
}
export default Signup