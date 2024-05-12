import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice.ts';
import { useUpdateMutation } from '../slices/usersApiSlice';
import Spinner from '../Spinner';

const UpdateProfile = () => {
    // Used for getting stuff
    const userInfo = useSelector((state) => state.auth)
    // Used for changing stuff
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
      })
    const [update, {isLoading}] = useUpdateMutation();


    const handleFormSubmit = async (event:any) => {
    event.preventDefault();
    console.log(form.email, form.password)
        try {
            const res = await update({email: form.email, password: form.password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
            
        } catch (error) {
            toast.error(error?.data.message)
        }
    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
    <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow'>
        <h1 className='text-2xl font-bold text-center'>Update User Profile</h1>
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
                  Update
              </button>
            </div>
        </form>
        {isLoading && <Spinner />}
    </div>
</div>  )
}

export default UpdateProfile