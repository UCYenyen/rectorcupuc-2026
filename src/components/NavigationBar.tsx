'use client'
import React from 'react'
import Link from 'next/link'
import GoogleLogin from './GoogleLogin'
import LogoutButton from './LogoutButton'
import { useSession } from "next-auth/react";
export default function NavigationBar() {
  const { data: session, status } = useSession();
  return (
    <nav className='flex min-h-[7vh] px-[6rem] bg-zinc-100 justify-between items-center w-screen overflow-hidden shadow-2xl'>
      <div className='text-2xl font-bold text-black'>RC</div>
      <div className='flex gap-1 sm:gap-4 text-black'>
        <Link href='/competitions' className='hover:underline'>Competitions</Link>
        <Link href='/votes' className='hover:underline'>Votes</Link>
        <Link href='/last-day' className='hover:underline'>Last Day</Link>

        {session ? (<><LogoutButton/></>) : (<GoogleLogin />)}
        
      </div>
    </nav>
  )
}
