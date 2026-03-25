import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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

  return (
    <div className="font-bold">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
