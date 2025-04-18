import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { auth, db } from "../../firebase-config";
import useAuthStore from "../../store";
import img from "../assets/s.jpg";
import Cookies from "universal-cookie"; // تم إضافته

const cookies = new Cookies(); // تهيئة الكوكيز

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let userDoc = await getDoc(doc(db, "users", user.uid));
      let userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData) {
        userDoc = await getDoc(doc(db, "Doctors", user.uid));
        userData = userDoc.exists() ? userDoc.data() : null;
      }

      if (userData) {
        login({
          uid: user.uid,
          email: user.email,
          name: userData.name,
          role: userData.role,
          profileImage: userData.profileImage,
        });

        // حفظ نوع المستخدم في الكوكيز
        cookies.set("userType", userData.role, { path: "/" });

        // التوجيه حسب الدور
        navigate(userData.role === "doctor" ? `/ddashboard` : "/profile");
      } else {
        setError("المستخدم غير موجود ");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(getFriendlyError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getFriendlyError = (error) => {
    switch (error) {
      case "Firebase: Error (auth/user-not-found).":
        return "البريد الإلكتروني غير مسجل";
      case "Firebase: Error (auth/wrong-password).":
        return "كلمة المرور غير صحيحة";
      case "Firebase: Error (auth/too-many-requests).":
        return "تم إجراء محاولات كثيرة، يرجى المحاولة لاحقاً";
      default:
        return "حدث خطأ أثناء تسجيل الدخول";
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${img})`,
        direction: 'rtl'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-l from-[#006272] to-[#008080] p-6 text-center">
            <h2 className="text-2xl font-bold text-white">تسجيل الدخول</h2>
            <p className="text-white/90 mt-1">مرحباً بعودتك إلى Medicross</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                placeholder="example@domain.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                className="text-xs text-[#006272] hover:text-[#008080] mt-1 float-left"
                onClick={() => navigate("/password-recovery")}
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition duration-300 ${
                isLoading ? 'bg-[#008080]/90' : 'bg-gradient-to-l from-[#008080] to-[#006272] hover:from-[#006272] hover:to-[#004d5a]'
              } shadow-md`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري تسجيل الدخول...
                </span>
              ) : 'تسجيل الدخول'}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              ليس لديك حساب؟{' '}
              <button 
                className="text-[#006272] font-medium hover:text-[#008080] hover:underline"
                onClick={() => navigate("/register")}
              >
                إنشاء حساب جديد
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
