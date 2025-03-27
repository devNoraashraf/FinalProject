
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import useAuthStore from "../../store";
import img from "../assets/s.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let userDoc = await getDoc(doc(db, "users", user.uid));
      let userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData) {
        userDoc = await getDoc(doc(db, "Doctors", user.uid));
        userData = userDoc.exists() ? userDoc.data() : null;
      }
console.log(user.uid);

      if (userData) {
        login({
          uid: user.uid,
          email: user.email,
          name: userData.name,
          role: userData.role,
          profileImage: userData.profileImage,
        });

        navigate(userData.role === "doctor" ? `/DoaaDahboard` : "/profile");
      } else {
        console.error("User not found in database");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
      <div className="w-full max-w-md bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)}  className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">تسجيل الدخول</button>
        </form>
        <p className="text-center mt-4">
          ليس لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/register")}>تسجيل جديد</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;