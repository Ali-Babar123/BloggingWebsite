import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto p-8">
                {/* Header */}
                <h2 data-aos='fade-down' className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Contact Us
                </h2>

                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-white rounded-lg shadow-lg p-6 md:p-10 space-y-8 md:space-y-0">
                    {/* Contact Info */}
                    <div className="md:w-1/2 space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-700">
                            Get in Touch
                        </h3>
                        <p className="text-gray-600">
                            Have any questions? We'd love to hear from you. Feel free to reach out to<br></br> us using the form or the details below.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="bg-orange-500 text-white rounded-full p-3">
                                    <FaEnvelope className="text-lg" />
                                </span>
                                <span className="text-gray-600">email@example.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-orange-500 text-white rounded-full p-3">
                                    <FaPhoneAlt className="text-lg" />
                                </span>
                                <span className="text-gray-600">+123 456 7890</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-orange-500 text-white rounded-full p-3">
                                    <FaMapMarkerAlt className="text-lg" />
                                </span>
                                <span className="text-gray-600">
                                    123 Main Street, City, Country
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:w-1/2">
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    placeholder="Your Message"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
