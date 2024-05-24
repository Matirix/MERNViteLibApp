import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { generateAuthorNames } from '../utils/strings';

interface BookCardProps {
  title: string;
  imageUri: string;
  olid: string;
  author: string | any[]; // For AuthorRole coming from OL and String[] coming from search results
}
const BookCard: React.FC<BookCardProps> = ({title, imageUri, olid, author=''}) => { 
  const authorNames = generateAuthorNames(Array.isArray(author) ? author : [author]);


  
  return (
    <Link to={`/book/${olid}`} key={olid}>
    <div className="card w-72 bg-base-100 shadow-xl" >
    <figure className="h-48 pt-3 rounded-lg">
        <img src={imageUri} alt={title} className="w-full h-full rounded-xl object-contain" />
    </figure>
    <div className="card-body items-center text-center">
        <p className="font-bold text-lg truncate w-full">{title}</p>
        <p className="text-sm truncate w-full">{authorNames}</p>
        <div className="card-actions">
        <button className="btn btn-outline btn-circle">
            <FaHeart className="text-xl text-red-500" />
        </button>
        </div>
    </div>
    </div>
  </Link>
  )
}

export default BookCard