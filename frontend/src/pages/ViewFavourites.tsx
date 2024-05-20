import React, { useEffect, useState } from 'react'
import { useBookWorkHook } from '../utils/LibHooks'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import axios from 'axios'
import { toast } from 'react-toastify'

const ViewFavourites = () => {
    const userInfo = useSelector((state: RootState) => state.auth)
    const [data, setData] = useState({})

    useEffect(() => {
      const fetchData = async() => {
        try {
          const favList = await axios.post('/api/favBook/favourites', { withCredentials: true })
          console.log(favList.data)
          setData(favList.data)


        } catch (error: any) {
          console.log(error)
          toast.error('An error occurred')
        }
      }
      fetchData()

    }, [userInfo])


  return (
    <div className='p-6'>
      <h1 className='text-xl'>{`Favourites: ${data?.count}`}</h1>


    </div>
  )
}

export default ViewFavourites