import React, {useState, useEffect} from 'react'
import Spinner from '../Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useLoginMutation} from '../slices/usersApiSlice.ts';
import { setCredentials } from '../slices/authSlice.ts';
import { toast } from 'react-toastify';
import { RootState } from '../store.ts';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading}] = useLoginMutation();
  const {userInfo} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const [form, setForm] = useState({
    email: '',
    password: ''
  })



  const handleFormSubmit = async (event:any) => {
    event.preventDefault();
    console.log(form.email, form.password)
    try {
      const res = await login({email: form.email, password: form.password}).unwrap();
      dispatch(setCredentials({...res}))
    } catch (error: any) {
      toast.error(error.data.message || 'An error occurred' )
    }
  }
  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow'>
                <h1 className='text-2xl font-bold text-center'>Login</h1>
                <form onSubmit={handleFormSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                        <input type='text' id='title' name='title' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, email: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='author' className='block mb-2 text-sm font-medium text-gray-900'>Author</label>
                        <input type='text' id='author' name='author' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, password: e.target.value})}/>
                    </div>
                    

                    <div className="flex flex-col space-y-2">

                      <button type='submit' className='btn'>
                          Login
                      </button>
                      <Link to="/register" className='btn'> Don't have one? Sign up! </Link>
                    </div>
                </form>
                {isLoading && <Spinner />}
            </div>
        </div>
  )
}

export default Login