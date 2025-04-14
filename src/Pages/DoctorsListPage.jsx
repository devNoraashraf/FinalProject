import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "/firebase-config";
import { FaArrowLeft, FaComments, FaUserMd, FaMapMarkerAlt, FaMoneyBillAlt, FaStar, FaClinicMedical, FaUserCircle } from 'react-icons/fa';

const DoctorsListPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const doctors = location.state?.doctors || [];

    const startChat = async (doctor) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert("يجب تسجيل الدخول أولاً لبدء المحادثة");
            return;
        }

        const patientId = currentUser.uid;
        const doctorId = doctor.id;
        const chatId = [patientId, doctorId].sort().join("_");

        try {
            const chatRef = doc(db, "Chats", chatId);
            const existingChat = await getDoc(chatRef);

            if (!existingChat.exists()) {
                await setDoc(doc(db, "Chats", chatId), {
                    participants: [patientId, doctorId],
                    lastMessage: "",
                    lastTimestamp: new Date(),
                    doctorInfo: {
                      id: doctorId,
                      name: doctor.name,
                      specialty: doctor.specialty,
                      profileImage: doctor.image || null
                    },
                    patientInfo: {
                      id: patientId,
                      name: currentUser.displayName || currentUser.email || "مريض",
                      profileImage: currentUser.photoURL || null
                    }
                  });
                  
            }

            navigate(`/chat/${chatId}`, {
                state: {
                    chatId,
                    doctor,
                    patientId,
                    doctorId,
                },
            });
        } catch (error) {
            console.error("فشل بدء المحادثة:", error);
            alert("حدث خطأ أثناء بدء المحادثة");
        }
    };

    // دالة لعرض صورة الطبيب أو الأيقونة الافتراضية
    const renderDoctorImage = (doctor) => {
        if (doctor.image) {
            return (
                <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = defaultIcon(doctor);
                    }}
                />
            );
        }
        return defaultIcon(doctor);
    };

    // الأيقونة الافتراضية
    const defaultIcon = (doctor) => (
        <div className="w-full h-full flex items-center justify-center bg-[#006272]/10">
            <div className="text-center">
                <FaUserCircle className="text-[#006272] text-6xl mx-auto" />
                <h3 className="text-xl font-bold mt-2 text-[#006272]">{doctor.name}</h3>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-[#006272] hover:text-[#004d5a] mb-4 transition-colors"
                        >
                            <FaArrowLeft /> العودة
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#006272]">
                            قائمة الأطباء المتاحين
                        </h1>
                        <p className="text-gray-600 mt-2">اختر الطبيب لبدء الاستشارة</p>
                    </div>
                    
                    <div className="bg-[#006272] text-white px-4 py-2 rounded-lg shadow-md">
                        <p className="font-medium">عدد الأطباء: {doctors.length}</p>
                    </div>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="max-w-7xl mx-auto">
                {doctors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <div 
                                key={doctor.id} 
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
                            >
                                {/* Doctor Image Section */}
                                <div className="h-48 w-full relative overflow-hidden">
                                    {renderDoctorImage(doctor)}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                                    </div>
                                </div>

                                {/* Doctor Details */}
                                <div className="p-5 space-y-3 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#006272]/10 p-2 rounded-full">
                                            <FaUserMd className="text-[#006272]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">التخصص</p>
                                            <p className="font-medium">{doctor.specialty}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#006272]/10 p-2 rounded-full">
                                            <FaClinicMedical className="text-[#006272]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">العيادة</p>
                                            <p className="font-medium">{doctor.clinic || "غير محدد"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#006272]/10 p-2 rounded-full">
                                            <FaMapMarkerAlt className="text-[#006272]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">الموقع</p>
                                            <p className="font-medium">{doctor.governorate}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <FaStar />
                                            <span className="font-medium">{doctor.review || '--'}</span>
                                        </div>
                                        <div className="text-[#006272] font-bold">
                                            {doctor.price || '--'} ج.م
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="px-5 pb-5">
                                    <button
                                        onClick={() => startChat(doctor)}
                                        className="w-full flex items-center justify-center gap-2 bg-[#006272] hover:bg-[#004d5a] text-white py-3 px-4 rounded-lg transition-colors duration-300"
                                    >
                                        <FaComments /> بدء المحادثة
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mx-auto w-24 h-24 bg-[#006272]/10 rounded-full flex items-center justify-center mb-4">
                            <FaUserMd className="text-[#006272] text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#006272] mb-2">لا يوجد أطباء متاحون</h3>
                        <p className="text-gray-600 mb-6">عذرًا، لا توجد نتائج مطابقة لبحثك</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-[#006272] hover:bg-[#004d5a] text-white py-2 px-6 rounded-lg inline-flex items-center gap-2 transition-colors duration-300"
                        >
                            <FaArrowLeft /> العودة للبحث
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsListPage;