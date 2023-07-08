'use client'
import React,{useState, useEffect} from 'react'
import Form from '../components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useCreatePrompt from '../lib/useCreatePrompt'
import { toast } from 'react-hot-toast'

export default function CreatePromptPage () {
  const [form, setForm] = useState<Prompt>({description:'', tag:''})
  const {data:session} = useSession()
  const router = useRouter()
  const createPrompt = useCreatePrompt(session?.user.id!, form)
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPrompt.mutate()
    }
    createPrompt.isLoading&&toast.loading(`Creating Prompt`,{id:'1'})
    createPrompt.isSuccess&&toast.dismiss('1')
    return (
    <Form
    type='create'
    form={form}
    setForm={setForm}
    submitting={createPrompt.isLoading}
    handleSubmit={handleSubmit}
    />
  )
}
