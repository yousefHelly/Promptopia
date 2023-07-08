import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function useCreatePrompt(id: string, form: Prompt){
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ()=>{
        const tags = form.tag.replaceAll(' ','').toLowerCase()
        const res = await axios.post(`http://localhost:3000/api/prompt/new`,{
            creatorId:id,
            description:form.description,
            tag:tags})
            .then(
                (res)=>{
                    const {newPrompt, msg}:{newPrompt:Prompt ,msg:string} = res.data 
                    return {newPrompt, msg}
                }
            )
            .catch((err)=>{toast.error(err.response.data,{id:'2',duration:1500});return null})
        return res!.msg        
    },
    onSuccess:(msg)=>{
        if(msg){
            queryClient.invalidateQueries(['Prompts'])
            toast.success(msg!,{id:'2',duration:1500})
        }
        setTimeout(()=>router.push('/'),1500)
    }
})
}