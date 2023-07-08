import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

export default function useUpdatePrompt(creatorId: number | null, id: string, form: Prompt){
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async()=>{
            const tags = form.tag.replaceAll(' ','').toLowerCase()
                const res = await axios.patch(`http://localhost:3000/api/prompt/${id}`,{
                        description:form.description,
                        tag:tags,
                        creatorId:creatorId!
                    }
                ).then(
                    (res)=>{
                        return res.data.msg
                    }
                ).catch(
                    (err)=>{
                         toast.error(err.response.data,{id:'2',duration:1500})
                         return null
                    }
                )
            return res
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