import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './Components/axiosInstance';
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
import React, { useEffect, useState } from 'react';
import LoginCheck from './LoginCheck';
import AddBlog from './Components/AddBlog';
import EditBlog from './Components/EditBlog';
import ViewBlog from './Components/ViewBlog';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get('/api/check-login'); // Example endpoint for checking login
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setAuthorId(response.data.user._id);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error in LoginCheck:", error);
        toast.error("Failed to verify login. Please try again.");
      }
    };
    getUser();
  }, [location]);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsLoggedIn(false);
  };

  const isLoginPageOrSignUpPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isLoginPageOrSignUpPage && <Navbar handleLogout={handleLogout} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addBlog" element={<AddBlog AuthorId={authorId} />} />
            <Route path="/editBlog/:id" element={<EditBlog />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/author" element={<Author />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/viewBlog/:id" element={<ViewBlog />} />
          </>
        )}
        <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback route */}
      </Routes>
      {!isLoginPageOrSignUpPage && <Footer />}
      <ToastContainer />
    </>
  );
};

export default App;
