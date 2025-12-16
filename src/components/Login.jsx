import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState(true);
  const [details, setDetails] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = details;

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!email.includes("@gmail.com")) {
      toast.error("Email must include @gmail.com");
      return;
    }

    try {
      const result = await dispatch(loginUser(details)).unwrap();
      toast.success("Login successful ✅");
      navigate("/");
      console.log("Server response:", result);
    } catch (err) {
      toast.error(err || "Login failed");
      // console.error("Login error:", err);
    }

    setDetails({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 rounded-2xl p-8 w-[90%] max-w-[420px] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 bg-clip-text text-transparent mb-6 max-[550px]:text-2xl">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="@gmail.com"
              value={details.email}
              onChange={handleChange}
              className="w-full pl-3 pr-10 py-2 rounded-lg border border-purple-300/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none bg-white/40 text-gray-800 placeholder-gray-600 transition-all duration-300 shadow-inner"
            />
            <MdEmail className="absolute right-3 top-2.5 text-purple-600 text-xl" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={show ? "password" : "text"}
              name="password"
              placeholder="Password"
              value={details.password}
              onChange={handleChange}
              className="w-full pl-3 pr-10 py-2 rounded-lg border border-purple-300/50 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 outline-none bg-white/40 text-gray-800 placeholder-gray-600 transition-all duration-300 shadow-inner"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 text-purple-600 text-xl cursor-pointer"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-500/80 to-purple-800/80 hover:from-purple-800 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm max-[550px]:text-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="text-center mt-5 text-gray-800 font-medium max-[550px]:text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-pink-600 hover:text-pink-700 transition-all duration-300 underline font-bold"
          >
            Register here
          </Link>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
