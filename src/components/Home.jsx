// import { FaUser, FaHeart, FaCommentAlt, FaPlus, FaBell ,FaHome} from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllArticles } from "../redux/slices/articleSlice";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import Logout from "./Logout";
// import Notification from './Notification';

// function Home() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  

//   const { articles, status, error } = useSelector((state) => state.articles);
//   const [showLogout, setShowLogout] = useState(false);
//   const [showNotification ,setShowNotification] = useState(false);

//   const toggleNotifications = () => {
//     setShowNotification(!showNotification);
//   };
//   console.log(articles);
  

//   useEffect(() => {
//     dispatch(getAllArticles());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   const handleLogout = () => {
//     localStorage.removeItem("authtoken");
//     window.location.href = "/login";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown date";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   const articleList = Array.isArray(articles) ? articles : [];
//   console.log(articleList)

//   return (
//     <div className="min-h-screen  text-gray-800 font-sans bg-[url('./image1.png')] bg-cover bg-center">

//       {/* Navbar */}
//       <nav className="flex items-center justify-between border-b bg-white/20 backdrop-blur-md px-6 py-3 shadow-sm  sticky top-0 z-50">
//         <div >
//           <svg
//   width="220"
//   height="48"
//   viewBox="0 0 220 48"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
//   role="img"
//   aria-label="BlogVerse logo"
// >
//   <title>BlogVerse</title>

//   {/* Brand text */}
//   <g transform="translate(56,32)">
//     {/* "Blog" - bold */}
//     <text
//       x="0"
//       y="0"
//       fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
//       fontWeight="700"
//       fontSize="24"
//       fill="purple"
//     >
//       Blog
//     </text>

//     {/* "Verse" - accent color and lighter weight */}
//     <text
//       x="52"
//       y="0"
//       fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
//       fontWeight="500"
//       fontSize="24"
//       fill="#2563EB"
//     >
//       Verse
//     </text>
//   </g>

//   {/* subtle underline / flourish */}
//   <path
//     d="M56 36c18 0 36-2 58-8"
//     stroke="#2563EB"
//     strokeWidth="1.2"
//     strokeLinecap="round"
//     strokeOpacity="0.12"
//     fill="none"
//   />
// </svg>

//         </div>

//         <div className="flex items-center gap-8">
//           <div className="">
            
//             <span className="flex flex-row items-center content-center gap-1 font-semibold text-gray-900 hover:text-blue-900 cursor-pointer" > <FaHome />Home</span>
//           </div>
//           <div className="">

//             <span className="text-gray-900 hover:text-blue-900 font-semibold cursor-pointer" onClick={()=>{navigate("/about")}}>About</span>
//           </div>
//           <button
//             onClick={() => navigate("/create-article")}
//             className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-800 hover:from-purple-800 hover:to-blue-500 text-white h-[33px] w-[100px] px-3 py-1.5 rounded-lg hover:shadow-md transition cursor-pointer "
//           >
//             <FaPlus /> Create
//           </button>

//           <button
//             onClick={() => setShowLogout(true)}
//             // className="px-6 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 hover:scale-105"
//              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-800  hover:from-purple-800 hover:to-blue-500 text-white h-[35px] w-[100px] px-3 py-1.5 rounded-lg hover:shadow-md transition font-semibold cursor-pointer "
//           >
//             Logout
//           </button>

//           {showLogout && (
//             <Logout onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
//           )}

//           <FaBell className="text-xl text-gray-600 hover:text-blue-900 cursor-pointer" onClick={toggleNotifications} />
          
//           {showNotification && (
//             <div className="absolute right-20 top-18 z-50 ">
//               <Notification onClose={toggleNotifications} />
//             </div>
//           )}
//           <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-800 hover:from-purple-800 hover:to-blue-500 text-white cursor-pointer ">
//             <FaUser  onClick={()=>{navigate("/profile")}}/>
//           </div>
//         </div>
//       </nav>

//       {/* Posts Section */}
//       <div className="max-w-5xl mx-auto mt-8 space-y-6 px-4 ">

//         {status === "loading" && (
//           <p className="text-center text-lg text-gray-600 animate-pulse">
//             Loading articles...
//           </p>
//         )}

//         {articleList.length === 0 && status === "succeeded" && (
//           <p className="text-center text-lg text-gray-600">
//             No articles found. Create your first post!
//           </p>
//         )}

//         {articleList.map((article) => {
//           const commentCount = Array.isArray(article.comments)
//             ? article.comments.length
//             : 0;

//           const likeCount =
//             typeof article.likeCount === "number"
//               ? article.likeCount
//               : Array.isArray(article.likedBy)
//               ? article.likedBy.length
//               : 0;

//           return (
//             <div
//               key={article._id}
//               className="flex flex-col md:flex-row justify-between items-start border rounded-2xl p-5 bg-white shadow-md hover:shadow-xl transition-shadow"
//             >
//               {/* LEFT */}
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
//                 <p className="mt-2 text-gray-600">{article.content}</p>

//                 <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
//                   <div className="flex items-center gap-2">
//                     <FaCommentAlt className="text-purple-500" />
//                     <span>{commentCount} Comments</span>
//                   </div>

//                   <div className="flex items-center gap-1">
//                     <span>{likeCount}</span>
//                     <FaHeart className="text-pink-500" />
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT */}
//               <div className="md:w-1/4 w-full md:pl-6 md:border-l border-gray-200 mt-4 md:mt-0">
//                 <div className="flex items-center gap-2 mb-2">
//                   <FaUser className="text-purple-600 text-lg" />
//                   <span className="font-semibold text-gray-800">
//                     {article.user?.email || "Unknown User"}
//                   </span>
//                 </div>

//                 <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-lg shadow-sm">
//                   {formatDate(article.createdAt)}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
 
    


//     </div>
//   );
// }

// export default Home;


import { FaUser, FaHeart, FaCommentAlt, FaPlus, FaBell, FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../redux/slices/articleSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import Notification from "./Notification";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { articles, status, error } = useSelector((state) => state.articles);

  const [showLogout, setShowLogout] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  const articleList = Array.isArray(articles) ? articles : [];

  return (
    <div className="relative min-h-screen text-gray-800 font-sans bg-[url('./image1.png')] bg-cover bg-center">

      {/* BLUR BACKGROUND ONLY WHEN LOGOUT POPUP IS OPEN */}
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
            <span className="flex flex-row items-center gap-1 font-semibold text-gray-900 hover:text-blue-900 cursor-pointer">
              <FaHome /> Home
            </span>

            <span onClick={() => navigate("/about")} className="text-gray-900 hover:text-blue-900 font-semibold cursor-pointer">
              About
            </span>

            <button
              onClick={() => navigate("/create-article")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-800 hover:from-purple-800 hover:to-blue-500 text-white h-[33px] w-[100px] px-3 py-1.5 rounded-lg transition"
            >
              <FaPlus /> Create
            </button>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-800 hover:from-purple-800 hover:to-blue-500 text-white h-[35px] w-[100px] px-3 py-1.5 rounded-lg transition font-semibold justify-center"
            >
              Logout
            </button>

            {/* NOTIFICATION ICON */}
            <FaBell
              className="text-xl text-gray-600 hover:text-blue-900  cursor-pointer"
              onClick={toggleNotifications}
            />

            {/* PROFILE ICON */}
            <div
              onClick={() => navigate("/profile")}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-800 hover:from-purple-800 hover:to-blue-500 text-white cursor-pointer"
            >
              <FaUser />
            </div>
          </div>
        </nav>

        {/* POSTS SECTION */}
        <div className="max-w-5xl mx-auto mt-8 space-y-6 px-4">
          {status === "loading" && <p className="text-center text-lg text-gray-600 animate-pulse">Loading articles...</p>}

          {articleList.length === 0 && status === "succeeded" && (
            <p className="text-center text-lg text-gray-600">No articles found.</p>
          )}

          {articleList.map((article) => (
            <div
              key={article._id}
              className="flex flex-col md:flex-row justify-between items-start border rounded-2xl p-5 bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <p className="mt-2 text-gray-600">{article.content}</p>

                <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
                  <div className="flex items-center gap-2">
                    <FaCommentAlt className="text-purple-500" />
                    <span>{article.comments?.length || 0} Comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{article.likeCount || article.likedBy?.length || 0}</span>
                    <FaHeart className="text-pink-500" />
                  </div>
                </div>
              </div>

              <div className="md:w-1/4 w-full md:pl-6 md:border-l border-gray-200 mt-4 md:mt-0">
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-purple-600 text-lg" />
                  <span className="font-semibold text-gray-800">{article.user?.email || "Unknown User"}</span>
                </div>
                <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-lg shadow-sm">
                  {formatDate(article.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTIFICATION POPUP (NO BLUR NOW) */}
      {showNotification && (
        <div className="absolute   right-20 top-18">
          <div className="relative">
            <Notification />
            
              onClick={toggleNotifications}
              
           
          </div>
        </div>
      )}

      {/* LOGOUT POPUP (BLUR APPLIED ABOVE) */}
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
