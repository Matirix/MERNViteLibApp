import { useParams } from "react-router-dom"
import { useBooks } from '../utils/LibHooks'
import Spinner from "../Spinner"
import BookCard from "../components/BookCard"


const SearchPage = () => {
    const { id } = useParams()
    const {books, amount, loading, error} = useBooks(id || "")
    console.log(books)

    const isolateWorkKey = (key: string) => {
        return key.split("/")[2]
    }

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <>{error}</>
    }
    return (
        <div className="p-10 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">{amount} Search results for: {id}</h1>
          <div className="flex items-center justify-center flex-wrap gap-4">
            {books ? (
              books.map((book: any) => (
                <BookCard key={book.key} title={book.title} imageUri={book.imageUrl} olid={isolateWorkKey(book.key)} author={book.author_name} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      );
      
}

export default SearchPage