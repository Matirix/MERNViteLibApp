import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.ts';
import { Provider } from 'react-redux';
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import './App.css'


import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute.tsx';
import UpdateProfile from './pages/UpdateProfile.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import BookDetails from './pages/BookDetails.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ViewFavourites from './pages/ViewFavourites.tsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/login" element={<Login/>} />
      <Route index={true} path="/register" element={<Register/>} />
      <Route path='' element={<PrivateRoute/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/search/:id" element={<SearchPage/>} />
        <Route path="/book/:id" element={<BookDetails/>} />
        <Route path="/profile" element={<UpdateProfile/>} />
        <Route path="/books/create" element={<CreateBook/>} />
        <Route path="/books/details/:id" element={<ShowBook/>} />
        <Route path="/books/edit/:id" element={<EditBook/>} />
        <Route path="/favourites" element={<ViewFavourites/>} />
      </Route>
    </Route>

));



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
