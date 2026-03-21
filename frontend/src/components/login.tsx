import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSignIn = async () => {
    const details = await signInWithPopup(auth, googleProvider);
    console.log(details);
// details.user
// displayName
// email
// "secondfirst284@gmail.com"
// phoneNumber
// photoURL

    navigate("/dashboard");
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
