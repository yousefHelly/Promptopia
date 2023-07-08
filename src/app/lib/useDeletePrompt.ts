import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function useDeletePrompt () {
    const clientQuery = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
          const {msg} = (await axios.delete(`http://localhost:3000/api/prompt/${id}`)).data
          return msg
        },
        onSuccess: (msg: string, vars: number)=> {
          clientQuery.invalidateQueries(['Profile'])
          clientQuery.removeQueries(['Prompt', vars])
          toast.success(msg,{id:'2',duration:1500})
        }
      })
}