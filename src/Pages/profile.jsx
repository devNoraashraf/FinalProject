import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import useAuthStore from "../../store";
const cookies = new Cookies();

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  
 console.log(user.name);
 console.log(user);

  const handleLogout = () => {
    auth.signOut().then(() => {
      cookies.remove("auth-token");
      navigate("/signIn");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-5">
      <div className="flex flex-col md:flex-row-reverse items-start gap-8 w-full max-w-5xl">

        {/* القائمة الجانبية */}
        <div className="bg-white shadow-xl rounded-lg p-6 w-full md:w-1/3 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">⚙️ الإعدادات</h2>
          <ul className="space-y-3">
            <li className="w-full p-3 bg-blue-600 text-white rounded-md text-center font-semibold transition-all duration-300 hover:bg-blue-700 cursor-pointer">
              صفحتي
            </li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold transition-all duration-300 hover:bg-gray-200 cursor-pointer">
              <Link to="/change-password">🔑 تغيير كلمة المرور</Link>
            </li>
          </ul>
        </div>

        {/* كارد البروفايل */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full md:w-2/3 text-center border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
            📌 ملفي الشخصي
          </h1>

          {/* صورة أو أفاتار */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700">
              {user?.displayName ? user.name.charAt(0) : "م"}
            </div>
          )}

          <h2 className="text-2xl font-bold mt-4 text-gray-800">{user?.name || "مريض مجهول"}</h2>
          <p className="text-gray-500 text-sm">{user?.email || "لا يوجد بريد إلكتروني"}</p>
          <p className="text-gray-500 text-sm mt-1">{user?.phoneNumber || "لا يوجد رقم هاتف"}</p>
          <p className="text-gray-500 text-sm mt-1">
            🗓️ تاريخ التسجيل: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "غير متوفر"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-all duration-300"
          >
            تسجيل الخروج
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
