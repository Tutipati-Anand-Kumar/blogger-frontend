import React, { useState } from "react";
import Logout from "./Logout";

const Home = () => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    window.location.href = "/login"; 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => setShowLogout(true)}
        className="px-6 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 hover:from-purple-700 hover:via-pink-600 hover:to-sky-600 transition-all duration-300"
      >
        Logout
      </button>

      {showLogout && (
        <Logout
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
};

export default Home;
