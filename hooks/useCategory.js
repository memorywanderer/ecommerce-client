import useSWR from 'swr';
import axios from "axios"

const fetcher = (...args) => axios.get(...args).then((res) => res.data)


export const useCategory = () => {
  const { data, error, isLoading } = useSWR('http://localhost:3000/api/category', fetcher, {
    revalidateOnMount: false
  })

  return {
    categories: data,
    isError: error,
    isLoading
  }
}