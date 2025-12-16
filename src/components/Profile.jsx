import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../redux/slices/authSlice";
import api from "../api/api";
import { toast } from "react-hot-toast";
import { User as UserIcon, Check, UserPlus, UserMinus } from "lucide-react";

const Profile = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId } = useParams();

  // Determine if we are viewing our own profile
  const isOwner = !userId || (authUser && userId === authUser._id);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  // Edit Mode State
  const [openEdit, setOpenEdit] = useState(false);
  const [tempUser, setTempUser] = useState({});

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        if (isOwner) {
          if (authUser) {
            setUser({
              ...authUser,
              name: authUser.username,
              profile: authUser.profilePhoto || "",
            });
            setTempUser({
              name: authUser.username,
              profession: "MERN Stack Developer", // Placeholder
              bio: authUser.bio || "",
              profile: authUser.profilePhoto || "",
            });
          }
        } else {
          const res = await api.get(`/users/${userId}`);
          const fetched = res.data;
          setUser({
            ...fetched,
            name: fetched.username,
            profile: fetched.profilePhoto || "",
          });

          // Check Follow Status
          if (authUser) {
            setIsFollowing(fetched.followers.includes(authUser._id));
            setIsRequested(fetched.followRequests.includes(authUser._id));
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, authUser, isOwner]);


  // Handle Follow / Unfollow
  const handleFollowToggle = async () => {
    if (!authUser) {
      toast.error("Please login to follow");
      return;
    }

    try {
      if (isFollowing) {
        // UNFOLLOW
        await api.post("/follow/unfollow", { targetUserId: user._id });
        setIsFollowing(false);
        setUser(prev => ({ ...prev, followers: prev.followers.filter(id => id !== authUser._id) })); // Optimistic update
        toast.success("Unfollowed");
      } else if (isRequested) {
        toast("Request already sent");
      } else {
        // FOLLOW REQUEST
        await api.post("/follow/send-request", { targetUserId: user._id });
        setIsRequested(true);
        toast.success("Follow request sent");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempUser({ ...tempUser, profile: imageURL, profileFile: file });
    }
  };

  const saveChanges = async () => {
    const userData = {
      username: tempUser.name,
      bio: tempUser.bio,
    };
    await dispatch(updateUser(userData));
    setOpenEdit(false);
  };

  if (loading) return <div className="text-center text-white mt-10 text-xl font-bold">Loading Profile...</div>;
  if (!user) return <div className="text-center text-white mt-10 text-xl font-bold">User Not Found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent max-[650px]:pt-20">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl w-full max-w-4xl p-10 relative overflow-hidden max-[650px]:p-2">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-8 mt-4 max-[650px]:mt-2">

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full border-4 border-white/30 shadow-xl overflow-hidden bg-white/10 backdrop-blur-sm relative z-10 group">
              {user.profile ? (
                <img
                  src={user.profile}
                  alt="profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-200 to-pink-200 text-purple-700 text-5xl font-bold">
                  {user.name && user.name[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* User Info & Stats */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-gray-700 drop-shadow-md tracking-tight max-[650px]:text-2xl">{user.name}</h2>
            <p className="text-lg text-green-600 font-medium mt-2 tracking-wide mb-6 max-[650px]:text-sm">{"MERN Stack Developer"}</p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 border-t border-b border-white/20 py-4 max-w-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{user.articlesCount || 0}</p>
                <p className="text-gray-800 text-xs font-bold uppercase tracking-wide">Articles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{user.following?.length || 0}</p>
                <p className="text-gray-800 text-xs font-bold uppercase tracking-wide">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{user.followers?.length || 0}</p>
                <p className="text-gray-800 text-xs font-bold uppercase tracking-wide">Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center md:justify-end gap-4 mt-8 pb-4">
          {isOwner ? (
            <button
              onClick={() => setOpenEdit(true)}
              className="px-8 py-2.5 rounded-full border-2 border-white/50 text-gray-900 font-bold hover:bg-white/40 transition-all hover:scale-105 active:scale-95"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollowToggle}
              className={`px-8 py-2.5 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2
              ${isFollowing
                  ? "bg-red-500 hover:bg-red-600"
                  : isRequested
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"}`}
            >
              {isFollowing ? (
                <> <UserMinus size={18} /> Unfollow </>
              ) : isRequested ? (
                <> <Check size={18} /> Requested </>
              ) : (
                <> <UserPlus size={18} /> Follow </>
              )}
            </button>
          )}
        </div>

        {/* Content Section / Bio */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 ml-1 max-[650px]:text-lg">About Me</h3>
          <div className="p-6 border border-white/40 rounded-xl bg-white/20 backdrop-blur-md shadow-inner min-h-[120px] text-gray-900 font-medium max-[650px]:p-2 max-[650px]:min-h-[100px]">
            <p className="leading-relaxed whitespace-pre-wrap">
              {user.bio ? user.bio : "No bio available yet."}
            </p>
          </div>
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Name"
                  value={tempUser.name}
                  onChange={(e) =>
                    setTempUser({ ...tempUser, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Profession</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Profession"
                  value={tempUser.profession}
                  onChange={(e) =>
                    setTempUser({ ...tempUser, profession: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Bio</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none transition-all"
                  placeholder="Write something about yourself..."
                  value={tempUser.bio}
                  onChange={(e) =>
                    setTempUser({ ...tempUser, bio: e.target.value })
                  }
                />
              </div>

              {/* Image Upload */}
              <div className="flex items-center gap-4 mt-2">
                {tempUser.profile && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500 shadow-sm">
                    <img
                      src={tempUser.profile}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  </div>
                )}
                <label className="flex-1 cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-center transition-all hover:shadow-md font-medium">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={saveChanges}
                className="px-5 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg transition-all hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;