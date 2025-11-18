import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fb] via-[#f6faff] to-[#eef7ff] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl bg-white/40 backdrop-blur-xl shadow-xl rounded-2xl p-10 border border-white/30">

        {/* Heading */}
        <h1 className="text-4xl font-semibold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 bg-clip-text text-transparent mb-6">
          About Our Blogger Platform
        </h1>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Welcome to our <span className="font-semibold">Blogger Application</span>, a modern
          platform built for writers, readers, and creators. Our goal is to give
          every individual a voice and a space to express ideas freely—whether
          you love writing stories, sharing knowledge, or posting daily thoughts.
        </p>

        {/* Vision Section */}
        <h2 className="text-2xl font-semibold text-purple-600 mb-3">Our Purpose</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We created this platform to bring simplicity to blogging. No complex
          setup, no confusing tools—just a clean space to write, publish, and
          connect with people who enjoy your content. Whether you're a beginner
          or a professional writer, we support your journey.
        </p>

        {/* What We Offer */}
        <h2 className="text-2xl font-semibold text-purple-600 mb-3">Key Features</h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Create and edit blog posts with ease</li>
          <li>Personal profile for writing and showcasing posts</li>
          <li>Follow other bloggers and discover new content</li>
          <li>Like, comment, and engage with the community</li>
          <li>Modern UI with smooth reading experience</li>
        </ul>
            




        {/* Final Message */}
        <p className="text-gray-700 leading-relaxed text-lg">
          Our mission is simple — help people share their thoughts with the world.
          Start writing, sharing, and connecting today.  
          <br />
          <br />
          <span className="font-semibold">
            Your words matter. Your story deserves to be heard.
          </span>
        </p>
      </div>
    </div>
  );
};


export default About;
