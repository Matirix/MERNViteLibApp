import React, {useState, useEffect} from 'react'
import axios from 'axios'

interface Book {
    title: string,
    author: string,
    publishYear: number,
    id: string,
}

export const useMongoHook = (path: string) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get( `http://localhost:5555/books/${path}`)
            setData(response.data.data)
        } catch (error) {
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

    return {data, loading, refereshData}

}

export default useMongoHook