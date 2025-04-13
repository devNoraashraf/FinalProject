

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import img from "../assets/s.jpg";
import userAvatar from "../assets/avatar.png";
import doctorAvatar from "../assets/doctor-avatar.png";

// قائمة تخصصات موحدة لجميع المكونات
const UNIFIED_SPECIALTIES = [
  "قلب",
  "مسالك بولية",
  "أطفال",
  "جلدية",
  "عظام",
  "أسنان",
  "عيون",
  "مخ وأعصاب",
  "باطنة",
  "التخدير",
  "جراحة عامة",
  "نساء وتوليد"
];

const SignUp = () => {
  const [tab, setTab] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const defaultImages = {
    user: userAvatar,
    doctor: doctorAvatar,
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      if (password.length < 6) {
        throw new Error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        name: name.trim(),
        email: email.trim(),
        role: tab,
        profileImage: defaultImages[tab],
        createdAt: new Date().toISOString()
      };

      if (tab === "doctor") {
        if (!specialty) {
          throw new Error("يجب تحديد التخصص");
        }
        
        // التحقق من أن التخصص موجود في القائمة الموحدة
        const normalizedSpecialty = UNIFIED_SPECIALTIES.find(s => 
          s === specialty.trim()
        );
        
        if (!normalizedSpecialty) {
          throw new Error("التخصص المحدد غير صحيح");
        }

        userData.specialty = normalizedSpecialty;
        
        console.log("Registering doctor with data:", userData);
        await setDoc(doc(db, "Doctors", user.uid), userData);
      } else {
        await setDoc(doc(db, "users", user.uid), userData);
      }

      navigate("/signIn", { state: { registrationSuccess: true } });
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(getFriendlyError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getFriendlyError = (error) => {
    switch (error) {
      case "Firebase: Error (auth/email-already-in-use).":
        return "البريد الإلكتروني مسجل بالفعل";
      case "Firebase: Error (auth/invalid-email).":
        return "بريد إلكتروني غير صالح";
      case "Firebase: Error (auth/weak-password).":
        return "كلمة المرور ضعيفة (يجب أن تكون 6 أحرف على الأقل)";
      case "كلمة المرور يجب أن تكون 6 أحرف على الأقل":
        return error;
      case "يجب تحديد التخصص":
        return error;
      case "التخصص المحدد غير صحيح":
        return error;
      default:
        return "حدث خطأ أثناء التسجيل";
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
            <h2 className="text-2xl font-bold text-white">إنشاء حساب جديد</h2>
            <p className="text-white/90 mt-1">انضم إلى مجتمع Medicross</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 font-medium text-sm transition-colors ${
                tab === "user" 
                  ? "text-[#006272] border-b-2 border-[#006272]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab("user")}
            >
              مستخدم عادي
            </button>
            <button
              className={`flex-1 py-3 font-medium text-sm transition-colors ${
                tab === "doctor"
                  ? "text-[#006272] border-b-2 border-[#006272]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab("doctor")}
            >
              طبيب
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="p-6 space-y-5">
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
              <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

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
                minLength="6"
                required
              />
              <p className="text-xs text-gray-500 mt-1">يجب أن تكون كلمة المرور 6 أحرف على الأقل</p>
            </div>

            {tab === "doctor" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">التخصص</label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                  required
                >
                  <option value="">اختر التخصص</option>
                  {UNIFIED_SPECIALTIES.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            )}

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
                  جاري إنشاء الحساب...
                </span>
              ) : 'إنشاء حساب'}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <button 
                className="text-[#006272] font-medium hover:text-[#008080] hover:underline"
                onClick={() => navigate("/signIn")}
              >
                تسجيل الدخول
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;