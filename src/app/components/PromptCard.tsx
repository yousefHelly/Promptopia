"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {AiFillDelete} from 'react-icons/ai'
import {BsPencilFill} from 'react-icons/bs'
import Copy from '../lib/Copy'
import { motion } from 'framer-motion';

export default function PromptCard ({prompt, image, username, email, userID, handleTagClick, handleEdit, handleDelete, i}: PromptCardProps) {
    const [copied, setCopied] = useState<string>('')
    const tags = prompt.tag.toLowerCase().split(',')
  return (
    <motion.article
    initial={{
        opacity:0,
        y:25
    }}
    whileInView={{
        opacity:1,
        y:0,
        transition:{
            delay:i*0.1
        }
    }}
    exit={{
        opacity:0,
        y:25
    }}
    viewport={{
        once:true,
        amount:0.5
    }}
    className='prompt_card'
    >
        <div className='flex justify-between items-center gap-5'>
            <Link href={`/profile/${prompt.creator?.id! || userID}`} className='flex justify-start items-center gap-3 cursor-pointer'>
                <Image
                src={prompt.creator?.image! || image!}
                alt='profile pic'
                width={40}
                height={40}
                className='rounded-full object-contain'
                />
            </Link>
            <div className='flex flex-col'>
                <h3 className='font-satoshi font-semibold text-gray-900'>{prompt.creator?.username || username}</h3>
                <p className='font-inter text-sm text-gray-500'>{prompt.creator?.email || email}</p>
            </div>
            <div className="copy_btn" onClick={()=>Copy(prompt, setCopied)}>
                <Image
                src={
                    copied === prompt.description
                    ?`/assets/icons/tick.svg`
                    :`/assets/icons/copy.svg`
                }
                width={20}
                height={20}
                alt='copy'
                />
            </div>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.description}</p>
        <div className='flex justify-start items-center gap-3'>
            {
                tags.map((tag, i)=>{
                    return <p key={i} onClick={()=>handleTagClick(tag)} className='font-inter text-sm blue_gradient cursor-pointer'>{tag}</p>
                })
            }
        </div>
        {
            handleDelete&&handleEdit?(
                <div className='flex items-center justify-center w-full self-center gap-3 my-3'>
                <button onClick={()=>handleEdit(prompt.id!)} className='flex items-center justify-center gap-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition duration-1500 text-white px-3 py-2 rounded-full '><BsPencilFill/>Update</button>
                <button onClick={()=>handleDelete(prompt.id!)} className='flex items-center justify-center gap-1 bg-gradient-to-r from-[#333333] to-[#dd1818] transition duration-1500 text-white px-3 py-2 rounded-full '><AiFillDelete/>Delete</button>
                </div>
            ):null
        }
    </motion.article>
  )
}