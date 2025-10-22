import React from 'react'
import { assets } from '../../assets/assets.js'
import { StarIcon } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <>
      {/* Main Container: Changed to a two-column layout on large screens */}
      <div className='flex min-h-screen w-full flex-col lg:flex-row bg-gradient-to-br from-cyan-50 via-white to-orange-50'>

        {/* Left Pane: Contains the branding and text content */}
        <div className='flex flex-1 flex-col justify-center p-8 lg:p-16'>
          {/* Logo */}
          <div className='mb-12'>
            <img src={assets.logo} alt="Pingup Logo" className='h-10 object-contain' />
          </div>

          {/* Social Proof Section */}
          <div className='flex items-center gap-4 mb-4'>
            <img src={assets.group_users} alt="User avatars" className='h-10' />
            <div>
              <div className='flex'>
                {Array(5).fill(0).map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className='size-4 text-transparent fill-amber-500' 
                  />
                ))}
              </div>
              <p className='text-sm text-slate-600'>Used by 12k+ developers</p>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent leading-tight md:leading-snug'>
            More than just friends<br />truly connect
          </h1>
          
          {/* Subheading */}
          <p className='mt-4 text-xl md:text-2xl text-indigo-900 max-w-md'>
            connect with global community on pingup.
          </p>
        </div>

        {/* Right Pane: Contains the Clerk Sign-In form */}
        <div className='flex flex-1 items-center justify-center p-8'>
          <SignIn />
        </div>
        
      </div>
    </>
  );
}

export default Login