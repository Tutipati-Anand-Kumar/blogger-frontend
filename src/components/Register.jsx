import React, { useEffect, useRef, useState } from "react";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock, FaLockOpen } from "react-icons/fa";
import { validatePassword } from "val-pass";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../slice";
import { Cropper } from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';

const Register = () => {
  const dispatch = useDispatch();
  const cropperRef = useRef(null);


  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(true);
  const [passerror, setPassError] = useState([]);
  const [passMatchError, setPassMatchError] = useState(false);
  const [profilePhoto, setprofilePhoto] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleNameChange = (e) => {
    setDetails({ ...details, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    setDetails({ ...details, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, password: value });

    if (value.trim() === "") {
      setPassError([]);
    } else {
      const result = validatePassword(value, 8).getAllValidationErrorMessage();
      setPassError(result);
    }

    // check confirm password again when password changes
    if (details.confirmPassword && details.confirmPassword !== value) {
      setPassMatchError(true);
    } else {
      setPassMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, confirmPassword: value });

    if (details.password && value === details.password) {
      setPassMatchError(false);
    } else {
      setPassMatchError(true);
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
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
      setPassMatchError(true);
      toast.error("Passwords do not match ❌");
      return;
    }

    if (passerror.length > 0 && passerror !== "No Error Detected") {
      toast.error("Please fix password errors ❌");
      return;
    }

    toast.success("Registered successfully ✅");
    console.log("Form submitted:", details);
    dispatch(registerUser(details))

    setDetails({ username: "", email: "", password: "", confirmPassword: "", profilePhoto: "" });
    setprofilePhoto(null);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('./register_bg.jpg')] bg-size-[100%_100%] bg-no-repeat">
      <div className="backdrop-blur-md shadow-lg rounded-2xl p-8 md:p-10 w-[90%] max-w-[650px] border flex flex-col md:flex-row items-center justify-center gap-8 bg-[url('./register_bg.jpg')] bg-fill bg-no-repeat">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
            Sign up
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pr-10 pl-3 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
                value={details.username}
                onChange={handleNameChange}
              />
              <MdDriveFileRenameOutline className="absolute right-3 top-2.5 text-purple-500 text-xl" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="@gmail.com"
                className="w-full pr-10 pl-3 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
                value={details.email}
                onChange={handleEmailChange}
              />
              <MdEmail className="absolute right-3 top-2.5 text-purple-500 text-xl" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "password" : "text"}
                placeholder="Password"
                className="w-full pr-10 pl-3 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
                value={details.password}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute right-3 top-2.5 text-purple-500 text-xl cursor-pointer"
                onClick={handleShow}
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Password error display */}
            {passerror.length > 0 && passerror !== "No Error Detected" && (
              <div className="flex flex-col gap-1 text-red-600 text-sm px-2">
                {Array.isArray(passerror)
                  ? passerror.map((err, i) => <p key={i}>• {err}</p>)
                  : <p>{passerror}</p>}
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`w-full pr-10 pl-3 py-2 border rounded-md focus:ring-2 outline-none ${
                  passMatchError
                    ? "border-red-500 focus:ring-red-400"
                    : "border-purple-300 focus:ring-purple-400"
                }`}
                value={details.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span className="absolute right-3 top-2.5 text-purple-500 text-xl">
                {details.password &&
                details.confirmPassword &&
                !passMatchError ? (
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-all duration-300"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right side - Profile upload */}
        {/* Right side - Profile upload */}
<div className="w-full md:w-1/2 flex flex-col items-center justify-center">
  <div className="w-28 h-28 border-2 border-purple-400 rounded-full flex items-center justify-center overflow-hidden bg-white/30">
    {profilePhoto ? (
      <img
        src={profilePhoto}
        alt="Profile Preview"
        className="w-full h-full object-cover"
      />
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
        setprofilePhoto(previewUrl); 
        setShowCropper(true); 
      }
    }}

  />

  <label
    htmlFor="profileUpload"
    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1.5 rounded-md transition-all duration-300 cursor-pointer"
  >
    Upload Profile
  </label>

  {showCropper && (
  <div className="mt-4 w-40 h-40 border rounded-md overflow-hidden flex flex-col items-center">
    <Cropper
      ref={cropperRef}
      src={profilePhoto}
      className="cropper"
      stencilProps={{ aspectRatio: 1 }}
    />
    <button
      type="button"
      className="mt-2 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md"
      onClick={() => {
        const cropper = cropperRef.current;
        if (cropper) {
          const canvas = cropper.getCanvas();
          if (canvas) {
            const croppedUrl = canvas.toDataURL("image/jpeg");
            setDetails({ ...details, profilePhoto: croppedUrl });
            setprofilePhoto(croppedUrl);
            toast.success("Crop saved ✅");
            setShowCropper(false);  
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

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Register;
