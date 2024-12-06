// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
    
      const json = response.data;
      console.log(json);
    
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/api/blog/displayblog');
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error in fetching User:", error);
    }
    
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            />
          </div>
          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-orange-500 hover:underline">
              Forgot Your Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
