// import React from 'react';
import BlogImage from '../assets/blog.jpeg';
import AiImage from '../assets/Ai.jpeg'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/blog/displayblog')
            .then(response => {
                setBlogs(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error in fetching in Blogs', error);
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/blog/categories')
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error in fetching the categories', error);
            })

    }, [])
    useEffect(() => {
        AOS.init({ duration: 1500, once: true })
    }, [])

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 6 },
        desktop: { breakpoint: { max: 1536, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
        mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
    };



    return (
        <div>
            <div className=" home-section mx-auto">
                <div className="text-white text-center bg-black py-36">
                    <h1 data-aos='fade-down' className="text-5xl  flex justify-center lg:text-7xl font-bold p-4 ">Welcome to our Blogs</h1>
                    <p data-aos='fade-down' className='text-white font-semibold mt-4'>A blog is an informational website consisting of discrete, often informal diary-style text entries.Some quick example text to build on the card title and make</p>
                    <div className="learn-more mt-4 flex justify-center font-medium text-orange-500 items-center">
                        <Link to='/blog' className='flex border rounded-md p-3 text-white border-black  bg-orange-600'>Learn More  <FaArrowRight className='ml-2 text-white text-2xl' /></Link>
                    </div>
                </div>

                <h2 data-aos='fade-down' className='flex justify-center text-5xl font-bold mt-10'>Popular Categories</h2>

                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all 0.5s"
                    transitionDuration={500}
                    containerClass="carousel-container mt-12 mb-4 px-10"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-2-px" // Reduced padding
                >
                    {categories.length === 0 ? (
                        <p className="text-center text-gray-500 text-5xl font-bold">
                            No Categories Available.
                        </p>
                    ) : (
                        categories.map((category, index) => (
                            <div
                                key={index}
                                className="card w-40 h-40 md:w-48 md:h-48 rounded-full border shadow-md transition duration-300 transform hover:scale-105 bg-gray-300 relative overflow-hidden"
                            >
                                <img
                                    src={AiImage}
                                    alt={category}
                                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                                />
                                <div className="card-body absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full group">
                                    <h2 className="card-title text-white text-4xl sm:text-md md:text-lg font-bold">
                                        {category}
                                    </h2>
                                </div>
                            </div>
                        ))
                    )}
                </Carousel>



                <h2 data-aos='fade-down' className='flex justify-center text-5xl font-bold mt-16'>Our Latest Blogs</h2>
                <div className=" cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mt-16  px-12 ">
                    {blogs.length === 0 ? (
                        <p className="text-center text-gray-500 text-5xl font-bold">No Blogs Available.</p>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog._id} className="card border rounded-md bg-gray-300 shadow-md transition duration-300 transform hover:scale-105">
                                <img
                                    src={`http://localhost:3000/${blog.image}`}

                                    alt={blog.title}
                                    className="w-full h-48 object-cover rounded-t-md"
                                />
                                <div className="card-body p-4 text-left">
                                    <p className="text-gray-500 font-medium text-sm mb-3">
                                        {new Date(blog.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <h2 className="card-title text-xl font-bold mb-3">{blog.title}</h2>
                                    <p className="card-text text-gray-700 mb-4 text-left">
                                        {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...

                                    </p>
                                    <div className="read-more mt-2 flex justify-start items-start font-medium ">
                                        <Link to={`/viewBlog/${blog._id}`} className='flex  rounded-sm p-2 text-white bg-orange-500 hover:bg-orange-600'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>





            </div>
        </div>
    );
};

export default Home;
