export default function Notification() {
  const notifications = [
    {
      id: 1,
      title: "New Comment",
      message: "Someone commented on your post.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "New Follower",
      message: "You have a new follower!",
      time: "10 min ago",
    },
    {
      id: 3,
      title: "Blog Approved",
      message: "Your blog post was approved.",
      time: "1 hour ago",
    },
  ];

  return (
    <div className=" bg-gray-100 p-6 w-[400px] rounded-2xl m-[7px]" >
      <h1 className="text-2xl font-bold mb-4 ">Notifications</h1>

      <div className="bg-white rounded-xl shadow p-4 divide-y">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No notifications</p>
        ) : (
          notifications.map((note) => (
            <div key={note.id} className="py-3">
              <h2 className="font-semibold text-gray-900">{note.title}</h2>
              <p className="text-gray-600 text-sm">{note.message}</p>
              <span className="text-gray-400 text-xs">{note.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
