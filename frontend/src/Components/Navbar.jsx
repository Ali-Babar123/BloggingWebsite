import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import LoginCheck from '../LoginCheck';
import { FaUserCircle } from "react-icons/fa"

const Navbar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const result = await LoginCheck();
      setUsername(result.user?.name || '');
      setIsLoggedIn(result.loggedIn);
    };
    getUser();
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blogs" },
    { to: "/author", label: "Author" },
    { to: "/contact", label: "Contact" },
  ];

  const Logout = () => handleLogout();

  return (
    <div>
      <nav className="bg-black shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Brand Logo */}
          <Link to="/" className="text-3xl font-bold text-orange-500">
            Blogs
          </Link>

          {/* Centered Author Dashboard */}
          {isLoggedIn && (
            <h2 className="text-4xl font-bold text-orange-500 hidden md:block absolute left-1/2 transform -translate-x-1/2 lg:text-3xl">
              Author Dashboard
            </h2>
          )}

          {/* Toggle Button for Mobile */}
          <button
            className="lg:hidden text-orange-500 focus:outline-none ml-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
          </button>

          {/* Desktop Links */}
          {!isLoggedIn && (
            <div className="hidden lg:flex space-x-9">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-2xl font-bold hover:underline decoration-orange-400 text-orange-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4 pt-1">
            {isLoggedIn ? (
              <>
                <span className="text-lg font-semibold text-orange-500">{username}</span>
                {/* <FaUserCircle className="w-8 h-8 text-orange-500" /> */}
                <button
                  onClick={Logout}
                  className="text-lg px-4 py-2 font-medium text-white bg-orange-500 rounded-sm hover:bg-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg px-3 py-2 font-medium text-white bg-orange-500 rounded-sm hover:bg-orange-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-lg px-3 py-2 font-medium text-white bg-orange-500 rounded-sm hover:bg-orange-600"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden flex flex-col items-center space-y-4 p-4 bg-black border-t border-gray-200">
            {!isLoggedIn &&
              navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xl font-bold hover:underline decoration-orange-400 text-orange-500"
                >
                  {link.label}
                </Link>
              ))}
            {isLoggedIn ? (
              <>
                <span className="text-xl font-semibold text-orange-500">{username}</span>
                <button
                  onClick={Logout}
                  className="text-lg px-4 py-2 font-medium text-white bg-orange-500 rounded-sm hover:bg-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg px-3 py-2 font-medium text-white bg-orange-500 border rounded-sm hover:bg-orange-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-lg px-3 py-2 font-medium text-white bg-orange-500 border rounded-sm hover:bg-orange-600"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
