import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useBookWorkHook } from '../utils/LibHooks';
import RatingSystem from '../components/RatingSystem';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { toast } from 'react-toastify';

const BookDetails = () => {
    const { id } = useParams();
    const { data, imageData, loading, authorData } = useBookWorkHook(id || '', 'L');
    const [favLoading, setFavLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    // const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const addToFavourites = async() => {
        setFavLoading(true);
        try {
            const favBook = await axios.post('/api/favBook/', {
                title: data?.title,
                olid: id,
            }, { withCredentials: true })
            toast.success(favBook.data.message)
        } catch (error: any) {         
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setFavLoading(false);
        }
    }

    useEffect(() => {
        const getFavBook = async () => {
            try {
                const favBook = await axios.get(`/api/favBook/${id}`, { withCredentials: true })
                console.log(favBook)
            } catch (error: any) {
                console.log(error)
            }
        }
        getFavBook()

    }, [id])



    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='lg:w-3/4 md:w-3/4 p-8 space-y-4 bg-white rounded-lg shadow'>
                { loading ? <Spinner /> :
                    <div className="flex flex-col lg:flex-row">
                    {/* Left Side */}
                    <div className="lg:w-1/4 flex flex-col">
                        <div className="space-y-3 flex flex-col items-center lg:items-start">
                            <img className="rounded-lg" src={imageData} alt="Book cover" />
                            {
                                favLoading ? <Spinner /> : <button className="btn w-full btn-primary" onClick={addToFavourites}>Add to Favorites</button>

                            }
                            <div className="m-auto">
                                <RatingSystem />
                            </div>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="lg:w-3/4 lg:ml-4">
                        <div className="flex flex-col space-y-2">
                            {/* Header */}
                            <div className="mb-3">
                                <h1 className="text-2xl font-bold">{data?.title}</h1>
                                <p className="text-lg italic">{authorData}</p>
                            </div>
                            {/* Description */}
                            <p className="text-sm">{data?.description}</p>
                        </div>
                    </div>
                </div>
                }

            </div>
        </div>
    );
}

export default BookDetails;
