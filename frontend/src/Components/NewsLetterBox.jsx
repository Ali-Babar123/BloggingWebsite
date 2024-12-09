





import React, {useEffect} from 'react'
import AOS from 'aos';
import "aos/dist/aos.css"

const NewsLetterBox = () => {

    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    useEffect(() => {
      AOS.init({ duration: 1500, once: true })
  }, [])
    
  return (
    <div data-aos='fade-down' className='text-center mt-44'>
        <p className='text-2xl font-medium text-gray-800'>GET IN TOUCH</p>
        <p className='text-gray-500 mt-3'>
            Lorem, ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      <form onClick={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input  className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' required />
        <button type='submit' className='bg-black  text-white text-sm px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox