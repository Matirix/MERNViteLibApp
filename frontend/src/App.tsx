import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'

import ShowBook from './pages/ShowBook'


import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'

function App() {


  return (
    <>
    <ToastContainer />
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route index={true} path="/login" element={<Login/>} />
      <Route index={true} path="/register" element={<Register/>} />
      <Route path="/books/create" element={<CreateBook/>} />
      <Route path="/books/details/:id" element={<ShowBook/>} />
      <Route path="/books/edit/:id" element={<EditBook/>} />
    </Routes>
    </>

  )
}

export default App
