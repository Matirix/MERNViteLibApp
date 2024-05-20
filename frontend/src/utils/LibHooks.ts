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



// Helpers

// Isolates the Olid from the path
const isolateKey = (path: string) => {
    return path.split("/")[2]
}


// Fetch Images by Olid
const fetchImageByOLid = async (OLid: string, imageSize: string = 'M') => {
    const response = await axios.get(`https://covers.openlibrary.org/b/id/${OLid}-${imageSize}.jpg`)
    return response.config.url
}

interface FavBook {
    title: string;
    olid: string;
}

export const useFavBooks = (favBooksList: FavBook[]) => {
    const [favBooks, setFavBooks] = useState<OLBook[]>()
    
    useEffect(() => {
      const fetchData = async () => {
        try {
            const books = await Promise.all(favBooksList.map(async (book) => {
                const response = await axios.get(`${baseLink}/works/${book.olid}.json`)
                return response.data
            }))
            console.log(books)
            setFavBooks(books)
        } catch (error: any) {
            console.log(error)
        }
      }
      fetchData()
    }, [])

    return {favBooks}
    
}



// Book Interface
// used for useBooks
interface Book {
    cover_i: string;
    title: string;
    author_name: string[];
    imageUrl?: string;
  }

export const useBooks = (searchTerm: string) => {
    const [books, setBooks] = useState<Book[]>()
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null); // Error state to store error messages

    const searchTermQuery: string = searchTerm.split(' ').join('+')

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get( `${baseLink}/search.json?q=${searchTermQuery}&limit=5`)
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
            const imageResponse = await fetchImageByOLid(bookResponse.data.covers[0], imageSize)
            setImageData(imageResponse)
            setData(bookResponse.data)
            const author = await axios.get(`${baseLink}${bookResponse.data.authors[0].author.key}.json`)
            console.log(bookResponse.data.authors[0].author.key)
            setAuthorData(author.data.name)

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

