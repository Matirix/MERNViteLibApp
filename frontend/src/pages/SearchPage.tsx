import { useParams, Link } from "react-router-dom"
import React, {useState, useEffect} from 'react'
import { useBooks } from '../utils/LibHooks'
import Spinner from "../Spinner"
import { FaHeart } from "react-icons/fa"


const SearchPage = () => {
    const { id } = useParams()
    const {books, amount, loading, error} = useBooks(id || "")
    console.log(books)
    // title 
    // cover_ediition_key
    // author_name:  string[]
    // key: string (used for navigating to the page)


    const generateAuthorNames = (authors: string[]) => {
        if (authors.length > 1) {
            return authors.map((author, index) => {
                return <span key={index}>{author + ", "}</span>
            })
        } else {
            return <span>{authors[0]}</span>
        }
    }
    const isolateWorkKey = (key: string) => {
        return key.split("/")[2]
    }


    return (
        <div className="p-10 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">{amount} Search results for: {id}</h1>
          <div className="flex items-center justify-center flex-wrap gap-4">
            {books ? (
              books.map((book: any) => (
                <Link to={`/book/${isolateWorkKey(book.key)}`} key={book.key}>
                    <div className="card w-72 bg-base-100 shadow-xl" >
                    <figure className="h-48 pt-3 rounded-lg">
                        <img src={book.imageUrl} alt={book.title} className="w-full h-full rounded-xl object-contain" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <p className="font-bold text-lg truncate w-full">{book.title}</p>
                        <p className="text-sm truncate w-full">{generateAuthorNames(book.author_name)}</p>
                        <div className="card-actions">
                        <button className="btn btn-outline btn-circle">
                            <FaHeart className="text-xl text-red-500" />
                        </button>
                        </div>
                    </div>
                    </div>
                </Link>
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      );
      
}

export default SearchPage