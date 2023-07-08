'use client'
import Link from 'next/link'
import React from 'react'

export default function Form ({type, form, setForm, submitting, handleSubmit}: FormProps){
  return (
    <section className='w-full max-w-full flex justify-start flex-col mb-10'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient capitalize'>{type} Prompt</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} and share amazing prompts with the world, and let your imagination run wild with ant AI-powered platform.
        </p>
        <form 
        onSubmit={(e)=>handleSubmit(e)}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
            <label htmlFor="description">
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
            </label>
            <textarea 
            name="description" 
            id="description" 
            value={form.description}
            required
            placeholder='write your prompt here ...'
            className= 'form_textarea'
            onChange={(e)=>setForm({...form,description:e.target.value})}
            />
            <label htmlFor="tag">
                <span className='font-satoshi font-semibold text-base text-gray-700'>Tag
                <span className='font-normal'> (#Product, #webDevelopment, #idea)</span>
                </span>
            </label>
            <textarea 
            name="tag" 
            id="tag" 
            value={form.tag}
            required
            placeholder='#tag'
            className= 'form_input'
            onChange={(e)=>setForm({...form,tag:e.target.value})}
            />
            <div className='flex-end mx-3 mb-5 gap-4 text-gray-500'>
                <Link href='/'>
                    Cancel
                </Link>
                <button type='submit'
                className={`text-white ${submitting?'bg-gray-900':'bg-orange-500 hover:bg-orange-600'} transition duration-150 rounded-full capitalize font-normal px-4 py-2`}
                disabled={submitting}
                >
                    {
                        submitting?
                        `${type.endsWith('e')?type.slice(0,type.length-1):type}ing...`
                        :
                        `${type}`
                    }
                </button>
            </div>
        </form>
    </section>
  )
}