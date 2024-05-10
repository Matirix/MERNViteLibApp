import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>

  )
}

export default App
