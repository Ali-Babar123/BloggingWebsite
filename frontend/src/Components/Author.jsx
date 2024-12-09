


import { useState, useEffect } from 'react'
import AuhtorImage from '../assets/Author1.jpeg'
import { FaSpinner } from 'react-icons/fa';

import axiosInstance from './axiosInstance';
import NewsLetterBox from './NewsLetterBox.jsx'


const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosInstance.get('/api/blog/authors')
      .then(response => {
        setAuthors(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error in fetching author', error);
        setLoading(false);
      })
  }, []);

  return (
    <div>
      <h2 data-aos='fade-down' className='flex justify-center text-5xl font-bold mt-12'>Popular Authors</h2>


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-gray-600 text-5xl" /> {/* Spinner icon */}
        </div>) : (
        <div className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-8 px-16 mt-14">
          {authors.length === 0 ? (
            <p className="text-center text-gray-500 text-5xl font-bold">No Author Available.</p>
          ) : (
            authors.map((author, index) => (
              <div
                key={index}
                className="card border shadow-md transition duration-300 transform hover:scale-105 bg-gray-300 rounded-md"
              >
                <img
                  src={AuhtorImage}
                  alt={author}
                  className="w-full h-72 object-cover rounded-t-md"
                />
                <div className="card-body p-4 text-center">
                  <h2 className="card-title text-xl font-semibold mb-2">Author: <span>{author.charAt(0).toUpperCase() + author.slice(1)}</span></h2>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <NewsLetterBox />
    </div>
  );
}
export default Author              
