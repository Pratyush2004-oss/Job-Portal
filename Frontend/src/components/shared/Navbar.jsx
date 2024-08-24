import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LucideDoorOpen, Menu, User2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import store from '@/redux/redux'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/');
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);

        }

    }
    return (
        <div className='bg-white'>
            <div className='flex items-center w-full justify-between mx-auto max-w-7xl h-16 max-xl:p-5'>
                <div>
                    <Link to={'/'}>
                        <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Hunt</span></h1>
                    </Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='sm:flex hidden font-medium items-center gap-5'>
                        <Link to={'/'}><l1>Home</l1></Link>
                        <Link to={'/jobs'}><l1>Jobs</l1></Link>
                        <Link to={'/browse'}><l1>Browse</l1></Link>
                    </ul>
                    {
                        !user ? (
                            <div>
                                <div className='md:flex items-center hidden'>
                                    <Link to={'/login'}><Button variant='link'>SignIn</Button></Link>
                                    <Link to={'/signup'}><Button variant='link'>SignUp</Button></Link>
                                </div>
                                <DropdownMenu className='md:hidden'>
                                    <DropdownMenuTrigger className='md:hidden'><Menu /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <ul className='flex flex-col sm:hidden font-medium items-center gap-2'>
                                            <Link to={'/'}><l1>Home</l1></Link>
                                            <Link to={'/jobs'}><l1>Jobs</l1></Link>
                                            <Link to={'/browse'}><l1>Browse</l1></Link>
                                        </ul>
                                        <div className='flex flex-col items-center'>
                                            <Link to={'/login'}><Button variant='link'>SignIn</Button></Link>
                                            <Link to={'/signup'}><Button variant='link'>SignUp</Button></Link>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user.profile.profilePic ? user.profile.profilePic : "https://github.com/shadcn.png"} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='max-md:w-60 w-80'>
                                    <ul className='flex items-center justify-between my-2 sm:hidden font-medium mx-6'>
                                        <Link to={'/'}><l1 className='hover:border-b-2'>Home</l1></Link>
                                        <Link to={'/jobs'}><l1 className='hover:border-b-2'>Jobs</l1></Link>
                                        <Link to={'/browse'}><l1 className='hover:border-b-2'>Browse</l1></Link>
                                    </ul>
                                    <div className='flex justify-evenly items-center'>
                                        <Avatar>
                                            <AvatarImage src={user.profile.profilePic ? user.profile.profilePic : "https://github.com/shadcn.png"} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname}</h4>
                                            <p className='text-xs text-muted-foreground'>{user.role}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end justify-center text-gray-600 '>
                                        <Link to={'/profile'}><Button variant='link'>View Profile <User2 /></Button></Link>
                                        <Button onClick={logoutHandler} variant='link'>Logout <LucideDoorOpen /></Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar