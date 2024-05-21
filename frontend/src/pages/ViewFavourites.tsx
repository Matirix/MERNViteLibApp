import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { fetchImageByOLid, fetchImagebyId } from '../utils/LibHooks';

const ViewFavourites = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo); // Ensure correct access to userInfo
    const [favourites, setFavourites] = useState([]);
    const [bookImages, setBookImages] = useState([]); // Add a state to store book images
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(''); // Add an error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favListResponse = await axios.post('/api/favBook/favourites', {}, { withCredentials: true });
                const favList = favListResponse.data.data;

                // Fetch additional book details for each favourite book
                const books = await Promise.all(
                    favList.map(async (book) => {
                        const response = await axios.get(`https://openlibrary.org/works/${book.olid}.json`);
                        return { ...book, details: response.data };
                    })
                );
                
                setFavourites(books);
                setLoading(false);
            } catch (error: any) {
                console.log(error);
                setError('An error occurred while fetching favorites');
                toast.error('An error occurred while fetching favorites');
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchData();
        }
    }, [userInfo]);

    if (loading) {
        return <div><Spinner/></div>; // Display loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    return (
        <div className='p-6'>
            <h1 className='text-xl'>{`Favourites: ${favourites.length}`}</h1>
            <ul>
                {favourites.map((book) => (
                    <li key={book?.olid}>
                        <img src={book?.imageUri} alt={book?.title} />
                        <h2>{book?.title}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewFavourites;
