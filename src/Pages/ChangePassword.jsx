import { useState } from "react";
import { auth } from "../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 تم إرسال رابط تغيير كلمة المرور إلى بريدك الإلكتروني!");
    } catch (error) {
      setMessage("❌ حدث خطأ! تأكد من صحة البريد الإلكتروني.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-5">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
          🔑 تغيير كلمة المرور
        </h1>
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleResetPassword}
          className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          إرسال رابط التغيير
        </button>
        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        <button
          onClick={() => navigate("/profile")}
          className="mt-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-all duration-300"
        >
          الرجوع إلى الصفحة الشخصية
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
