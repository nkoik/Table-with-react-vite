import { useState, useEffect } from 'react'
import { HttpService } from '@/services'

const http = new HttpService()

export const useGetRequest = <T>(endpoint: string) => {
  const [data, setData] = useState<T | never[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.service().get<T>(endpoint)
        setData(response)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoaded(true)
      }
    }
    fetchData()
  }, [endpoint])

  return { error, isLoaded, data }
}
