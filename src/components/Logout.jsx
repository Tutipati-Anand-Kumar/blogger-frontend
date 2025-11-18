import React from "react";
import { motion } from "framer-motion";

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl p-8 w-[90%] max-w-[380px] text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 bg-clip-text text-transparent">
          Are you sure you want to Logout?
        </h2>
        <div className="flex justify-center gap-4 mt-6">
          {/* YES Button */}
          <button
            onClick={onConfirm}
            className="px-6 py-2 font-medium text-white rounded-lg shadow-md 
            bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 
            hover:from-purple-700 hover:via-pink-600 hover:to-sky-600 
            transition-all duration-300"
          >
            Yes
          </button>

          {/* NO Button */}
          <button
            onClick={onCancel}
            className="px-6 py-2 font-medium text-white rounded-lg shadow-md 
            bg-gradient-to-r from-sky-500 via-pink-500 to-purple-600 
            hover:from-sky-600 hover:via-pink-600 hover:to-purple-700 
            transition-all duration-300"
          >
            No
          </button>
        </div> 
      </motion.div>
    </div>
  );
};

export default Logout;
