import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LucideDoorOpen, Menu, User2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'

const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white '>
            <div className='flex items-center w-full justify-between mx-auto max-w-7xl h-16 max-xl:p-5'>
                <div>
                <Link to={'/'}>
                <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
                </Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='md:flex hidden font-medium items-center gap-5'>
                        <l1>Home</l1>
                        <l1>Jobs</l1>
                        <l1>Browse</l1>
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
                                        <ul className='flex flex-col md:hidden font-medium items-center gap-2'>
                                            <l1>Home</l1>
                                            <l1>Jobs</l1>
                                            <l1>Browse</l1>
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
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='max-md:w-60 w-80 '>
                                    <ul className='flex items-center justify-between my-2 md:hidden font-medium mx-6'>
                                        <l1 className='hover:border-b-2'>Home</l1>
                                        <l1 className='hover:border-b-2'>Jobs</l1>
                                        <l1 className='hover:border-b-2'>Browse</l1>
                                    </ul>
                                    <div className='flex justify-evenly items-center'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>Pratyush Mishra</h4>
                                            <p className='text-xs text-muted-foreground'>lorem hii hello justify</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end justify-center text-gray-600 '>
                                        <Button variant='link'>View Profile <User2 /></Button>
                                        <Button variant='link'>Logout <LucideDoorOpen /></Button>
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