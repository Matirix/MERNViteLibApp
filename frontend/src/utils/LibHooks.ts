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

const baseLink: string = "https://openlibrary.org"


export const fetchImageByOLid = async (OLid: string, imageSize: string = 'M') => {
    const response = await axios.get(`https://covers.openlibrary.org/b/id/${OLid}-${imageSize}.jpg`)
    return response.config.url
}

export const useBooks = (searchTerm: string) => {
    const [books, setBooks] = useState()
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null); // Error state to store error messages

    const searchTermQuery: string = searchTerm.split(' ').join('+')

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get( `${baseLink}/search.json?q=${searchTermQuery}&limit=5`)
            // setBooks(response.data.docs)

            const imagePromises = response.data.docs.map(async (book: any) => {
                const imageUrl = await fetchImageByOLid(book.cover_i);
                return { ...book, imageUrl }; // Merge book data with image URL
            });
            // Wait for all image requests to complete
            const booksWithImages = await Promise.all(imagePromises);
            setBooks(booksWithImages);

            setAmount(response.data.numFound)
        } catch (error: any) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    // Authorname

    useEffect(() => {
        fetchData()
    }, [searchTerm])

    return {books, amount, loading, error}
}


export const useBookWorkHook = (OLid: string, imageSize: string = 'M') => {
    const [data, setData] = useState<OLBook>()
    const [imageData, setImageData] = useState<string>();
    const [authorData, setAuthorData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null); // Error state to store error messages

    const fetchData = async () => {
        setLoading(true)
        try {
            const bookResponse = await axios.get( `${baseLink}/works/${OLid}.json`)
            const imageResponse = await axios.get(`https://covers.openlibrary.org/b/id/${bookResponse.data.covers[0]}-${imageSize}.jpg`)
            setData(bookResponse.data)
            const author = await axios.get(`${baseLink}${bookResponse.data.authors[0].author.key}.json`)
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

