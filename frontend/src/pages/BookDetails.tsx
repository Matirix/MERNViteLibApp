import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useBookWorkHook } from '../utils/LibHook';
import RatingSystem from '../components/RatingSystem';

const BookDetails = () => {

    const navigate = useNavigate();
    const { data, imageData, loading, authorData } = useBookWorkHook('OL45804W', 'L');
;


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='lg:w-3/4 md:w-3/4 p-8 space-y-4 bg-white rounded-lg shadow'>
                { loading ? <Spinner /> :
                    <div className="flex flex-col lg:flex-row">
                    {/* Left Side */}
                    <div className="lg:w-1/4">
                        <div className="space-y-3 flex flex-col items-center lg:items-start">
                            <img className="rounded-lg" src={imageData} alt="Book cover" />
                            <button className="btn w-full btn-primary">Add to Favorites</button>
                            <RatingSystem />
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
