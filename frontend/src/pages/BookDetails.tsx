import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useBookWorkHook } from '../utils/LibHook';

const BookDetails = () => {

    const navigate = useNavigate();
    const { data, imageData, loading, } = useBookWorkHook('OL45804W', 'L');
;


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='w-1/2 p-8 space-y-4 bg-white rounded-lg shadow'>
                { loading ? <Spinner /> :
                    <div className="flex-col">
                        <div className='flex sm:flex-col md:flex-row space-x-2  sm:space-y-2'>
                            <div className='w-1/2'>
                                <img className="rounded-lg"src={imageData}></img>
                            </div>
                            <div className="w-1/2 flex-col space-y-2 ">
                                <h1 className='text-2xl font-bold text-left mb-3'>{data?.title}</h1>
                                <p className='text-md'>Author: {data?.authors.map((names) => {
                                    return names.author + ' '
                                })}</p>
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
