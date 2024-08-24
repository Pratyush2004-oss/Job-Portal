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
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    });

    const { loading } = useSelector(store => store.auth)
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
    return (
        <div>
            <Navbar />
            <div className='p-5 flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='md:w-1/2 border-gray-200 rounded-lg p-4 my-10 shadow-md'>
                    <h1 className='font-bold text-center text-xl mb-5'>Log In</h1>
                    {/* Email */}
                    <div className='gap-2 my-3 flex flex-col'>
                        <Label>E mail</Label>
                        <Input value={input.fullname} name='email' onChange={changeEventHandler} type='email' placeholder='Enter your email' />
                    </div>
                    {/* Password */}
                    <div className='gap-2 my-3 flex flex-col'>
                        <Label>Password</Label>
                        <Input value={input.password} name='password' onChange={changeEventHandler} type='password' placeholder='Enter your name' />
                    </div>
                    {/* Job type */}
                    <div className='flex flex-col my-3'>
                        <Label>Type</Label>
                        <RadioGroup className='flex gap-5 items-center p-2'>
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
                    <Button type='submit' disabled={loading} className='w-full my-3'>{loading ? <LoaderPinwheel className='mr-2 w-4 h-4 animate-spin' /> : 'Submit'}</Button>
                    <span className='text-sm'>Didn't hava an account <Link to={'/signup'}><span className='font-bold text-green-600'>Signup</span></Link></span>

                </form>
            </div>
        </div>
    )
}
export default Login