import React, {useState} from 'react'
import Spinner from '../Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useRegisterMutation} from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading, error}] = useRegisterMutation();
  const userInfo = useSelector((state) => state.auth)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleFormSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const res = await register({email: form.email, password: form.password}).unwrap();
      dispatch(setCredentials({...res}))
      toast.success('Account created successfully')
      console.log(res);
      navigate('/')
    } catch (e){
      toast.error(e?.data.message)
    }
  }
  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow'>
                <h1 className='text-2xl font-bold text-center'>Create an Account</h1>
                <form onSubmit={handleFormSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                        <input type='text' id='title' name='title' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, email: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='author' className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                        <input type='text' id='author' name='author' required
                               className='w-full p-2 border border-gray-300 rounded-md'
                               onChange={(e) => setForm({...form, password: e.target.value})}/>
                    </div>
                    

                    <div className="flex flex-col space-y-2">
                      <button type='submit' className='btn'>
                          Login
                      </button>
                      <Link to="/" className='btn'> Already have an account? </Link>
                    </div>
                </form>
                {loading && <Spinner />}
            </div>
        </div>
  )
}

export default Register