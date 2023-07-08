import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function useProfile(id: string) {
    const {data, isLoading, isError} = useQuery({
        queryKey:['Profile', id],
        queryFn:async()=>{
          const user = await axios.get(`http://localhost:3000/api/user/${id}`)
          const userData: User = user.data
          return userData
        }
    })
    isError && toast.error(`Failed to fetch Data !`,{id:'2',duration:1500})
    return {data, isLoading}
}