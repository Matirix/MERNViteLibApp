import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '../slices/usersApiSlice.ts'
import { logout } from '../slices/authSlice.ts';
import { RootState } from '../store.ts';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap(); // destroy the cookie
            dispatch(logout());
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = () => {
        if (search.trim() === '') {toast.error('Please enter a search term')}
        else navigate(`/search/${search}`)
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { 
        if (e.key === 'Enter') handleSearch()
    }




    
  return (
    <div className="navbar bg-base-100">
        {/* Left Side */}
    <div className="flex-1">
        <a className="btn btn-ghost text-xl">Booker</a>
    </div>


    <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
        <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleEnter(e)}/>
                    <button className='' onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </label>




        {/* DropDown */}
        <li>
            <a>{userInfo ? " " : <Link to={'/login'}>Login or Signup</Link>}</a></li>
        {
            userInfo ? 

            <li>
                <details>
                <summary className='m-auto p-auto'>
                    {userInfo.email}
                </summary>
                <ul className="p-3 bg-base-100 w-full rounded-t-none">
                    <li>
                        <Link to={'/favourites'}>Favourites</Link>
                    </li>
                    <li>                
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                    <li>
                        <Link to={'/profile'}>Profile</Link>
                    </li>
                </ul>
                </details>
            </li> 

        
        
        : null
        }
       
        </ul>
    </div>
    </div>
  )
}

export default Header