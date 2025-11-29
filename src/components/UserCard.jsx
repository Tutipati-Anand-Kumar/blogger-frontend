import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendRequest } from "../redux/slices/friendSlice";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.friends);
  const [requested, setRequested] = useState(requests.includes(user._id));

  const handleFriendRequest = async () => {
    try {
      await dispatch(sendFriendRequest(user._id)).unwrap();
      setRequested(true);
      toast.success("Friend request sent ✅");
    } catch (err) {
      toast.error(err || "Failed to send request ❌");
    }
  };

  return (
    <div className="border p-4 rounded-md flex justify-between items-center mb-2">
      <div>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-gray-500">{user.profession}</p>
      </div>
      <button
        onClick={handleFriendRequest}
        disabled={requested}
        className={`px-4 py-2 rounded ${
          requested ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {requested ? "Requested" : "Add Friend"}
      </button>
    </div>
  );
};

export default UserCard;
