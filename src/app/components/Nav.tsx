'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../logo.svg'
import { getProviders, LiteralUnion, ClientSafeProvider} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import {HiBars3BottomRight} from 'react-icons/hi2'
import Modal from './Modal'
import NavLogin from './NavLogin'

export default function Nav () {
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
    const [mobileNav, setMobileNav] = useState<boolean>(false)
    useEffect(()=>{
        const getResults = async()=>{
            const results = await getProviders()
            setProviders(results)
        }
        getResults()
    },[])
  return (
    <>
    <nav className='w-full flex flex-between pt-3 mb-16'>
        <Link className='flex flex-center gap-2' href='/'>
            <Image
            src={logo}
            alt='logo'
            width='30'
            height='30'
            className='object-contain'
            />
            <p className='logo_text'>Promptopia</p>
        </Link>
        {/* Desktop Navigation */}
        <div className='hidden gap-2 md:flex'>
            <NavLogin setState={setMobileNav}/>
        </div>
        {/* Mobile Navigation */}
        <div className='flex gap-2 md:hidden'>
            <HiBars3BottomRight onClick={()=>setMobileNav(true)} className='text-3xl hover:text-yellow-500 transition duration-150 cursor-pointer'/>
        </div>
    </nav>
    {/* Nav Modal */}
    <Modal state={mobileNav} setState={setMobileNav}/>
    </>
  )
}