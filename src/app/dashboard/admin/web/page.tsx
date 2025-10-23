import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div className='min-h-screen w-screen overflow-x-hidden flex flex-col justify-center items-center gap-4'>
        <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
        <Link href={"/"}>Registrations</Link>
        <Link href={"/"}>Competitions</Link>
    </div>
  )
}
