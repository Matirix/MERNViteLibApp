import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const ViewFavourites = () => {
    const userInfo = useSelector((state: RootState) => state.auth)
    console.log(userInfo)

  return (
    <div className='p-6'>


    </div>
  )
}

export default ViewFavourites