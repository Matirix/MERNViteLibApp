import React from 'react'
import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice';
const Header = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
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

    
  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
        <a className="btn btn-ghost text-xl">Booker</a>
    </div>
    <div className="flex-none">
        <ul className="menu menu-horizontal px-1">

        <li><a>{userInfo ? userInfo.email : <Link to={'/login'}>Login or Signup</Link>}</a></li>
        {
            userInfo ? 
            <li>
            <details>
            <summary>
                Options
            </summary>
            <ul className="p-2 bg-base-100 rounded-t-none">
                <li>                <button onClick={logoutHandler}>logout</button>
</li>
                <li>
                <Link to={'/profile'}>Profile</Link>

                </li>
            </ul>
            </details>
        </li> : null
        }
       
        </ul>
    </div>
    </div>
  )
}

export default Header