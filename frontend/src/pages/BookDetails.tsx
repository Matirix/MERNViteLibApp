import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useBookWorkHook } from '../utils/LibHook';

const BookDetails = () => {

    const navigate = useNavigate();
    const { data, imageData, loading, authorData } = useBookWorkHook('OL45804W', 'L');
;


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='w-1/2 md:w-3/4 md:p-8 space-y-4 bg-white rounded-lg shadow'>
                { loading ? <Spinner /> :
                    <div className="flex flex-col lg:flex-row">
                        <div className='flex lg:flex-col sm:items-center md:flex-row space-x-4  sm:space-y-2'>
                            {/* Left Side */}
                            <div className='w-1/4 space-y-3 flex-col justify-center'>
                                <img className="rounded-lg"src={imageData}></img>
                                <button className='btn w-full btn-primary'>Add to Favourites</button>
                            </div>
                            {/* Right Side */}
                            <div className="flex flex-col items-start justify-start w-3/4 space-y-2 ">
                                {/* header */}
                                <div className="flex flex-col mb-3">
                                    <h1 className='text-2xl font-bold text-left'>{data?.title}</h1>
                                    <p className='text-lg italic'>{authorData}</p>
                                </div>
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
