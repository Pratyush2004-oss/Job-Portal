import React, { useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import ApplicationTable from './ApplicationTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

const skills = ['HTML', 'CSS', 'JS', 'React']

const Profile = () => {
  const { user } = useSelector(store => store.auth)
  const [open, setOpen] = useState(false);

  return user && (
    <div>
      <Navbar />
      <div className='max-w-4xl bg-white mx-auto my-10 border-2 border-2-gray-900 rounded-2xl p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar  >
              <AvatarImage className='w-24 h-24 rounded-full' src={user.profile.profilePic ? user.profile.profilePic : '/vite.svg'} alt='profile' />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user.fullname}</h1>
              <p>{user.profile.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-2'>
            {
              user.profile.skills.length > 0 ? user.profile.skills.map((item, idx) => (
                <Badge className={'text-black bg-gray-200 px-2'} key={idx}>{item}</Badge>
              )) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='font-bold text-lg'>Resume</Label>
          {
            user.profile.resume ?
              <a target='_blank' href={user.profile.resume} className='text-blue-500 w-full hover:underline cursor-pointer '>{user.profile.resumeOriginalName}</a>
              :
              (<span>NA</span>)
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied job</h1>
        <ApplicationTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile