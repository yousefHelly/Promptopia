import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function usePrompt(id: string){
    return useQuery({
        queryKey:['Prompt', id],
        queryFn: async()=>{
          const {description, tag} = (await axios.get(`http://localhost:3000/api/prompt/${id}`)).data
          return {description, tag}
        }
      })
}