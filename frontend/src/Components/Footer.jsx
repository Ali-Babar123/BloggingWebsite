import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-32">
        
        {/* Left Column - Blog Information */}
        <div className="footer-left text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">Blogs</h2>
          <p className="text-gray-400">
            A blog is an informational website consisting of discrete, often informal diary-style text entries.
          </p>
        </div>

        {/* Middle Column - Navigation Links */}
        <div className="footer-right text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to='/' className="hover:underline">Home</Link></li>
            <li><Link to='/blog' className="hover:underline">Blog</Link></li>
            <li><Link to='/author' className="hover:underline">Author</Link></li>
            <li><Link to='/contact' className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Right Column - Contact & Social Media */}
        <div className="footer-contact text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4">
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
        
      </div>

      {/* Footer Bottom Text */}
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
