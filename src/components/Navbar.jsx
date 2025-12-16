import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchCurrentUser } from "../redux/slices/authSlice";
import { BiLogOut } from "react-icons/bi";
import { FaSearch, FaUser, FaPenNib, FaBell } from "react-icons/fa";
import Notification from "./Notification";
import Logout from "./Logout";
import api from "../api/api"; // Ensure api is imported for search

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Fetch latest user data on mount to update notifications count
    useEffect(() => {
        if (user?._id) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, user?._id]);

    const handleLogout = () => {
        dispatch(logout());
        setShowLogout(false);
        navigate("/login");
    };

    // Search Logic
    useEffect(() => {
        const fetchUsers = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                return;
            }
            try {
                const res = await api.get(`/users/search?query=${searchQuery}`);
                setSearchResults(res.data);
            } catch (err) {
                console.error("Search failed", err);
            }
        };
        const debounce = setTimeout(fetchUsers, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
        setSearchQuery("");
        setSearchResults([]);
    };

    return (
        <nav className="fixed top-0 z-50 px-6 py-4 max-[650px]:px-4 max-[650px]:py-3 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg w-full">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 max-[650px]:gap-2">

                {/* LEFT: HAMBURGER & LOGO */}
                <div className="flex items-center gap-3">
                    {/* Hamburger Icon (Mobile Only) */}
                    {user && (
                        <button
                            className="hidden max-[650px]:block text-gray-700 text-xl"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <span className="sr-only">Menu</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    )}

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform max-[650px]:text-[16px] shrink-0"
                    >
                        BlogVerse
                    </Link>
                </div>

                {/* CENTER: SEARCH BAR */}
                {user && (
                    <div className="relative flex-1 max-w-md mx-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800 shadow-inner max-[650px]:py-1.5 max-[650px]:text-sm"
                        />
                        <FaSearch className="absolute left-3 top-3 max-[650px]:top-2.5 text-gray-600 max-[650px]:text-xs" />

                        {/* SEARCH RESULTS DROPDOWN */}
                        {searchResults.length > 0 && (
                            <div className="absolute top-12 left-0 w-full bg-white/80 backdrop-blur-md border border-white/40 rounded-xl shadow-xl overflow-hidden z-50">
                                {searchResults.map((u) => (
                                    <div
                                        key={u._id}
                                        onClick={() => handleUserClick(u._id)}
                                        className="flex items-center gap-3 p-3 hover:bg-white/40 cursor-pointer transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0">
                                            {u.profilePhoto ? (
                                                <img src={u.profilePhoto} alt={u.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600">{u.username[0].toUpperCase()}</div>
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{u.username}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* RIGHT: ACTIONS */}
                <div className="flex items-center gap-4 max-[650px]:gap-3 shrink-0">
                    {user ? (
                        <>
                            {/* Desktop: Write Button */}
                            <Link
                                to="/create-article"
                                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all max-[650px]:hidden"
                            >
                                <FaPenNib /> <span>Write</span>
                            </Link>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative text-gray-700 hover:text-purple-600 transition-colors text-xl max-[650px]:text-lg focus:outline-none mt-1"
                                >
                                    <FaBell />
                                    {user?.followRequests?.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                                            {user.followRequests.length}
                                        </span>
                                    )}
                                </button>
                                {/* Notification Dropdown */}
                                {showNotifications && (
                                    <div className="absolute right-0 top-10 mt-2 z-50 origin-top-right transform transition-all duration-200 max-[650px]:fixed max-[650px]:top-16 max-[650px]:left-1/2 max-[650px]:-translate-x-1/2 max-[650px]:w-[90%] max-[650px]:right-auto">
                                        <Notification onClose={() => setShowNotifications(false)} />
                                    </div>
                                )}
                            </div>

                            {/* Profile Pic */}
                            <div
                                className="relative cursor-pointer group w-10 h-10 max-[650px]:w-8 max-[650px]:h-8"
                                onClick={() => navigate('/profile')}
                            >
                                <div className="w-full h-full rounded-full border-2 border-purple-400 p-[2px]">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                                        {user?.profilePhoto ? (
                                            <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600 font-bold text-sm">
                                                {user?.username?.[0]?.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: Logout */}
                            <button
                                onClick={() => setShowLogout(true)}
                                className="text-gray-600 hover:text-red-500 transition-colors text-2xl ml-2 max-[650px]:hidden"
                                title="Logout"
                            >
                                <BiLogOut />
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/register"
                            className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg max-[650px]:px-4 max-[650px]:py-1.5 max-[650px]:text-sm"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>

            {/* MOBILE MENU (Hamburger Dropdown) */}
            {showMobileMenu && user && (
                <div className="absolute top-full left-0 w-1/2 bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-xl p-3 flex flex-col gap-3 z-40 max-[650px]:block hidden animate-slideIn">
                  
                    <Link
                        to="/create-article"
                        className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                    >
                        <FaPenNib className="text-purple-600" /> <span>Create New Article</span>
                    </Link>

                    <button
                        onClick={() => { setShowLogout(true); setShowMobileMenu(false); }}
                        className="flex items-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 font-medium transition-colors w-full text-left"
                    >
                        <BiLogOut /> <span>Logout</span>
                    </button>
                </div>
            )}

            {/* Logout Modal */}
            {showLogout && (
                <Logout onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
            )}
        </nav>
    );
};
export default Navbar;
