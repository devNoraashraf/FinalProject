import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

const cookies = new Cookies();
const db = getFirestore();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile");
  const [appointments, setAppointments] = useState([]);
  const [chats, setChats] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [openDiagnosisIndex, setOpenDiagnosisIndex] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (currentUser.displayName) {
          setUserName(currentUser.displayName);
        } else {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          setUserName(userDoc.exists() ? userDoc.data().name || "مريض بدون اسم" : "مريض بدون اسم");
        }
  
        fetchPatientBookings(currentUser.email);
        fetchChats(currentUser.uid);
        fetchDiagnosis(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPatientBookings = async (patientEmail) => {
    try {
      setLoadingAppointments(true);
      const doctorsRef = collection(db, "Doctors");
      const doctorsSnapshot = await getDocs(doctorsRef);
      let allBookings = [];
  
      for (const doctorDoc of doctorsSnapshot.docs) {
        const doctorId = doctorDoc.id;
        const doctorName = doctorDoc.data().name;
        const patientBookingsRef = collection(db, "Doctors", doctorId, "PatientBookings");
        const patientQuery = query(patientBookingsRef, where("patientEmail", "==", patientEmail));
        const patientBookingsSnapshot = await getDocs(patientQuery);
  
        patientBookingsSnapshot.forEach((bookingDoc) => {
          allBookings.push({
            id: bookingDoc.id,
            doctorId,
            doctorName,
            ...bookingDoc.data(),
          });
        });
      }
      setAppointments(allBookings);
    } catch (error) {
      console.error("خطأ في جلب حجوزات المريض:", error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const fetchDiagnosis = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const diagnosisByDate = data.diagnosisByDate || {};
  
        const diagnosisArray = Object.entries(diagnosisByDate).map(([date, diagnosisText]) => {
          const matchedAppointment = appointments.find(appt => appt.date === date);
          return {
            date,
            diagnosisText,
            doctorName: matchedAppointment?.doctorName || "طبيب غير معروف"
          };
        });
  
        setDiagnosisData(diagnosisArray);
      }
    } catch (error) {
      console.error("خطأ في جلب بيانات التشخيص:", error);
    }
  };

  const fetchChats = async (uid) => {
    try {
      const chatsRef = collection(db, "Chats");
      const q = query(chatsRef, where("participants", "array-contains", uid));
      const querySnapshot = await getDocs(q);

      const chatList = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        let doctorName = data.doctorName;
  
        if (!doctorName && data.doctorUid) {
          try {
            const doctorDoc = await getDoc(doc(db, "Doctors", data.doctorUid));
            if (doctorDoc.exists()) {
              doctorName = doctorDoc.data().name || "طبيب بدون اسم";
            } else {
              doctorName = "طبيب غير معروف";
            }
          } catch {
            doctorName = "طبيب غير معروف";
          }
        }
  
        return {
          id: docSnap.id,
          ...data,
          doctorName,
        };
      }));
  
      setChats(chatList);
    } catch (error) {
      console.error("خطأ في جلب المحادثات:", error);
    }
  };

  const confirmDeleteAppointment = (doctorId, appointmentId) => {
    setAppointmentToDelete({ doctorId, appointmentId });
    setShowConfirm(true);
  };
  
  const handleConfirmedDelete = async () => {
    if (appointmentToDelete) {
      const { doctorId, appointmentId } = appointmentToDelete;
      try {
        await deleteDoc(doc(db, "Doctors", doctorId, "PatientBookings", appointmentId));
        setAppointments(prev => prev.filter(appt => !(appt.doctorId === doctorId && appt.id === appointmentId)));
      } catch (error) {
        console.error("فشل في حذف الموعد:", error);
      } finally {
        setShowConfirm(false);
        setAppointmentToDelete(null);
      }
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      cookies.remove("auth-token");
      navigate("/signIn");
    });
  };

  const toggleDiagnosisView = (index) => {
    setOpenDiagnosisIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-200">
      <div className="flex flex-col md:flex-row-reverse items-start gap-8 w-full max-w-5xl bg-gray-200">
        {/* Sidebar */}
        <div className="bg-white shadow-xl rounded-lg p-6 w-full md:w-1/3 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">⚙ الإعدادات</h2>
          <ul className="space-y-3">
            <li className="w-full p-3 bg-[#193849] text-white rounded-md text-center font-semibold cursor-pointer hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("profile")}>صفحتي</li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold transition-all duration-300 hover:bg-[#3ab0a5] cursor-pointer">
              <Link to="/change-password">🔑 تغيير كلمة المرور</Link>
            </li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold cursor-pointer transition-all duration-300 hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("appointments")}>📅 مواعيدي</li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold cursor-pointer transition-all duration-300 hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("chats")}>💬 دردشاتي</li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold cursor-pointer transition-all duration-300 hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("diagnosis")}>🧬 التشخيص</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full md:w-2/3 text-center border border-gray-200">
          {selectedTab === "profile" && (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-[#193849] pb-2">📌 ملفي الشخصي</h1>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" className="w-32 h-32 rounded-full mx-auto border-4 border-[#193849] shadow-lg object-cover" />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto border-4 border-[#193849] shadow-lg bg-blue-200 flex items-center justify-center text-4xl font-bold text-[#3ab0a5]">{userName.charAt(0)}</div>
              )}
              <h2 className="text-2xl font-bold mt-4 text-[#3ab0a5]">{userName}</h2>
              <p className="text-gray-500 text-sm">{user?.email || "لا يوجد بريد إلكتروني"}</p>
              <p className="text-gray-500 text-sm mt-1">{user?.phoneNumber || "لا يوجد رقم هاتف"}</p>
              <button onClick={handleLogout} className="mt-6 px-6 py-3 bg-[#193849] text-white font-semibold rounded-md shadow-md hover:bg-[#3ab0a5]">تسجيل الخروج</button>
            </>
          )}

          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-3xl w-full">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">تأكيد الحذف</h3>
                <p className="text-gray-600 mb-8">هل أنت متأكد أنك تريد حذف هذا الموعد؟</p>
                <div className="flex justify-center gap-6">
                  <button
                    onClick={handleConfirmedDelete}
                    className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700"
                  >
                     احذف
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "appointments" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 مواعيدي</h2>
              {loadingAppointments ? (
                <p className="text-gray-500">⏳ جاري التحميل...</p>
              ) : appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-3 rounded-md flex justify-between items-center mb-2 transition-all duration-300 hover:bg-[#3ab0a5]"
                  >
                    <span>{appt.date} - {appt.time} - مع الدكتور {appt.doctorName}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => confirmDeleteAppointment(appt.doctorId, appt.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="حذف الموعد"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">لا توجد مواعيد</p>
              )}
            </>
          )}

          {selectedTab === "chats" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 دردشاتي</h2>
              {chats.length > 0 ? (
                chats.map(chat => (
                  <div
                    key={chat.id}
                    className="bg-gray-100 p-3 rounded-md flex justify-between items-center mb-2 transition-all duration-300 hover:bg-[#3ab0a5] cursor-pointer"
                    onClick={() =>
                      navigate(`/chat/${chat.id}`, {
                        state: {
                          doctorId: chat.doctorUid,
                          doctorName: chat.doctorName
                        }
                      })
                    }
                  >
                    <div className="flex items-center gap-3">
                      {chat.doctorInfo?.profileImage ? (
                        <img
                          src={chat.doctorInfo.profileImage}
                          alt="صورة الدكتور"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#193849] text-white flex items-center justify-center text-lg font-bold">
                          {chat.doctorInfo?.name?.charAt(0) || "؟"}
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">
                          مع {chat.doctorInfo?.name || "طبيب غير معروف"}
                        </span>
                        <span className="text-xs text-gray-700">
                          {chat.lastMessage?.substring(0, 30) || "لا توجد رسائل"}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-gray-500">
                      {chat.lastMessageTime || ""}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">لا توجد محادثات</p>
              )}
            </>
          )}

          {selectedTab === "diagnosis" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-[#193849] pb-2">🧬 التشخيصات السابقة</h2>
              {diagnosisData && diagnosisData.length > 0 ? (
                diagnosisData.map((item, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 text-right shadow-sm bg-gray-50">
                    <p className="text-sm text-gray-600">📅 التاريخ: <span className="font-semibold">{item.date}</span></p>
                    <p className="text-sm text-gray-600">🩺 الدكتور: <span className="font-semibold text-[#08473a]">{item.doctorName}</span></p>
                    
                    <button
                      onClick={() => toggleDiagnosisView(index)}
                      className="mt-2 px-4 py-2 text-white bg-[#193849] rounded-md hover:bg-[#3ab0a5]"
                    >
                      {openDiagnosisIndex === index ? "إخفاء التشخيص" : "اطلع على التشخيص"}
                    </button>

                    {openDiagnosisIndex === index && (
                      <div className="mt-4 bg-white border border-[#3ab0a5] p-3 rounded-md shadow-sm text-gray-800">
                        <p>{item.diagnosisText}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">لا توجد تشخيصات مسجلة حتى الآن.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;