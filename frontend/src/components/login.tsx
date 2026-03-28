import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const details = await signInWithPopup(auth, googleProvider);
      const token = await details.user.getIdToken();

      const res = await fetch("http://localhost:4001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          details: {
            name: details.user.displayName,
            email: details.user.email,
            phone_number: details.user.phoneNumber,
            photo_url: details.user.photoURL,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.token) {
        console.error("Login failed", data);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="text-white font-bold text-center">
      <button
        onClick={handleSignIn}
        className="bg-gray-800 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-700"
      >
        Login With Google
      </button>
    </div>
  );
};

export default Login;
