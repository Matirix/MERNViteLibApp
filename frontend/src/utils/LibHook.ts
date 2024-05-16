import React, {useState, useEffect} from 'react'
import axios from 'axios'

interface OLBook {
    title: string;
    key: string;
    authors: AuthorRole[];
    type: KeyType;
    description: string;
    covers: number[];
    subject_places: string[];
    subjects: string[];
    subject_people: string[];
    subject_times: string[];
    location: string;
    latest_revision: number;
    revision: number;
    created: DateTime;
    last_modified: DateTime;
}

interface AuthorRole {
    author: KeyType;
    type: KeyType;
}

interface KeyType {
    key: string;
}

interface DateTime {
    type: string;
    value: string;
}


export const useBookWorkHook = (OLid: string, imageSize: string) => {
    const [data, setData] = useState<OLBook>()
    const [imageData, setImageData] = useState<string>();
    const [authorData, setAuthorData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null); // Error state to store error messages


    // console.log(path)

    const fetchData = async () => {
        setLoading(true)
        try {
            const bookResponse = await axios.get( `https://openlibrary.org/works/${OLid}.json`)
            const imageResponse = await axios.get(`https://covers.openlibrary.org/b/id/${bookResponse.data.covers[0]}-${imageSize}.jpg`)
            setData(bookResponse.data)
            const author = await axios.get(`https://openlibrary.org${bookResponse.data.authors[0].author.key}.json`)
            setAuthorData(author.data.name)
            setImageData(imageResponse.config.url);
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

    return {data, imageData, authorData, loading, error, refereshData}

}
