import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaTrash, FaEdit } from "react-icons/fa";

const cookies = new Cookies();
const db = getFirestore();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile");
  const [appointments, setAppointments] = useState([]);
  const [chats, setChats] = useState([]);

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
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPatientBookings = async (patientEmail) => {
    try {
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
            doctorName,
            ...bookingDoc.data(),
          });
        });
      }
      setAppointments(allBookings);
    } catch (error) {
      console.error("خطأ في جلب حجوزات المريض:", error);
    }
  };

  const fetchChats = async (uid) => {
    try {
      const chatsRef = collection(db, "Chats");
      const q = query(chatsRef, where("participants", "array-contains", uid));
      const querySnapshot = await getDocs(q);

      const chatList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList);
    } catch (error) {
      console.error("خطأ في جلب المحادثات:", error);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      cookies.remove("auth-token");
      navigate("/signIn");
    });
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(appt => appt.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-200">
      <div className="flex flex-col md:flex-row-reverse items-start gap-8 w-full max-w-5xl bg-gray-200">
        {/* القائمة الجانبية */}
        <div className="bg-white shadow-xl rounded-lg p-6 w-full md:w-1/3 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">⚙ الإعدادات</h2>
          <ul className="space-y-3">
            <li className="w-full p-3 bg-[#193849] text-white rounded-md text-center font-semibold cursor-pointer hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("profile")}>صفحتي</li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold transition-all duration-300 hover:bg-[#3ab0a5] cursor-pointer">
              <Link to="/change-password">🔑 تغيير كلمة المرور</Link>
            </li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold cursor-pointer transition-all duration-300 hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("appointments")}>📅 مواعيدي</li>
            <li className="w-full p-3 bg-gray-100 text-gray-800 rounded-md text-center font-semibold cursor-pointer transition-all duration-300 hover:bg-[#3ab0a5]" onClick={() => setSelectedTab("chats")}>💬 دردشاتي</li>
          </ul>
        </div>

        {/* المحتوى */}
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

          {selectedTab === "appointments" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 مواعيدي</h2>
              {appointments.length > 0 ? appointments.map((appt, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-md flex justify-between items-center mb-2 transition-all duration-300 hover:bg-[#3ab0a5]">
                  <span>{appt.date} - {appt.time} - مع الدكتور {appt.doctorName}</span>
                </div>
              )) : <p className="text-gray-500">لا توجد مواعيد</p>}
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
                    onClick={() => navigate(`/chat/${chat.id}`, {
                      state: {
                        doctorId: chat.doctorUid,
                        doctorName: chat.doctorName
                      }
                    })}
                  >
                    <span>مع {chat.doctorName || "طبيب غير معروف"} - {chat.lastMessage?.substring(0, 30) || "لا توجد رسائل"}</span>
                    <span className="text-sm text-gray-500">{chat.lastMessageTime || ""}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">لا توجد محادثات</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
