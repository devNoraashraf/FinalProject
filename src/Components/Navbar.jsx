
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import useAuthStore from "../../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user); // جلب بيانات المستخدم من Zustand
    const logout = useAuthStore((state) => state.logout); // دالة تسجيل الخروج
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        setDropdownOpen(!dropdownOpen);
    };
//    const doctorId=user.uid;
   
// console.log(doctorId)
    const handleNavigation = () => {
        if (user?.role === "doctor") {
            navigate(`/dashboard`);
        } else {
            navigate("/profile");
        }
        setDropdownOpen(false);
    };
    const handleLogout = () => {
        logout();
        navigate("/signIn");
        setDropdownOpen(false);
    };
    // console.log(user);


    return (
        <>
            <header className="bg-[#09243c] dark:border-gray-600 dark:bg-gray-900" dir="rtl">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} className="h-16 w-16" alt="شعار Medicross" />
                        <span className="text-2xl font-semibold text-white">Medicross</span>
                    </Link>

                    <nav>
                        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                            <div id="mega-menu-full" className="items-center font-medium w-full md:flex md:w-auto" dir="rtl">
                                <ul className="flex space-x-8 space-x-reverse text-lg font-semibold text-white">
                                    <li><Link to="/" className="transition-all duration-300 hover:text-[#4acbbf]">الرئيسية</Link></li>
                                    <li><Link to="/about" className="transition-all duration-300 hover:text-[#4acbbf]">من نحن</Link></li>
                                    <li><Link to="/DoctorList" className="transition-all duration-300 hover:text-[#4acbbf]">اطبائنا </Link></li>
                                    <li className="relative group">
                                        <Link to="/services" className="flex items-center gap-1 transition-all duration-300 hover:text-[#4acbbf]">
                                            الخدمات
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Link>
                                        <ul className="absolute left-0 hidden w-56 mt-2 space-y-2 bg-[#4acbbf] text-white rounded-lg shadow-lg group-hover:block hover:block pointer-events-auto z-50">
                                            <li><Link to="/booking" className="block px-4 py-2 transition-all duration-300 hover:bg-[#3ba99c]">حجز المواعيد</Link></li>
                                            <li><Link to="/auth" className="block px-4 py-2 transition-all duration-300 hover:bg-[#3ba99c]">استشارة طبية</Link></li>
                                            <li><Link to="/pharmacy" className="block px-4 py-2 transition-all duration-300 hover:bg-[#3ba99c]">توصيل الأدوية</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/contactUs" className="transition-all duration-300 hover:text-[#4acbbf]">اتصل بنا</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="flex items-center gap-6">
                        {!user ? (
                            <Link to="/signIn" className="px-5 py-2 text-white border-2 border-[#4acbbf] rounded-lg transition-all duration-300 hover:border-[#3ba97f] hover:text-[#3ba97f] shadow-md">تسجيل الدخول</Link>
                        ) : (
                            <>

                                <img
                                    src={user.profileImage}
                                    alt="User"
                                    onClick={handleProfileClick}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />
                                <span onClick={handleProfileClick} className="cursor-pointer font-bold text-white">
                                    {user.name}
                                </span>

                                {/* القائمة المنسدلة */}
                                {dropdownOpen && (
                                    <div className="absolute top-14 left-1/20 translate-x-[25%] bg-white shadow-lg rounded-lg w-40 py-2 border border-gray-200">
                                        <button
                                            onClick={handleNavigation}
                                            className="block w-full text-right px-4 py-2 hover:bg-gray-100"
                                        >
                                            حسابي
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-right px-4 py-2 text-red-500 hover:bg-gray-100"
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        <Link
                            to="/booking"
                            className="px-5 py-2 text-white border-2 border-[#4acbbf] rounded-lg transition-all duration-300 hover:border-[#3ba97f] hover:text-[#3ba97f] shadow-md"
                        >
                            احجز الآن
                        </Link>
                    </div>

                </div>
            </header>
        </>
    );
}

export default Navbar;
