import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import axios from 'axios';
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
                const response = await axios.get(`http://localhost:3000/api/blog/blog/${id}`);
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
                <div className='flex flex-col'>
                    <img
                        src={`http://localhost:3000/${blog.image}`}

                        alt={blog.title}
                        className="w-full h-96 object-cover rounded-t-md"
                    />
                    <div className='px-44 py-20'>
                        <Link to="/" className="text-orange-500 hover:text-orange-700">Home</Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <Link to="/blogs" className="text-orange-500 hover:text-orange-700">Blogs</Link>
                        <span className="mx-2 text-gray-500"> / {blog.title}
                        </span>
                        
                        <h2 className='text-5xl text-left font-bold mt-4'>{blog.title}</h2>
                        <p className='mt-8 ml-1 text-md font-semibold text-gray-400'>
                            By : {capitalize(blog.author)} | {new Date(blog.date).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </p>
                        <div className="footer-contact text-center md:text-left mt-4">
                            <div className="flex justify-center md:justify-start space-x-3">
                                <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500">
                                    <FaFacebook size={24} />
                                </a>
                                <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500">
                                    <FaInstagram size={24} />
                                </a>
                                <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700">
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>
                        <hr className='mt-4' />
                        <div className='text-lg font-semibold mt-8' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </div>
                </div>
            ) : (
                <h2 className='text-center text-7xl p-24 text-gray-600 font-bold'>Loading...</h2>
            )}
        </div>
    );
};

export default ViewBlog;
