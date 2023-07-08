'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { signOut, LiteralUnion, ClientSafeProvider, signIn, useSession, getProviders } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import Image from 'next/image';


export default function NavLogin ({setState}:{setState: (val: boolean)=>void }) {
    const {data: session} = useSession()
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
    useEffect(()=>{
        const setUpProviders =async () => {
            const res = await getProviders();
            setProviders(res)
        }
        setUpProviders()
    },[])
  return (
    <>
    {
        session?.user ? 
        <>
            <Link href='/create-prompt' onClick={()=>setState(false)} type='button' className='black_btn order-2 md:order-1'>Create Prompt</Link>
            <button onClick={()=>{signOut(); setState(false)}} type='button' className='outline_btn order-3 md:order-2'>Sign Out</button>
            <Link onClick={()=>setState(false)} className='mx-auto order-1 md:order-3' href={`/profile/${session.user.id}`}>
                <Image
                src={`${session?.user.image!}`}
                alt='User Profile'
                width='37'
                height='37'
                className='object-contain rounded-full'
                />
            </Link>
        </>:
        <>
        {
            providers&&Object.values(providers).map((provider, i)=>{
                return <>                
                    <button key={i} onClick={()=>signIn(provider.id)} type='button' className='outline_btn'>Sign In</button>
                </>
            })
        }
        </>
    }
    </>
  )
}