


import {useState, useEffect} from 'react'
import AuhtorImage from '../assets/boy.jpeg'
import axios from 'axios'

const Author = () => {
    const [authors , setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/blog/authors')
        .then(response => {
            setAuthors(response.data);
            console.log(response.data)
            })
            .catch(error => {
                console.error('Error in fetching author', error);
            })
            }, []);
  return (
    <div>
                <h2 data-aos='fade-down' className='flex justify-center text-5xl font-bold mt-8'>Popular Authors</h2>
      
      <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 px-8 mt-16">
                    {authors.length === 0 ? (
                        <p className="text-center text-gray-500 text-5xl font-bold">No Author Available.</p>
                    ) : (
                        authors.map((author, index) => (
                            <div key={index} className="card border shadow-md transition duration-300 transform hover:scale-105 bg-gray-300 ">
                                <img
                                    src={AuhtorImage}
                                    alt={author}
                                    className="w-full h-72 object-cover rounded-t-md"
                                />
                                <div className="card-body p-4 text-center">
                                    <h2 className="card-title text-xl font-semibold mb-2">{author}</h2>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
    </div>
  )
}

export default Author
