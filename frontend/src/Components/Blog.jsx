import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogImage from '../assets/blog.jpeg';
import NewsLetterBox from './NewsLetterBox.jsx';
import axiosInstance from './axiosInstance';
import { FaSpinner } from 'react-icons/fa';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axiosInstance.get('/api/blog/displayblog')
      .then(response => {
        setBlogs(response.data);
        setLoading(false); // Turn off loading once data is fetched
      })
      .catch(error => {
        console.error('Error in fetching Blogs', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 data-aos='fade-down' className='flex justify-center text-5xl mt-10'>My Blogs</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-gray-600 text-5xl" /> {/* Spinner icon */}
      </div>
      ) : (
        <div className="cards-container h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center mt-14 px-10">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 text-5xl font-bold">No Blogs Available.</p>
          ) : (
            blogs.map((blog, index) => {
              
              const isLargeCard = (index + 1) % 4 === 1; // 4n-3 condition

              return (
                <div
                  key={blog._id}
                  className={`card-item border h-full transition duration-300 transform hover:scale-105 bg-gray-300 shadow-md ${isLargeCard ? 'lg:col-span-2 sm:col-span-1' : 'col-span-1'}`}
                >
                  <img
                    src={BlogImage}
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
                    <div className="read-more mt-2 flex justify-start items-start font-medium">
                      <Link to={`/viewBlog/${blog._id}`} className='flex rounded-sm p-2 text-white bg-orange-500 hover:bg-orange-600'>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      <NewsLetterBox />
    </div>
  );
}

export default Blog;
