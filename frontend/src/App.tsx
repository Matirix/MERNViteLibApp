import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import Header from './components/Header.tsx'

function App() {


  return (
    <>
      <ToastContainer />
      <Header/>
      <Outlet />
    </>

  )
}

export default App
