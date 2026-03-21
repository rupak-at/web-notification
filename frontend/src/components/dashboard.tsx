import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Dashboard = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="font-bold">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
