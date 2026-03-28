import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    localStorage.removeItem("token");

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/", { replace: true });
    }
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/add-notification", { title, message });
      setTitle("");
      setMessage("");
      toast.success("Notification added successfully!");
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("Failed to add notification.");
    }
  };

  const handleSendNotification = async () => {
    try {
      const { data } = await api.get("/send-notification");
      toast.success(
        `${data.message}. Success: ${data.success}, Failed: ${data.failed}`,
      );
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("Failed to send notification.");
    }
  };

  return (
    <div className="font-bold p-4">
      <div className="flex justify-between">
        <button onClick={handleLogout}>Logout</button>
        <button
          onClick={handleSendNotification}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Notification
        </button>
      </div>
      <form onSubmit={handleNotificationSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-white mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
