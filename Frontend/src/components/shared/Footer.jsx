import { Facebook, Linkedin, TwitterIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='py-8 bg-white border-t border-t-gray-200'>
      <div className='container px-4 mx-auto'>
        <div className='flex flex-row items-center justify-between'>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-xl font-bold'>Job Hunt</h2>
            <p className='text-sm'>© 2024 Your Company. All rights reserved.</p>
          </div>
          <div className='flex mt-4 space-x-4 md:mt-6'>
            <a href='https://facebook.com' className='hover:text-gray-400' aria-label='Facebook'>
              <Facebook className='text-blue-600' />
            </a>
            <a href='https://twitter.com' className='hover:text-gray-400' aria-label='Facebook'>
              <TwitterIcon className='text-blue-500' />
            </a>
            <a href='https://linkedin.com' className='hover:text-gray-400' aria-label='Facebook'>
              <Linkedin className='text-blue-600' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer