import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import BlogImage from '../assets/blog.jpeg'
import { Link } from 'react-router-dom';
// Function to capitalize each word in a string
const capitalize = (str) => {
    return str
        .split(' ') // Split string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
        .join(' '); // Join the words back together
};

const ViewBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await axiosInstance.get(`api/blog/blog/${id}`);
                console.log(response.data);
                setBlog(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getBlog();
    }, [id]);

    return (
        <div>
            {blog ? (
                <div className="flex flex-col">
                    {/* Blog Image */}
                    <img
                        src={BlogImage}
                        alt={blog.title}
                        className="w-full h-60 sm:h-80 md:h-96 object-cover rounded-t-md"
                    />
    
                    {/* Blog Content */}
                    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-44 py-10 sm:py-12 md:py-20">
                        {/* Breadcrumb */}
                        <div className="text-sm sm:text-base">
                            <Link to="/" className="text-orange-500 hover:text-orange-700">Home</Link>
                            <span className="mx-2 text-gray-500">/</span>
                            <Link to="/blogs" className="text-orange-500 hover:text-orange-700">Blogs</Link>
                            <span className="mx-2 text-gray-500">
                                / {blog.title}
                            </span>
                        </div>
    
                        {/* Blog Title */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-left">
                            {blog.title}
                        </h2>
    
                        {/* Author and Date */}
                        <p className="mt-4 text-sm sm:text-base text-gray-400 font-medium">
                            By: {capitalize(blog.author)} |{' '}
                            {new Date(blog.date).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </p>
    
                        {/* Social Media Links */}
                        <div className="flex justify-center md:justify-start space-x-4 mt-6">
                            <a
                                href="https://facebook.com"
                                className="text-gray-400 hover:text-blue-500"
                            >
                                <FaFacebook size={20} className="sm:w-6 sm:h-6" />
                            </a>
                            <a
                                href="https://twitter.com"
                                className="text-gray-400 hover:text-blue-400"
                            >
                                <FaTwitter size={20} className="sm:w-6 sm:h-6" />
                            </a>
                            <a
                                href="https://instagram.com"
                                className="text-gray-400 hover:text-pink-500"
                            >
                                <FaInstagram size={20} className="sm:w-6 sm:h-6" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                className="text-gray-400 hover:text-blue-700"
                            >
                                <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
                            </a>
                        </div>
    
                        <hr className="mt-6 border-gray-300" />
    
                        {/* Blog Content */}
                        <div
                            className="text-base sm:text-lg font-normal mt-8 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                    </div>
                </div>
            ) : (
                <h2 className="text-center text-xl sm:text-2xl md:text-7xl p-10 sm:p-16 md:p-24 text-gray-600 font-bold">
                    Loading...
                </h2>
            )}
        </div>
    );
}
export default ViewBlog;    