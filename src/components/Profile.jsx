import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Jhansi",
    profession: "Software Developer",
    articles: 75,
    following: 140,
    followers: "5M",
    profile: "",
  });

  const [isFollowing, setIsFollowing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempUser({ ...tempUser, profile: imageURL });
    }
  };

  const saveChanges = () => {
    setUser(tempUser);
    setOpenEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-10 ">

        {/* TOP SECTION */}
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center overflow-hidden">
            {user.profile ? (
              <img
                src={user.profile}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="purple"
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

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.profession}</p>
          </div>

          {/* Stats */}
          <div className="ml-auto flex gap-10 text-center">
            <div>
              <p className="text-xl font-bold">{user.articles}+</p>
              <p className="text-gray-600 text-sm">Articles</p>
            </div>
            <div>
              <p className="text-xl font-bold">{user.following}</p>
              <p className="text-gray-600 text-sm">Following</p>
            </div>
            <div>
              <p className="text-xl font-bold">{user.followers}</p>
              <p className="text-gray-600 text-sm">Followers</p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleFollow}
            className={`px-6 py-2 rounded-lg font-semibold text-white shadow 
              ${isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Content Section */}
        <textarea className="mt-10 p-6 border rounded-xl bg-red-50 h-40 w-[100%]">
          <p className="text-gray-600 "></p>
        </textarea>
        <div className="gap-[560px] flex">
          <button className="border rounded-xl p-2 m-1 bg-purple-600 text-white ">Apply the changes</button> 
        <button className="border rounded-xl p-2 m-1 bg-purple-600 text-white w-[80px]">Cancel</button>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Name"
              value={tempUser.name}
              onChange={(e) =>
                setTempUser({ ...tempUser, name: e.target.value })
              }
            />

            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Profession"
              value={tempUser.profession}
              onChange={(e) =>
                setTempUser({ ...tempUser, profession: e.target.value })
              }
            />

            {/* Image Upload */}
            <label className="block mb-3">
              <span className="text-gray-700 border rounded p-0.5 bg-white hover:bg-purple-100"> Change Profile:</span>
              <input
                type="file"
                accept="image/*"
                className="mt-2 w-full"
                onChange={handleImageUpload}
              />
            </label>

            {/* Preview */}
            {tempUser.profile && (
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border">
                <img
                  src={tempUser.profile}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
 
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded bg-purple-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;