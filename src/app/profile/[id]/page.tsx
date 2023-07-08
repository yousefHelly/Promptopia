'use client'
import React,{useState, useEffect} from 'react'
import Profile from '@/app/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import useProfile from '@/app/lib/useProfile'
import Loading from './../../loading';
import useDeletePrompt from '@/app/lib/useDeletePrompt'

type Props = {
  params:{
    id: string
  }
}

export default function ProfilePage ({params:{id}}: Props) {
  const {data: session} = useSession()
  const [userData, setUserData] = useState<Partial<User>>({})
  const [myAccount, setMyAccount] = useState<boolean>(false)
  const {data, isLoading} =  useProfile(id)
  const deletePrompt = useDeletePrompt()
  const router = useRouter()
  const findUserData = ()=>{
    if(!isLoading && data){
      setUserData(data)
    }
  }
  useEffect(()=>{
    DefineUser()
    findUserData()
  },[data])  
    const handleEdit = (id: number)=>{
      router.push(`/update-prompt/${id}`)
    }
    const handleDelete = async(id: number)=>{
      deletePrompt.mutate(id)
    }
    const handleTagClick =async (tag: string) => {
      sessionStorage.setItem('tag', tag)
      router.push('/')
    }
    const DefineUser = ()=>{
      if(session?.user.id === +id){
        return setMyAccount(true)
      }
    }
    deletePrompt.isLoading&&toast.loading(`Deleting Prompt`,{id:'1'})
    deletePrompt.isSuccess&&toast.dismiss('1')
  return (
    <>
    <Profile
    name = {myAccount?'My': `${userData.username} 's`}
    desc = {`Hi, I’m ${userData.username} and I love creating prompts for all kinds of topics. Whether you need a spark for your writing, a challenge for your coding, or a fun way to learn something new, I have a prompt for you.
    so feel free to use my prompts. I hope you enjoy my prompts and have fun creating! 😊
    `}
    myAccount ={ myAccount }
    data = {userData!}
    handleEdit = {handleEdit}
    handleDelete = {handleDelete}
    handleTagClick = {handleTagClick}
    />
    {
      isLoading&& <Loading/>
    }
    <Toaster />
    </>
  )
}