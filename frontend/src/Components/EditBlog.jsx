


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [content, setContent] = useState('');

    const [blog, setBlog] = useState({});
    

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await axiosInstance.get(`/api/blog/blog/${id}`)
                console.log(response.data)
                setBlog(response.data)
            } catch (error) {
                console.log('Error in Fetching the Blogs', error)
            }
        }
        getBlog()
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/api/blog/updateblog/${id}`, blog)
            navigate('/dashboard')
            toast.success('Blog Updated successfully');
        } catch (error) {
            console.log('Error in Editing the Blog', error)
            toast.error('Error in updating the Blog');
        }

    }
    const handleQuillChange = (value) => {
        setBlog({ ...blog, content: value })
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setBlog({ ...blog, image: files[0] });
        } else {
            setBlog({ ...blog, [name]: value });
        }
    };


    return (
        <div className="min-h-screen px-8 flex items-center justify-center">
            <div className="bg-white min-w-full p-8 m-10 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Update Blog</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Blog Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Title
                        </label>
                        <input
                            name='title'
                            type="text"
                            value={blog.title}
                            id="title"
                            placeholder="Enter blog title"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                            onChange={handleChange}
                        />
                        <label className="block text-sm mt-4 font-medium text-gray-600 mb-2">
                            Category
                        </label>
                        <input
                            name='category'
                            type="text"
                            id="category"
                            value={blog.category}
                            placeholder="Enter blog category"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Blog Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="content">
                            Content
                        </label>
                        <ReactQuill
                            name='content'
                            value={blog.content}
                            onChange={handleQuillChange}
                            placeholder="Write your blog content here..."
                            className="bg-white"
                            style={{ height: '200px' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 sm:mt-20 mt-28" htmlFor="image">
                         Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            value=""
                            className="w-full text-sm mt-2 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            onChange={handleChange}
                        />
                    </div>


                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 mt-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600"
                        >
                            Update Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBlog
