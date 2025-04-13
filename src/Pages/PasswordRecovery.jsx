import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import img from "../assets/s.jpg";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      setError("حدث خطأ أثناء إرسال رابط استعادة كلمة المرور. تأكد من صحة البريد الإلكتروني.");
    } finally {
      setIsLoading(false);
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
            <h2 className="text-2xl font-bold text-white">استعادة كلمة المرور</h2>
            <p className="text-white/90 mt-1">أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور</p>
          </div>

          {/* Form */}
          <form onSubmit={handlePasswordReset} className="p-6 space-y-5">
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-100"
              >
                {message}
              </motion.div>
            )}
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
                  جاري الإرسال...
                </span>
              ) : 'إرسال'}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 text-center">
            <button 
              className="text-[#006272] font-medium hover:text-[#008080] hover:underline"
              onClick={() => navigate("/signin")}
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordRecovery;
