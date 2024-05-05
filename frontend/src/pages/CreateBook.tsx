import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        author: '',
        publishYear: 0,
    });


    const handleFormSubmit = (event: any) => {
        event.preventDefault();  // Prevent the default form submit action
        setLoading(true);
        axios.post('http://localhost:5555/books', form)
            .then(response => {
                console.log(response);
                navigate('/');

                
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow'>
                <h1 className='text-2xl font-bold text-center'>Create Book</h1>
                <form onSubmit={handleFormSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                        <input type='text' id='title' name='title' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, title: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='author' className='block mb-2 text-sm font-medium text-gray-900'>Author</label>
                        <input type='text' id='author' name='author' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, author: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='publishYear' className='block mb-2 text-sm font-medium text-gray-900'>Publish Year</label>
                        <input type='number' id='publishYear' name='publishYear' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, publishYear: parseInt(e.target.value, 10)})}/>
                    </div>
                    <button type='submit' className='btn'>
                        Create Book
                    </button>
                </form>
                {loading && <Spinner />}
            </div>
        </div>
    );
}

export default CreateBook;
