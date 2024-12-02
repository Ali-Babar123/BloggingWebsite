// App.jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Blog from './Components/Blog';
import Author from './Components/Author';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dasboard';
import React, { useEffect, useState } from 'react'
import LoginCheck from './LoginCheck'
import AddBlog from './Components/AddBlog';
import EditBlog from './Components/EditBlog';
import ViewBlog from './Components/ViewBlog';




const AppContent = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authorId, setAuthorId] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await LoginCheck()
        if (result.loggedIn) {
          setIsLoggedIn(true)
          if (isLoggedIn) {
            setAuthorId(result.user._id)
          }
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/');
    setIsLoggedIn(false);
  }
  const isLoginPageOrSignUpPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isLoginPageOrSignUpPage && <Navbar handleLogout={handleLogout} />}
      {isLoggedIn ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/addBlog' element={<AddBlog AuthorId={authorId} />}></Route>
          <Route exact path='/editBlog/:id' element={<EditBlog />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/author' element={<Author />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/viewBlog/:id' element={<ViewBlog />} />

        </Routes>
      )
      }
      {!isLoginPageOrSignUpPage && <Footer />}
      <ToastContainer /> 
    </>

  );
};


const App = () => {
  return (
    <>
      <AppContent />
      <ToastContainer/>
    </>
  );
};

export default App;
