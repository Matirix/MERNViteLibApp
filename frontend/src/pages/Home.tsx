import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../Spinner'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox} from 'react-icons/md';
import axios from 'axios';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';


const Home = () => {
    const navigate = useNavigate()

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const userInfo = useSelector((state) => state.auth)
    useEffect(() => {
        setLoading(true);
        if (!userInfo || Object.keys(userInfo).length === 0) {
            console.log("No user info found, navigating to login...");
            navigate('/login');
            return;
        }

        axios.get('http://localhost:5551/api/books')
            .then((response) => {
                setBooks(response.data.data)
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            }) 
    }, [userInfo, navigate])

    const deleteBook = (id: string) => { 
        // console.log(id)
        axios.delete(`http://localhost:5555/books/${id}`)
            .then((response) => {
                console.log(response)
                setBooks(books.filter((book: any) => book._id !== id))
            })
            .catch((error) => {
                console.log(error)
            })
    }


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
                                <tr key={book._id}>
                                    <td className='border p-4 text-white'>{index}</td>
                                    <td className='border p-4'>{book.title}</td>
                                    <td className='border p-4'>{book.author}</td>
                                    <td className='border p-4'>{book.publishYear}</td>
                                    <td className='flex-row justify-center items-center space-x-5 border p-4 '>
                                        <Link to={`/books/details/${book._id}`} className='btn btn-secondary'><BsInfoCircle className='inline-block'/> Show</Link>
                                        <Link to={`/books/edit/${book._id}`} className='btn btn-primary'><AiOutlineEdit className='inline-block'/> Edit</Link>
                                        <Modal bID={book._id} title={book.title} onClick={() => deleteBook(book._id)}>
                                            Are you sure you want to delete this {book.title}?
                                            {/* <button type="button" className="btn btn-secondary" onClick={() => deleteBook(book._id)}> <MdOutlineDelete className='inline-block'/> Delete</button> */}
                                        </Modal>
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