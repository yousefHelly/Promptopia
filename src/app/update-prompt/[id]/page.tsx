'use client'
import React,{useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/app/components/Form';
import usePrompt from '@/app/lib/usePrompt';
import useUpdatePrompt from '@/app/lib/useUpdatePrompt';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';

export default function UpdatePromptPage ({params:{id}}:{params: {id: string}}) {
  const [form, setForm] = useState<Prompt>({description:'', tag:''})
  const {data:session} = useSession()
  const {data, isLoading, isError, isSuccess} = usePrompt(id)
  const mutatePrompt = useUpdatePrompt(session?.user.id, id, form)
  useEffect(()=>{
    if(data&&isSuccess){
      setForm(data as Prompt)
    }
  },[data])
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutatePrompt.mutate()
}
  mutatePrompt.isLoading&&toast.loading(`Updating Prompt`,{id:'1'})
  mutatePrompt.isSuccess&&toast.dismiss('1')
  if(isError) return <h1 className='mx-auto items-center head_text'>Prompt Not Found</h1>
    return (
    <>
    <Form
    type='edit'
    form={form}
    setForm={setForm}
    submitting={mutatePrompt.isLoading}
    handleSubmit={handleSubmit}
    />
    {
      isLoading&&<Loading/>
    }
    </>
  )
}