import { useState } from "react";
import { auth } from "../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FiMail, FiArrowLeft, FiKey } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: "الرجاء إدخال البريد الإلكتروني", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ 
        text: "تم إرسال رابط تغيير كلمة المرور إلى بريدك الإلكتروني بنجاح", 
        type: "success" 
      });
    } catch (error) {
      setMessage({ 
        text: "حدث خطأ: تأكد من صحة البريد الإلكتروني أو حاول لاحقاً", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-[#e0f2f1] flex items-center justify-center p-4 font-[Tajawal]">
      <div className="w-full max-w-md">
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#006272]/10 rounded-full flex items-center justify-center">
            <FiKey className="text-[#006272] text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-[#006272] mb-2">تغيير كلمة المرور</h1>
          <p className="text-gray-600">أدخل بريدك الإلكتروني لاستلام رابط التغيير</p>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <form onSubmit={handleResetPassword} className="p-6 md:p-8">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006272] focus:border-[#006272] outline-none transition-all"
                />
              </div>
            </div>

            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === "success" 
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                isLoading
                  ? "bg-[#006272]/70 cursor-not-allowed"
                  : "bg-[#006272] hover:bg-[#004d5a]"
              } text-white shadow-md`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <FaPaperPlane /> إرسال رابط التغيير
                </>
              )}
            </button>
          </form>

          <div className="px-6 pb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-[#006272] hover:text-[#004d5a] transition-colors"
            >
              <FiArrowLeft /> العودة
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>إذا واجهتك مشكلة، يرجى التواصل مع فريق الدعم</p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
