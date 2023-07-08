'use client'
import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import usePrompts from '../lib/usePrompts';

function PromptCardList ({data, handleTagClick}:{data: Prompt[] | undefined, handleTagClick:(tag: string)=>void}){
  return(
    <motion.div
    transition={{
      staggerChildren:0.3,
    }}
    className='prompt_layout mt-16'
    >
      <AnimatePresence>
      {
        data && data.length>0?data.map((prompt, i)=>{
          return <PromptCard key={prompt.id} prompt={prompt} handleTagClick={handleTagClick} i={i}/>
        }):null
      }
      </AnimatePresence>
    </motion.div>
  )
}



export default function Feed() {
  const [searchVal, setSearchVal] = useState<string>('')
  const queryClient = useQueryClient()
  const {data, isLoading, isError, isSuccess} = usePrompts(searchVal)
  useEffect(()=>{
    if(sessionStorage.getItem('tag')){
      const searchValue = sessionStorage.getItem('tag')
      setSearchVal(searchValue!)
      queryClient.removeQueries(['Prompts']); queryClient.invalidateQueries(['Prompts'])
      sessionStorage.removeItem('tag')
    }
  },[])
  const handleTagClick =async (tag: string) => {
    setSearchVal(tag)
    window.scrollTo({
      top:0,
      left:0
    })
    queryClient.removeQueries(['Prompts']); queryClient.invalidateQueries(['Prompts'])
  }
  isLoading ? toast.loading(`Fetching Prompts...`,{id:'1'}):isSuccess? toast.dismiss('1'):
  isError && toast.error(`Failed To Fetch Prompts !`)
  return (
    <>
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type='text'
        placeholder='search for prompts, tags or users'
        required
        value={searchVal}
        onChange={(e)=>{setSearchVal(e.target.value);queryClient.removeQueries(['Prompts']); queryClient.invalidateQueries(['Prompts'])}}
        className='search_input peer placeholder:capitalize'
        />
      </form>
      <PromptCardList
      data = {data}
      handleTagClick = {handleTagClick}
      />
    </section>
    </>
  )
}