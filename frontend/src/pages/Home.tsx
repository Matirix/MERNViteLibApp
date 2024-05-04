import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';


const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data)
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            }) 
    }, [])


  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className="text-3xl my-8">Books List</h1>
            <Link to='/books/create' className='btn btn-primary'><MdOutlineAddBox className='inline-block'/> Add Book</Link>
        </div>
        {
            loading ? <Spinner /> : 
            // Table
            ( 
                <div className='overflow-x-auto'>
                    {/* Header */}
                <table className='table'> 

                    <thead>
                        <tr>
                            <th className='border p-4'>ID</th>
                            <th className='border p-4'>Title</th>
                            <th className='border p-4'>Author</th>
                            <th className='border p-4'>Published</th>
                            <th className='border p-4 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book: any, index: number) => (
                                <tr key={book.id}>
                                    <td className='border p-4 text-white'>{index}</td>
                                    <td className='border p-4'>{book.title}</td>
                                    <td className='border p-4'>{book.author}</td>
                                    <td className='border p-4'>{book.publishYear}</td>
                                    <td className='flex-row justify-center items-center space-x-5 border p-4 '>
                                        <Link to={`/books/details/${book._id}`} className='btn btn-secondary'><BsInfoCircle className='inline-block'/> Show</Link>
                                        <Link to={`/books/edit/${book._id}`} className='btn btn-primary'><AiOutlineEdit className='inline-block'/> Edit</Link>
                                        <Link to={`/books/delete/${book._id}`} className='btn btn-danger'><MdOutlineDelete className='inline-block'/> Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


                </div>
            )
        }
    </div>
  )
}

export default Home