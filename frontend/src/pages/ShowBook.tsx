import {Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useMongoHook } from '../utils/MongoHook'
import Spinner from '../Spinner'


interface Book {
    title: string;
    author: string;
    publishYear: number;
}

const ShowBook = () => {
    const { id } = useParams()

    const {data, loading, error} = useMongoHook(`${id}`)

    if (loading) return <Spinner />;



  return (

    <div className='flex-col p-4'>
        <BackButton destination='/' />
        {
            loading ? <Spinner /> :
            (
                <div className=',-auto border space-y-4 border-sky-400 w-fit rounded-md shadow-md flex-col my-3 p-3'>
                    <h1 className="text-lg">Book Details: {id} </h1>
                    <h1 className="text-lg">Title: {data?.title}</h1>
                    <p className='text-md'>Author: {data?.author}</p>
                    <p className='text-md'>Publish Year: {data?.publishYear}</p>
                </div>


            )
        }


    </div>
  )
}

export default ShowBook