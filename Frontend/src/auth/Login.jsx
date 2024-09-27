import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/redux'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { LoaderPinwheel } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    });

    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/')
                toast.success(res.data.message);
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
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center p-5 mx-auto max-w-7xl'>
                <form onSubmit={handleSubmit} className='p-4 my-10 border-gray-200 rounded-lg shadow-md md:w-1/2'>
                    <h1 className='mb-5 text-xl font-bold text-center'>Log In</h1>
                    {/* Email */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>E mail</Label>
                        <Input value={input.fullname} name='email' onChange={changeEventHandler} type='email' placeholder='Enter your email' />
                    </div>
                    {/* Password */}
                    <div className='flex flex-col gap-2 my-3'>
                        <Label>Password</Label>
                        <Input value={input.password} name='password' onChange={changeEventHandler} type='password' placeholder='Enter password' />
                    </div>
                    {/* Job type */}
                    <div className='flex flex-col my-3'>
                        <Label>Type</Label>
                        <RadioGroup className='flex items-center gap-5 p-2'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    checked={input.role === 'job seekers'}
                                    onChange={changeEventHandler}
                                    type='radio'
                                    name='role'
                                    value='job seekers'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="option-one">Job_Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type='submit' disabled={loading} className='w-full my-3'>{loading ? <LoaderPinwheel className='w-4 h-4 mr-2 animate-spin' /> : 'Submit'}</Button>
                    <span className='text-sm'>Didn't have an account <Link to={'/signup'}><span className='font-bold text-green-600'>Signup</span></Link></span>

                </form>
            </div>
        </div>
    )
}
export default Login