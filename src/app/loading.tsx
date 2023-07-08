import Image from 'next/image'
import React from 'react'
import loader from './loader.svg'
type Props = {}

export default function Loading({}: Props) {
  return (
    <div className='fixed inset-0 w-screen h-screen flex items-center justify-center bg-slate-500/25 backdrop-blur-2xl z-40'>
        <div className='bg-slate-50 w-24 h-24 rounded-md shadow-md flex items-center justify-center'>
            <Image
            src={loader}
            alt='loading'
            width={40}
            height={40}
            />
        </div>
    </div>
  )
}