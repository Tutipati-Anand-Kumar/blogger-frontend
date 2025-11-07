import React, { useRef, useState } from "react";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock, FaLockOpen } from "react-icons/fa";
import { validatePassword } from "val-pass";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../slice";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cropperRef = useRef(null);

  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(true);
  const [passerror, setPassError] = useState([]);
  const [passMatchError, setPassMatchError] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [cropBlob, setCropBlob] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, password: value });
    setPassError(
      value.trim() === ""
        ? []
        : validatePassword(value, 8).getAllValidationErrorMessage()
    );
    setPassMatchError(
      details.confirmPassword && details.confirmPassword !== value
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, confirmPassword: value });
    setPassMatchError(details.password && value !== details.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = details;

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields ❌");
      return;
    }
    if (!email.includes("@gmail.com")) {
      toast.error("Email must include @gmail.com ❌");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }
    if (Array.isArray(passerror) && passerror.length > 0) {
      toast.error("Please fix password errors ❌");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (cropBlob) formData.append("profilePhoto", cropBlob, "profile.jpg");

      await dispatch(registerUser(formData)).unwrap();

      toast.success("Registered successfully ✅");
      navigate("/login");

      setDetails({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setProfilePhoto(null);
      setCropBlob(null);
    } catch (errMsg) {
      toast.error(errMsg || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('./image1.png')] bg-cover bg-center">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 rounded-2xl p-8 w-[90%] max-w-[850px] flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left side form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 bg-clip-text text-transparent mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={details.username}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 border border-purple-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-400 bg-white/60 outline-none text-gray-700 placeholder-gray-500 transition-all duration-300"
              />
              <MdDriveFileRenameOutline className="absolute right-3 top-2.5 text-purple-500 text-xl" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="@gmail.com"
                value={details.email}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 border border-purple-300 rounded-lg focus:border-sky-400 focus:ring-2 focus:ring-sky-300 bg-white/60 outline-none text-gray-700 placeholder-gray-500 transition-all duration-300"
              />
              <MdEmail className="absolute right-3 top-2.5 text-purple-500 text-xl" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={details.password}
                onChange={handlePasswordChange}
                className="w-full pl-3 pr-10 py-2 border border-purple-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-400 bg-white/60 outline-none text-gray-700 placeholder-gray-500 transition-all duration-300"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2.5 text-purple-500 text-xl cursor-pointer"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Password errors */}
            {passerror.length > 0 && (
              <div className="flex flex-col gap-1 text-red-600 text-sm px-2">
                {passerror.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={details.confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 bg-white/60 outline-none text-gray-700 placeholder-gray-500 transition-all duration-300 ${
                  passMatchError
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-purple-300 focus:border-sky-400 focus:ring-sky-300"
                }`}
              />
              <span className="absolute right-3 top-2.5 text-purple-500 text-xl">
                {details.password && details.confirmPassword && !passMatchError ? (
                  <FaLockOpen className="text-green-600" />
                ) : (
                  <FaLock
                    className={`${
                      passMatchError ? "text-red-600" : "text-purple-500"
                    }`}
                  />
                )}
              </span>
            </div>
            {passMatchError && (
              <div className="text-red-600 text-sm text-center font-medium">
                Passwords do not match ❌
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 hover:from-purple-700 hover:via-pink-600 hover:to-sky-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-5 text-gray-700 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 hover:text-pink-700 underline transition-all duration-300"
            >
              Login here
            </Link>
          </div>
        </div>

        {/* Profile Photo Upload */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-28 h-28 border-2 border-purple-400 rounded-full flex items-center justify-center overflow-hidden bg-white/40 shadow-inner">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#6b21a8"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 4.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 22.25a8.25 8.25 0 1115 0H4.5z"
                />
              </svg>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const previewUrl = URL.createObjectURL(file);
                setProfilePhoto(previewUrl);
                setShowCropper(true);
              }
            }}
          />
          <label
            htmlFor="profileUpload"
            className="mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 hover:from-purple-700 hover:via-pink-600 hover:to-sky-600 text-white text-sm px-4 py-1.5 rounded-lg shadow-md cursor-pointer transition-all duration-300"
          >
            Upload Profile
          </label>

          {showCropper && (
            <div className="mt-4 w-40 h-40 border-2 border-purple-400 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-white/40">
              <Cropper
                ref={cropperRef}
                src={profilePhoto}
                className="w-40 h-40"
                stencilProps={{ aspectRatio: 1 }}
              />
              <button
                type="button"
                className="mt-2 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md transition-all duration-300"
                onClick={() => {
                  const cropper = cropperRef.current;
                  if (cropper) {
                    const canvas = cropper.getCanvas();
                    if (canvas) {
                      canvas.toBlob((blob) => {
                        if (blob) {
                          const objectUrl = URL.createObjectURL(blob);
                          setCropBlob(blob);
                          setProfilePhoto(objectUrl);
                          toast.success("Crop saved ✅");
                          setShowCropper(false);
                        } else {
                          toast.error("Failed to crop ❌");
                        }
                      }, "image/jpeg");
                    }
                  }
                }}
              >
                Save Crop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
