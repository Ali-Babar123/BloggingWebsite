import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
import LoginCheck from '../LoginCheck'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';
import BlogImage from '../assets/blog.jpeg'

const Dashboard = () => {
  const [blogs, setBlogs] = useState([])
  const [authorId, setAuthorId] = useState('')
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await LoginCheck()
        setAuthorId(result.user._id)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])


  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axiosInstance.get(`/api/blog/displayblog/${authorId}`)
        console.log(response.data)
        setBlogs(response.data || [])
      } catch (error) {
        console.log(error)
      }
    }
    getBlogs();
  }, [authorId, location])

  const handleDeleteBlog = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/blog/deleteblog/${id}`)
      console.log(response.data)
      setBlogs(blogs.filter((blog) => blog._id !== id))
      toast.error('Blog deleted successfully!',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
                      
      })
    } catch (error) {

      console.log('Error in Deleting the Blog', error)
      toast.error('Failed to delete the blog!',{

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        })

    }
  }
  const handleEditBlog = (id) => {
    // Navigate to edit blog page with the blog id
    console.log(id)
    navigate(`/editBlog/${id}`);
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <h1 className="text-5xl font-bold text-gray-600">Your Blogs</h1>
        <Link to="/addBlog">
        <button className="bg-orange-500 hover:bg-orange-600 py-3 px-6 text-white font-bold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
    Create a Blog
</button>

        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Image</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Title</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Category</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Description</th>
              <th className="text-left px-6 py-3 text-gray-700 font-medium">Date</th>
              <th className="text-center px-6 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b">
                <td className="px-6 py-4">
                  <img
                    src={BlogImage}
                    alt={blog.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />

                </td>
                <td className="px-6 py-4 text-gray-700">{blog.title}</td>
                <td className="px-6 py-4 text-gray-600">{blog.category}</td>
                <td className="px-6 py-4 text-gray-500">{blog.content.replace(/<[^>]+>/g, "").slice(0, 50)}...</td>
                <td className="px-6 py-4 text-gray-600">{new Date(blog.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}</td>
                <td className="px-6 py-8 flex justify-center gap-4">
                  <button className="text-blue-500 hover:text-blue-600" onClick={() => handleEditBlog(blog._id)}>
                    <FaEdit className="text-lg" />
                  </button>
                  <button className="text-red-500 hover:text-red-600" onClick={() => handleDeleteBlog(blog._id)}>
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
