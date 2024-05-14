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
            <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow'>
                <h1 className='text-2xl font-bold text-center'>Show Book</h1>
                { loading ? <Spinner /> :
                    <div className="flex">
                        <div>
                            <h1>{data?.title}</h1>

                        </div>
                        <img src={imageData}></img>

                    </div>

                }

            </div>
        </div>
    );
}

export default BookDetails;
