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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await api.post("/add-notification", { title, message });
      setTitle("");
      setMessage("");
      toast.success("Notification queued successfully!");
    } catch (error) {
      console.error("Failed to add notification:", error);
      toast.error("Failed to queue notification.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    const toastId = toast.loading("Sending notifications...");
    try {
      const { data } = await api.post("/send-notification");
      toast.success(
        `${data.message}. Success: ${data.success}, Failed: ${data.failed}`,
        { id: toastId }
      );
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("Failed to broadcast notifications.", { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Manage your web notifications</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actions Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <button
              onClick={handleSendNotification}
              className="w-full btn-primary flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Broadcast Now
            </button>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Sends all pending notifications to subscribed users.
            </p>
          </div>
          
          <div className="glass-card p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Service Online
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs text-gray-400">
              <span>Environment</span>
              <span className="text-white">Production</span>
            </div>
          </div>
        </div>

        {/* Form Main Area */}
        <div className="lg:col-span-2">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Create New Notification</h2>
            <form onSubmit={handleNotificationSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="e.g. New Update Available!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Detailed Message
                </label>
                <textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field min-h-[120px] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    loading 
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-white text-black hover:bg-gray-200 shadow-lg"
                  }`}
                >
                  {loading ? "Queueing..." : "Add to Queue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
