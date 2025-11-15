import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.articles);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res =await dispatch(createArticle(form));

    if (res?.meta?.requestStatus === "fulfilled") {
      toast.success("Article Created Successfully!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      toast.error(res.payload || "Failed to create article");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2A43] to-[#0F4C5C] p-6">
      <div className="bg-white/10 backdrop-blur-xl shadow-xl rounded-xl p-8 w-full max-w-lg border border-white/20">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create New Article
        </h2>

        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-white block mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter article title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-white block mb-2">Content</label>
            <textarea
              name="content"
              rows="5"
              placeholder="Write your article..."
              value={form.content}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-teal-400 hover:bg-teal-300 text-black font-semibold rounded-lg transition"
          >
            {status === "loading" ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
