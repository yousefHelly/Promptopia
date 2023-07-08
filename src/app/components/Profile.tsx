import React from 'react'
import PromptCard from './PromptCard'
import Link from 'next/link'
type Props = {
    name: string,
    desc: string,
    data: Partial<User>,
    myAccount: boolean,
    handleEdit: (id: number)=>void, 
    handleDelete: (id: number) => Promise<void>,
    handleTagClick: (val: string)=>void
}

export default function Profile ({name, desc, data, myAccount, handleEdit, handleDelete, handleTagClick}: Props){
  return (
    <section className='w-full flex flex-col'>
        <h1 className='capitalize head_text text-left'>
            <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-sm'>{desc}</p>
        <div className='prompt_layout mt-16'>
            {
                data.prompts&&data.prompts.length>0?data.prompts.map((prompt, i)=>{
                return <PromptCard
                        key={prompt.id}
                        image={data.image} 
                        username={data.username} 
                        email={data.email} 
                        userID={data.id+''} 
                        prompt={prompt}
                        handleEdit={myAccount?handleEdit:undefined}
                        handleDelete={myAccount?handleDelete:undefined}
                        handleTagClick = {handleTagClick}
                        i={i}
                        />
                }):
                <div className='flex flex-col items-center justify-center gap-3 w-full'>
                    <p className='text-md font-bold desc capitalize'>you haven&apos;t created prompts yet.</p>
                    <br/>
                    <Link className='outline_btn' href='/create-prompt'>Create New</Link>
                </div>
            }
        </div>
    </section>
  )
}