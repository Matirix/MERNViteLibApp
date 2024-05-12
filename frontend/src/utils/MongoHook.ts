import React, {useState, useEffect} from 'react'
import axios from 'axios'

interface Book {
    title: string,
    author: string,
    publishYear: number,
    id: string,
}

export const useMongoHook = (path: string) => {
    const [data, setData] = useState<Book>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null); // Error state to store error messages


    // console.log(path)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get( `http://localhost:5555/api/books/${path}`)
            setData(response.data.data)
        } catch (error: any) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const refereshData = () => {
        fetchData()
    }

    return {data, loading, error, refereshData}

}

export default useMongoHook