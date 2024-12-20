import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';


const AddBlog = ({ AuthorId }) => {
    // console.log(AuthorId)
    const navigate = useNavigate();
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    // const [image, setImage] = useState(null)



    const handleChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Category:', category);
        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        // formData.append('image', image);

        try {
            const response = await axiosInstance.post(
                `/api/blog/addblog/${AuthorId}`, // Ensure `AuthorId` is passed correctly
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            console.log(response);
            toast.success('Blog added successfully');
            navigate('/dashboard')

        } catch (error) {
            console.error('Error adding blog:', error);
            toast.error('Error in Adding Blog');
        }
    };


    return (
        <div className="min-h-screen px-8 flex items-center justify-center">
            <div className="bg-white min-w-full p-8 m-10 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Add New Blog</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Blog Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            name="title"
                            placeholder="Enter blog title"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label className="block text-sm mt-4 font-medium text-gray-600 mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled selected>
                                Select a Category
                            </option>
                            <option value="Technology">Technology</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="Travel">Travel</option>
                            <option value="Food & Recipes">Food & Recipes</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Finance & Investing">Finance & Investing</option>
                            <option value="Education & Learning">Education & Learning</option>
                            <option value="Fitness & Sports">Fitness & Sports</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Personal Development">Personal Development</option>
                        </select>

                    </div>

                    {/* Blog Content */}
                    <div>
                        <label className="block  text-sm font-medium text-gray-600 mb-2" htmlFor="content">
                            Content
                        </label>
                        <ReactQuill
                            value={content}
                            name="content"
                            onChange={handleChange}
                            placeholder="Write your blog content here..."
                            className="bg-white"
                            style={{ height: '150px' }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm  font-medium text-gray-600 sm:mt-20 mt-28" htmlFor="image">
                           Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        // onChange={(e) => { setImage(e.target.files[0]) }}

                        />
                    </div>


                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 mt-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600"
                        >
                            Add Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
