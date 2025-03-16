import { useState, useEffect } from "react";
import { auth, provider } from "/firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { FcGoogle } from "react-icons/fc";

// استيراد الصور المتغيرة
import care1 from "../assets/care.jpg";
import care2 from "../assets/care2.png";
import care3 from "../assets/care3.avif";
import care4 from "../assets/care4.avif";

const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [care1, care2, care3, care4];

  // تغيير الصورة كل 4 ثوانٍ بحركة انزلاق
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const signWthGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-2">
      {/* القسم الأيسر: حركة انزلاق الصور */}
      <div className="relative overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className="w-full h-screen object-cover"
            />
          ))}
        </div>
      </div>

      {/* القسم الأيمن: تسجيل الدخول */}
      <div className="flex flex-col justify-center items-center bg-white shadow-xl px-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">مرحبًا بك!</h1>
        <p className="text-gray-700 mb-6 text-lg">
          قم بتسجيل الدخول للاستشارة مع طبيبك بسهولة
        </p>

        <button
          onClick={signWthGoogle}
          className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FcGoogle className="text-2xl mr-3" />
          <span className="text-lg font-semibold">تسجيل الدخول بجوجل</span>
        </button>

        <p className="text-gray-600 text-sm mt-5">
          بالضغط على تسجيل الدخول، فأنت توافق على{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">
            الشروط والأحكام
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Auth;
