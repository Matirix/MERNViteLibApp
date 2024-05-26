import React, {useState, useEffect} from 'react'
import axios from 'axios'

export interface OLBook {
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


// Fetch Images by book cover id
export const fetchImagebyId = async (coverId: string, imageSize: string = 'M') => {
    const response = await axios.get(`https://covers.openlibrary.org/b/id/${coverId}-${imageSize}.jpg`)
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

// @desc Get's books from the OpenLibrary API
// @param searchTerm: string
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
                const imageUrl = await fetchImagebyId(book.cover_i);
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



// Fetch all the authors name from the OpenLibrary API
export const fetchAuthorData = async (authors: AuthorRole[]) => {
    const authorPromises = authors.map(async (authorObj: any) => {
        const response = await axios.get(`${baseLink}${authorObj.author.key}.json`);
        return response.data.name; // Assuming you need the data property from the response
    });
    const authorData = await Promise.all(authorPromises);
    return authorData
}

// Fetch all the authors name from the OpenLibrary API
export const fetchAuthors = async (authors: AuthorRole[]) => {
    const authorPromises = authors.map(async (authorObj: any) => {
        const response = await axios.get(`${baseLink}${authorObj.author.key}.json`);
        return response.data.name; // Assuming you need the data property from the response
    });
    const authorData = await Promise.all(authorPromises);
    return authorData
}

// @desc Get's Book from the OpenLibrary API by OLid
// @params OLid: string
// @params imageSize: string
export const useBookWorkHook = (OLid: string, imageSize: string = 'M') => {
    const [data, setData] = useState<OLBook>()
    const [imageData, setImageData] = useState<string>();
    const [authorData, setAuthorData] = useState<string[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null); // Error state to store error messages

    const fetchData = async () => {
        setLoading(true)
        try {
            const bookResponse = await axios.get( `${baseLink}/works/${OLid}.json`)
            const imageResponse = await fetchImagebyId(bookResponse.data.covers[0], imageSize)
            console.log(bookResponse)

            // console.log(imageResponse)
            setImageData(imageResponse)
            setData(bookResponse.data)
            console.log(bookResponse.data)

            // Map through the authors array and fetch data for each author
            const authorPromises = bookResponse.data.authors.map(async (authorObj: any) => {
                const response = await axios.get(`${baseLink}${authorObj.author.key}.json`);
                return response.data.name; // Assuming you need the data property from the response
            });

            const authors = await Promise.all(authorPromises);
            setAuthorData(authors)

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


interface FavouriteBook {
    title: string;
    olid: string; 
    imageUri: string;
    details: OLBook;
}

// Fetches the favourite books of the current user
export const useFetchFavourites = () => {
    const [favourites, setFavourites] = useState<FavouriteBook[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const favListResponse = await axios.post('/api/favBook/favourites', {}, { withCredentials: true });
            const favList = favListResponse.data.data;

            // Fetch additional book details for each favourite book
            // Fetching from the OpenLibrary API side to reduce memory space from the server 
            const books = await Promise.all(
                favList.map(async (book: FavouriteBook) => {
                    const response = await axios.get(`https://openlibrary.org/works/${book.olid}.json`);
                    return { ...book, details: response.data };
                })
            );
            setFavourites(books);
        } catch (error: any) {
            setError(error)
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return {favourites, loading, error}

}