import React from "react";
import { motion } from "framer-motion";

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <div className=" absolute right-140 top-70 flex items-center justify-center   backdrop-sm z-50 ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white  border rounded-2xl shadow-2xl p-8 w-[90%] max-w-[380px] text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Are you sure you want to Logout?
        </h2>
        <div className="flex justify-center gap-4 mt-6">
          {/* YES Button */}
          <button
            onClick={onConfirm}
            className="px-6 py-2 font-medium text-white rounded-lg shadow-md 
            bg-red-600 hover:bg-red-500 
            transition-all duration-300"
          >
            Yes
          </button>

          {/* NO Button */}
          <button
            onClick={onCancel}
            className="px-6 py-2 font-medium text-white rounded-lg shadow-md 
            bg-blue-800 hover:bg-blue-700 
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
