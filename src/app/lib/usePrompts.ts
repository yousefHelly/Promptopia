import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function usePrompts (searchVal: string) {
    const {data, isLoading, isError, isSuccess} = useQuery({
        queryKey:['Prompts'],
        queryFn: async ()=>{
            const searchValWithoutHashtag = searchVal.replace('#', '')
            const res = await axios.get(`/api/prompt?search=${searchValWithoutHashtag}`)
            const  prompts = res.data
            return prompts as Prompt[]
        }
        })
    return {data, isLoading, isError, isSuccess}
}