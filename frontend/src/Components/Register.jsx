import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/auth/createuser', {
        username,
        email,
        password,
      });
      console.log(response)
      const json = response.data; // Axios automatically parses the response
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/dashboard');
        setLoading(false)
      } else {
        alert(json.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error in registration:", error);
      alert("An error occurred. Please try again later.");
    }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center flex-col items-center bg-gray-100 min-h-screen">
        <h1 className='mb- text-5xl font-bold text-orange-500' >Welcome to Blog Sphere! <span className='flex mb-10 flex-col text-4xl items-center sm:items-center text-gray-700'></span></h1>
      <div className="w-full max-w-md p-8 bg-white border rounded-sm ">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={credentials.username}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="text-center">
            <Link to="/login" className="text-sm text-orange-500 hover:underline">
              Already have an account? Log in
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
