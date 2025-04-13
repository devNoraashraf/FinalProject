

import React, { useState, useEffect, useMemo } from 'react';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config"; // تصحيح مسار الاستيراد
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarAlt, FaSearch, FaUserMd } from 'react-icons/fa';
import care1 from '../assets/care.jpg';
import care2 from '../assets/care2.png';
import care3 from '../assets/care3.avif';
import care4 from '../assets/care4.avif';

// قائمة تخصصات موحدة مع SignUp.js
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

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية",
  "البحر الأحمر", "البحيرة", "الفيوم", "الغربية",
  "الإسماعيلية", "المنوفية", "المنيا", "القليوبية"
];

const AnimatedBackground = ({ images, currentImageIndex }) => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
    <AnimatePresence mode='wait'>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </AnimatePresence>
    <div className="absolute inset-0 bg-black/30" />
  </div>
);

const ServiceTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'call', icon: <FaPhone />, label: 'مكالمة دكتور' },
    { id: 'booking', icon: <FaCalendarAlt />, label: 'حجز موعد' }
  ];

  return (
    <div className="flex justify-center gap-4 mb-8">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-medium transition-all ${
            activeTab === tab.id 
              ? 'bg-[#09243c] text-white shadow-lg' 
              : 'bg-gray-100 text-[#09243c] hover:bg-gray-200'
          }`}
        >
          {tab.icon} {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

const CallForm = ({ specialty, setSpecialty, governorates, loading }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-gray-700 mb-3 font-medium flex items-center gap-2">
        <FaUserMd /> التخصص الطبي
      </label>
      <select
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#09243c] transition-all"
        required
        disabled={loading}
      >
        <option value="">اختر التخصص</option>
        {UNIFIED_SPECIALTIES.map((spec) => (
          <option key={spec} value={spec}>{spec}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-gray-700 mb-3 font-medium">
        المحافظة
      </label>
      <select
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#09243c] transition-all"
        disabled={loading}
      >
        <option value="">اختر المحافظة (اختياري)</option>
        {governorates.map((gov) => (
          <option key={gov} value={gov}>{gov}</option>
        ))}
      </select>
    </div>
  </div>
);

const BookingForm = ({ loading }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="md:col-span-2">
      <label className="block text-gray-700 mb-3 font-medium flex items-center gap-2">
        <FaSearch /> اسم الدكتور أو المستشفى
      </label>
      <input
        type="text"
        placeholder="ابحث باسم الدكتور أو المستشفى"
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#09243c] transition-all"
        disabled={loading}
      />
    </div>
    <div>
      <label className="block text-gray-700 mb-3 font-medium">
        التخصص
      </label>
      <select
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#09243c] transition-all"
        disabled={loading}
      >
        <option value="">اختر التخصص (اختياري)</option>
        {UNIFIED_SPECIALTIES.map((spec) => (
          <option key={spec} value={spec}>{spec}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-gray-700 mb-3 font-medium">
        المنطقة
      </label>
      <select
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#09243c] transition-all"
        disabled={loading}
      >
        <option value="">اختر المنطقة (اختياري)</option>
      </select>
    </div>
  </div>
);

const SearchButton = ({ loading }) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full bg-gradient-to-r from-[#006272] to-[#0b3a5c] text-white py-4 px-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
    disabled={loading}
  >
    {loading ? (
      <>
        <svg className="animate-spin h-5 w-5 text-[#eca516]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        جاري البحث...
      </>
    ) : (
      <>
        <FaSearch /> ابحث الآن
      </>
    )}
  </motion.button>
);

const BookingComponent = () => {
    const [activeTab, setActiveTab] = useState('call');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [specialty, setSpecialty] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const images = useMemo(() => [care1, care2, care3, care4], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (activeTab === 'call' && !specialty) {
                throw new Error("يجب اختيار التخصص أولاً");
            }

            let q;
            if (activeTab === 'call') {
                // البحث الدقيق بالتخصص
                q = query(
                    collection(db, "Doctors"),
                    where("specialty", "==", specialty.trim())
                );
            } else {
                // البحث العام (يمكن تطويره)
                q = query(collection(db, "Doctors"));
            }

            const querySnapshot = await getDocs(q);
            const doctorsList = querySnapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                // إضافة أي حقول إضافية تحتاجها
            }));

            console.log("Found doctors:", doctorsList);

            if (doctorsList.length === 0) {
                setError("لا يوجد أطباء متاحين حسب بحثك");
                return;
            }

            navigate('/doctors', { 
                state: { 
                    doctors: doctorsList,
                    searchType: activeTab,
                    searchQuery: specialty 
                } 
            });
        } catch (error) {
            console.error("Error searching doctors:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const startChat = async (doctor) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert("يجب تسجيل الدخول أولاً لبدء المحادثة");
            navigate('/signIn');
            return;
        }

        const patientId = currentUser.uid;
        const doctorId = doctor.id;
        const chatId = [patientId, doctorId].sort().join("_");

        try {
            const chatRef = doc(db, "Chats", chatId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                await setDoc(chatRef, {
                    participants: [patientId, doctorId],
                    lastMessage: "",
                    lastTimestamp: new Date(),
                    doctorInfo: {
                        id: doctorId,
                        name: doctor.name,
                        specialty: doctor.specialty,
                        profileImage: doctor.profileImage
                    },
                    patientInfo: {
                        id: patientId,
                        name: currentUser.displayName || "مريض"
                    }
                });
            }

            navigate(`/chat/${chatId}`);
        } catch (error) {
            console.error("Error starting chat:", error);
            alert("حدث خطأ أثناء بدء المحادثة");
        }
    };

    return (
        <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden bg-gray-100">
            <AnimatedBackground images={images} currentImageIndex={currentImageIndex} />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white/95 rounded-2xl p-8 w-[90%] max-w-4xl shadow-2xl z-10 mx-4 my-8"
            >
                <h1 className="text-3xl font-bold text-center text-[#09243c] mb-8">
                    {activeTab === 'call' ? 'الاستشارات الطبية' : 'حجز المواعيد'}
                </h1>
                
                <ServiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <form onSubmit={handleSearch} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {activeTab === 'call' ? (
                        <CallForm 
                            specialty={specialty} 
                            setSpecialty={setSpecialty} 
                            governorates={governorates} 
                            loading={loading} 
                        />
                    ) : (
                        <BookingForm loading={loading} />
                    )}

                    <SearchButton loading={loading} />
                </form>

                {loading && (
                    <div className="text-center mt-8">
                        <p className="text-[#09243c] animate-pulse">جاري تحميل النتائج...</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default React.memo(BookingComponent);