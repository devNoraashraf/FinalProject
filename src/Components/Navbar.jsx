import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import useAuthStore from "../../store";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// تعريف الألوان
const colors = {
  primary: "#006272",
  primaryLight: "#008080",
  secondary: "#e0f7fa",
  accent: "#ff7043",
  textDark: "#1a365d",
  textLight: "#f7fafc"
};

function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = () => {
    if (user?.role === "doctor") {
      navigate(`/ddashboard`);
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

  // أنيميشن للعناصر
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.05,
      color: colors.accent,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header 
      className="bg-primary text-white shadow-md sticky top-0 z-50"
      dir="rtl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <motion.img 
            src={logo} 
            className="h-16 w-16" 
            alt="شعار Medicross"
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          />
          <motion.span 
            className="text-2xl font-semibold"
            whileHover={{ color: colors.accent }}
          >
            Medicross
          </motion.span>
        </Link>

        <nav>
          <ul className="flex space-x-8 space-x-reverse text-lg font-semibold">
            {[
              { path: "/", label: "الرئيسية" },
              { path: "/about", label: "من نحن" },
              // { path: "/DoctorList", label: "أطباؤنا" },
              { path: "/services", label: "الخدمات" },
              { path: "/contactUs", label: "اتصل بنا" }
            ].map((item, i) => (
              <motion.li
                key={item.path}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={navItemVariants}
              >
                <Link to={item.path} className="block py-2 px-1">
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6 relative" ref={dropdownRef}>
          {!user ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/signIn" 
                className="px-5 py-2 border-2 border-accent rounded-lg hover:border-secondary hover:text-secondary transition-colors duration-300"
              >
                تسجيل الدخول
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleProfileClick}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src={user.profileImage || "https://via.placeholder.com/40"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  whileHover={{ borderColor: colors.accent }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="font-bold"
                  whileHover={{ color: colors.accent }}
                >
                  {user.name}
                </motion.span>
              </motion.div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute top-14 left-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      onClick={handleNavigation}
                      className="block w-full text-right px-4 py-2 hover:bg-gray-100 text-gray-800"
                      whileHover={{ backgroundColor: "#f0f0f0", paddingRight: "1.5rem" }}
                      transition={{ duration: 0.1 }}
                    >
                      حسابي
                    </motion.button>
                    <motion.button
                      onClick={handleLogout}
                      className="block w-full text-right px-4 py-2 text-red-500 hover:bg-gray-100"
                      whileHover={{ backgroundColor: "#f0f0f0", paddingRight: "1.5rem" }}
                      transition={{ duration: 0.1 }}
                    >
                      تسجيل الخروج
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
