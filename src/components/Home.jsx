import {
  FaUser,
  FaHeart,
  FaCommentAlt,
  FaPlus,
  FaBell,
  FaHome,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllArticles,
  likeArticle,
  commentArticle,
} from "../redux/slices/articleSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import Notification from "./Notification";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.articles);

  const [showLogout, setShowLogout] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});
  const [showCount, setShowCount] = useState({});

  // 🔵 NEW: To control showing comments section
  const [showComments, setShowComments] = useState({});

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const toggleNotifications = () => setShowNotification(!showNotification);

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

  const openCommentBox = (articleId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  const handleCommentChange = (articleId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [articleId]: value,
    }));
  };

  // 🟢 UPDATED: Auto-open comments after posting
  const handlePostComment = (articleId) => {
    const text = commentInputs[articleId];
    if (!text?.trim()) return;

    dispatch(commentArticle({ articleId, text }))
      .then(() => {
        dispatch(getAllArticles());
        setShowComments((prev) => ({
          ...prev,
          [articleId]: true, // open comments section
        }));
      });

    setCommentInputs((prev) => ({ ...prev, [articleId]: "" }));
  };

  const articleList = Array.isArray(articles) ? articles : [];

  const handleSearch = async (q) => {
    setSearchQuery(q);

    if (!q.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/search?query=${q}`
      );
      const data = await res.json();

      setSearchResults(data);
      setShowSearchDropdown(true);
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800 font-sans bg-[url('./image1.png')] bg-cover bg-center">
      <div className={`${showLogout ? "blur-sm pointer-events-none" : ""}`}>

        {/* NAVBAR */}
        <nav className="flex items-center justify-between border-b bg-white/20 backdrop-blur-md px-6 py-3 shadow-sm sticky top-0 z-40">
          
          <div>
            <svg width="220" height="48" viewBox="0 0 220 48" fill="none">
              <g transform="translate(56,32)">
                <text x="0" y="0" fontFamily="Inter" fontWeight="700" fontSize="24" fill="purple">Blog</text>
                <text x="52" y="0" fontFamily="Inter" fontWeight="500" fontSize="24" fill="#2563EB">Verse</text>
              </g>
              <path d="M56 36c18 0 36-2 58-8" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.12" />
            </svg>
          </div>

          <div className="flex items-center gap-8">

            <span className="flex items-center gap-1 font-semibold cursor-pointer">
              <FaHome /> Home
            </span>

            <span
              onClick={() => navigate("/about")}
              className="font-semibold cursor-pointer"
            >
              About
            </span>

            {/* SEARCH */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                className="px-3 py-1.5 border rounded-lg shadow-sm bg-white focus:ring focus:ring-purple-300"
              />

              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute mt-2 w-64 bg-white border shadow-lg rounded-lg z-50">
                  {searchResults.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/profile/${user._id}`);
                        setShowSearchDropdown(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        <FaUser />
                      </div>
                      <span>{user.email}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/create-article")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-800 text-white h-[33px] w-[100px] px-3 py-1.5 rounded-lg"
            >
              <FaPlus /> Create
            </button>

            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 justify-center to-purple-800 text-white h-[35px] w-[100px] px-3 py-1.5 rounded-lg"
            >
              Logout
            </button>

            <FaBell
              className="text-xl cursor-pointer"
              onClick={toggleNotifications}
            />

            <div
              onClick={() => navigate("/profile")}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-800 text-white cursor-pointer"
            >
              <FaUser />
            </div>
          </div>
        </nav>

        {/* ARTICLES */}
        <div className="max-w-5xl mx-auto mt-8 space-y-6 px-4">
          {status === "loading" && (
            <p className="text-center text-lg animate-pulse">
              Loading articles...
            </p>
          )}

          {articleList
            .filter((article) => !!article && !!article._id)
            .map((article) => {
              // Sort comments: newest first
              const comments = Array.isArray(article.comments)
              ? [...article.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              : [];

              const totalComments = comments.length;
              const visibleCount = showCount[article._id] || 5;
              const commentsToShow = comments.slice(0, visibleCount);

              const handleShowLess = (articleId, totalComments) => {
              const currentVisible = showCount[articleId] || 5;

              if (totalComments <= 5 || currentVisible <= 5) {
                // Collapse completely
                setShowComments((prev) => ({
                  ...prev,
                  [articleId]: false,
                }));
                setShowCount((prev) => ({
                  ...prev,
                  [articleId]: 5,
                }));
              } else {
                // Reduce by 5
                setShowCount((prev) => ({
                  ...prev,
                  [articleId]: currentVisible - 5,
                }));
              }
            };

              return (
                <div
                  key={article._id}
                  className="flex flex-col border rounded-2xl p-5 bg-white shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="mb-3 text-sm text-gray-500">
                    Posted by: {article.user?.email || "Unknown User"} •{" "}
                    {formatDate(article.createdAt)}
                  </div>

                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="mt-2 text-gray-600">{article.content}</p>

                  {/* LIKE + COMMENT */}
                  <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">
                    {/* COMMENT ICON → SHOW/HIDE COMMENTS */}
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        setShowComments((prev) => ({
                          ...prev,
                          [article._id]: !prev[article._id],
                        }));
                        openCommentBox(article._id);
                      }}
                    >
                      <FaCommentAlt className="text-purple-500 text-xl" />
                      <span>{totalComments} Comments</span>
                    </div>

                    {/* LIKE */}
                    <div
                      className="flex items-center gap-3 cursor-pointer text-xl"
                      onClick={() =>
                        dispatch(likeArticle(article._id)).then(() =>
                          dispatch(getAllArticles())
                        )
                      }
                    >
                      <FaHeart
                        className={`text-xl transition ${
                          article.likedByCurrentUser
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <span>{article.likeCount}</span>
                    </div>
                  </div>

                  {/* COMMENT INPUT */}
                  {showCommentInput[article._id] && (
                    <div className="flex gap-3 mt-4">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 p-2 border rounded-lg bg-gray-100"
                        value={commentInputs[article._id] || ""}
                        onChange={(e) =>
                          handleCommentChange(article._id, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handlePostComment(article._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Post
                      </button>
                    </div>
                  )}

                  {/* COMMENTS LIST — HIDDEN BY DEFAULT */}
                  {showComments[article._id] && (
                    <div className="mt-4 space-y-3">
                      {commentsToShow
                        .filter((c) => c && c.text)
                        .map((c) => (
                          <div
                            key={c._id}
                            className="p-3 bg-gray-100 rounded-lg border"
                          >
                            <p>{c.text}</p>
                            <p className="text-xs text-gray-500">
                              {formatDate(c.createdAt)}
                            </p>
                          </div>
                        ))}

                      {/* READ MORE */}                     
                      {visibleCount < totalComments && (
                        <button
                          onClick={() =>
                            setShowCount((prev) => ({
                              ...prev,
                              [article._id]: (prev[article._id] || 5) + 5,
                            }))
                          }
                          className="text-blue-600 mt-1"
                        >
                          Read More
                        </button>
                      )}
                      {/* SHOW LESS — visible only if at least 1 comment exists */}
                      {totalComments > 0 && (
                        <button
                          onClick={() => handleShowLess(article._id, totalComments)}
                          className="text-red-500 mt-1 block"
                        >
                          Show Less
                        </button>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {showNotification && (
        <div className="absolute right-20 top-18">
          <Notification onClose={toggleNotifications} className="bg-amber-500"/>
        </div>
      )}

      {showLogout && (
        <Logout
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}

export default Home;