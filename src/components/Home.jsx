
import { FaUser, FaHeart, FaCommentAlt, FaPlus, FaBell } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    
  const posts = [
    { id: 1, name: "John Doe", date: "Nov 11, 2025", comments: 21, likes: 213 },
    { id: 2, name: "Jane Smith", date: "Nov 10, 2025", comments: 18, likes: 150 },
    { id: 3, name: "Alex Ray", date: "Nov 9, 2025", comments: 30, likes: 321 },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b bg-white/80 backdrop-blur-md px-6 py-3 shadow-sm sticky top-0 z-50">
        <div className="w-32 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">🔍</span>
          </div>

          <a href="#" className="text-gray-700 hover:text-purple-600 transition">Home</a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition">About</a>

          <button className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 rounded-lg hover:shadow-md transition" onClick={navigate('/createBlog')}>
            <FaPlus /> Create
          </button>

          <FaBell className="text-xl text-gray-600 hover:text-purple-600 cursor-pointer transition" />

          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 transition">
            <FaUser />
          </div>
        </div>
      </nav>

      {/* Posts */}
      <div className="max-w-5xl mx-auto mt-8 space-y-6 px-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:flex-row justify-between items-start border rounded-2xl p-5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Left content */}
            <div className="flex-1">
              <div className="bg-gradient-to-r from-purple-200 to-blue-200 h-32 rounded-xl mb-4 animate-pulse"></div>

              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <FaCommentAlt className="text-purple-500" />
                  <span>{post.comments}</span>
                  <span>Comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{post.likes}</span>
                  <FaHeart className="text-pink-500" />
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="md:w-1/4 w-full md:pl-6 md:border-l border-gray-200 mt-4 md:mt-0 flex flex-col justify-center items-start">
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-purple-600 text-lg" />
                <span className="font-semibold text-gray-800">{post.name}</span>
              </div>
              <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-lg shadow-sm">
                {post.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}