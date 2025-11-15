import { FaUser, FaHeart, FaCommentAlt, FaPlus, FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../redux/slices/articleSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { articles, status, error } = useSelector((state) => state.articles);
  const [showLogout, setShowLogout] = useState(false);
  console.log(articles);
  

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    window.location.href = "/login";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const articleList = Array.isArray(articles) ? articles : [];
  console.log(articleList)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 text-gray-800 font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b bg-white/80 backdrop-blur-md px-6 py-3 shadow-sm sticky top-0 z-50">
        <div className="w-32 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 hover:text-purple-600 cursor-pointer">Home</span>
          <span className="text-gray-700 hover:text-purple-600 cursor-pointer">About</span>

          <button
            onClick={() => navigate("/create-article")}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 rounded-lg hover:shadow-md transition"
          >
            <FaPlus /> Create
          </button>

          <button
            onClick={() => setShowLogout(true)}
            className="px-6 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 hover:scale-105"
          >
            Logout
          </button>

          {showLogout && (
            <Logout onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
          )}

          <FaBell className="text-xl text-gray-600 hover:text-purple-600 cursor-pointer" />

          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <FaUser  onClick={()=>{navigate("/profile")}}/>
          </div>
        </div>
      </nav>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto mt-8 space-y-6 px-4">

        {status === "loading" && (
          <p className="text-center text-lg text-gray-600 animate-pulse">
            Loading articles...
          </p>
        )}

        {articleList.length === 0 && status === "succeeded" && (
          <p className="text-center text-lg text-gray-600">
            No articles found. Create your first post!
          </p>
        )}

        {articleList.map((article) => {
          const commentCount = Array.isArray(article.comments)
            ? article.comments.length
            : 0;

          const likeCount =
            typeof article.likeCount === "number"
              ? article.likeCount
              : Array.isArray(article.likedBy)
              ? article.likedBy.length
              : 0;

          return (
            <div
              key={article._id}
              className="flex flex-col md:flex-row justify-between items-start border rounded-2xl p-5 bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              {/* LEFT */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <p className="mt-2 text-gray-600">{article.content}</p>

                <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
                  <div className="flex items-center gap-2">
                    <FaCommentAlt className="text-purple-500" />
                    <span>{commentCount} Comments</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>{likeCount}</span>
                    <FaHeart className="text-pink-500" />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:w-1/4 w-full md:pl-6 md:border-l border-gray-200 mt-4 md:mt-0">
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-purple-600 text-lg" />
                  <span className="font-semibold text-gray-800">
                    {article.user?.email || "Unknown User"}
                  </span>
                </div>

                <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-lg shadow-sm">
                  {formatDate(article.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;