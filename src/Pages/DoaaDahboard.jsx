import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { auth, db } from "../../firebase-config";
import { doc, collection, addDoc, getDocs,setDoc, getDoc, deleteDoc, updateDoc, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store";
import { getAuth } from "firebase/auth";
import { FaCalendarAlt, FaClipboardList, FaCommentDots, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import Modal from 'react-modal'; // أو استخدمي مكون خاص

Modal.setAppElement('#root'); // مهم لو بتستخدمي React Modal


const Sidebar = ({ setPage, page }) => {
  const user = useAuthStore((state) => state.user);
  const doctorId = user.uid;
  const [doctorName, setDoctorName] = useState("...جاري التحميل");
  const [doctorImage, setDoctorImage] = useState("");

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorId) return;
      try {
        const doctorRef = doc(db, "Doctors", doctorId);
        const docSnap = await getDoc(doctorRef);
        if (docSnap.exists()) {
          setDoctorName(docSnap.data().name);
          setDoctorImage(docSnap.data().profileImage);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات الطبيب:", error);
      }
    };
    fetchDoctorData();
  }, [doctorId]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#09243c] to-[#006272] text-white p-3 h-screen w-[250px] sticky top-0">
      <img
        src={doctorImage || "https://via.placeholder.com/150"}
        alt="Doctor"
        className="rounded-full mx-auto w-20 h-20 object-cover border-2 border-white"
      />
      <h4 className="text-center mt-2 text-lg font-semibold">{doctorName}</h4>
      <nav className="mt-6">
        <ul className="flex flex-col gap-2">
          <li>
            <button
              className={`w-full py-2 rounded flex items-center gap-3 transition ${page === "dashboard" ? "bg-white/10 text-white" : " hover: bg-white/10"}` }
              onClick={() => setPage("dashboard")}
            >
              <FaCalendarAlt /> <span>تحديد المواعيد</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 rounded flex items-center gap-3 transition ${page === "appointments" ? "bg-white/10 text-white" : " hover:bg-white/10"}`}
              onClick={() => setPage("appointments")}
            >
              <FaClipboardList /> <span>مواعيدي</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 rounded flex items-center gap-3 transition ${page === "BookingsPage" ? "bg-white/10 text-white" : " hover:bg-white/10"}`}
              onClick={() => setPage("BookingsPage")}
            >
              <FaClipboardList /> <span>حجوزاتي</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 rounded flex items-center gap-3 transition ${page === "chats" ? "bg-white/10 text-white" : " hover:bg-white/10"}`}
              onClick={() => setPage("chats")}
            >
              <FaCommentDots /> <span>المحادثات</span>
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 rounded flex items-center gap-3 transition ${page === "DoctorProfile" ? "bg-white/10 text-white" : " hover:bg-white/10"}`}
              onClick={() => setPage("DoctorProfile")}
            >
              <FaUserCog /> <span>إعدادات الحساب</span>
            </button>
          </li>
        </ul>
        <li>
          <button
            onClick={async () => {
              try {
                await auth.signOut();
                window.location.href = "/signIn";
              } catch (error) {
                console.error("فشل تسجيل الخروج:", error);
              }
            }}
            className="w-full py-2 rounded flex items-center gap-3 transition bg-red-600 hover:bg-red-700"
          >
            <FaSignOutAlt /> <span>تسجيل الخروج</span>
          </button>
        </li>
      </nav>
    </div>
  );
};











// مكون صفحة المحادثات
const ChatsPage = ({ doctorName }) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const q = query(
        collection(db, "Chats"),
        where("participants", "array-contains", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatList);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.patientInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center mt-10">جاري تحميل المحادثات...</div>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">المحادثات</h2>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="ابحث باسم المريض..."
            className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#09243c] focus:border-transparent"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-3 text-gray-400">
            <i className="fas fa-search"></i>
          </span>
        </div>

        {filteredChats.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">لا توجد محادثات متاحة حالياً</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredChats.map((chat) => (
              <li
                key={chat.id}
                className="p-4 bg-gray-50 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition flex justify-between items-center"
                onClick={() =>
                  navigate(`/chat/${chat.id}`, {
                    state: {
                      doctorId: getAuth().currentUser.uid,
                      doctor: { name: doctorName },
                    },
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {chat.patientAvatar ? (
                      <img src={chat.patientAvatar} alt="Patient" className="w-full h-full object-cover" />
                    ) : (
                      <i className="fas fa-user text-gray-500 text-xl"></i>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{chat.patientInfo?.name || "مريض"}</p>
                    <p className="text-sm text-gray-500">
                      {chat.lastMessage?.substring(0, 30) || "لا توجد رسائل بعد..."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {chat.lastMessageTime || ""}
                  </span>
                  {chat.unreadCount?.[getAuth().currentUser.uid] > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                      {chat.unreadCount[getAuth().currentUser.uid]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// مكون لوحة تحكم الطبيب
const DoctorDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const doctorId = user.uid;
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      const snapshot = await getDocs(appointmentsRef);
      setAppointments(snapshot.docs.map((doc) => doc.data()));
    };
    fetchAppointments();
  }, [doctorId]);

  const handleDateChange = (selectedDate) => {
    if (!startTime || !endTime) {
      alert("يرجى إدخال وقت البداية والنهاية قبل تحديد التاريخ.");
      return;
    }
    setDate(selectedDate);
    setShowConfirmModal(true);
    setShowCalendar(false);
  };

  const handleConfirmAdd = async () => {
    const formattedDate = date.toLocaleDateString("en-CA");

    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      await addDoc(appointmentsRef, { date: formattedDate, startTime, endTime, isBooked: false });
      setAppointments([...appointments, { date: formattedDate, startTime, endTime, isBooked: false }]);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("خطأ في إضافة الموعد:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[500px] text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">حدد مواعيدك</h2>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* وقت البداية */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">وقت البداية</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#4acbbf]"
            />
          </div>

          {/* وقت النهاية */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">وقت النهاية</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#4acbbf]"
            />
          </div>

          {/* زر تحديد التاريخ */}
          <div>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full py-2 bg-[#0a5372] hover:bg-[#0d2e4d] text-white font-medium rounded-xl transition-all duration-200"
            >
              {showCalendar ? "إخفاء التاريخ" : "ادخل التاريخ"}
            </button>
          </div>

          {/* الكاليندر */}
          {showCalendar && (
            <div className="flex justify-center">
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="border rounded-xl p-2 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* مودال تأكيد الموعد */}
        <Modal
          isOpen={showConfirmModal}
          onRequestClose={() => setShowConfirmModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-lg mx-auto text-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">تأكيد إضافة الموعد</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            سيتم إضافة الموعد التالي:
            <br />
            <span className="font-semibold text-[#09243c]">
              {date.toLocaleDateString()} من {startTime} إلى {endTime}
            </span>
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
              onClick={() => setShowConfirmModal(false)}
            >
              إلغاء
            </button>
            <button
              className="px-4 py-2 bg-[#4acbbf] hover:bg-[#3ab0a7] text-white font-semibold rounded-lg transition"
              onClick={handleConfirmAdd}
            >
              تأكيد
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
// مكون صفحة المواعيد
const AppointmentsPage = () => {
  const user = useAuthStore((state) => state.user);
  const doctorId = user?.uid;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ date: "", startTime: "", endTime: "" });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      const snapshot = await getDocs(appointmentsRef);
      setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("فشل تحميل المواعيد:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfirm = async () => {
    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentDoc = doc(doctorRef, "appointments", editId);
      await updateDoc(appointmentDoc, editData);
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === editId ? { ...appointment, ...editData } : appointment
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("خطأ في تعديل الموعد:", error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentDoc = doc(doctorRef, "appointments", appointmentId);
      await deleteDoc(appointmentDoc);
      setAppointments(appointments.filter((a) => a.id !== appointmentId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("خطأ في حذف الموعد:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[500px] max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">مواعيدي</h2>

        <ul className="divide-y divide-gray-200">
          {loading ? (
            <li className="text-gray-500 p-3 animate-pulse">جاري تحميل المواعيد...</li>
          ) : appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li
                key={appointment.id}
                 className="p-4 bg-gray-50 rounded-lg shadow-md mb-4 text-center"
              >
                {editId === appointment.id ? (
                  <>
                    <input
                      type="date"
                      className="border rounded p-1 w-full mb-2"
                      value={editData.date}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                    />
                    <input
                      type="time"
                      className="border rounded p-1 w-full mb-2"
                      value={editData.startTime}
                      onChange={(e) => setEditData({ ...editData, startTime: e.target.value })}
                    />
                    <input
                      type="time"
                      className="border rounded p-1 w-full mb-2"
                      value={editData.endTime}
                      onChange={(e) => setEditData({ ...editData, endTime: e.target.value })}
                    />
                    <button
                      className="bg-[#4acbbf]  text-white px-4 py-2 rounded mt-2"
                      onClick={handleUpdateConfirm}
                    >
                      تأكيد التعديل
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-700 font-medium text-lg ">
                      D: {appointment.date} T: {appointment.startTime} - {appointment.endTime}
                    </span>
                    <div className="flex justify-center space-x-3 pt-3">
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 rounded-lg m-3 text-center"
                        onClick={() => setConfirmDeleteId(appointment.id)}
                      >
                        حذف
                      </button>
                      <button
                        className="bg-[#0a5372] hover:bg-[#0d2e4d] text-white text-sm px-4 py-2 rounded-lg m-3"
                        onClick={() => {
                          setEditId(appointment.id);
                          setEditData({
                            date: appointment.date,
                            startTime: appointment.startTime,
                            endTime: appointment.endTime,
                          });
                        }}
                      >
                        تعديل
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-3">لا توجد مواعيد</li>
          )}
        </ul>

        {/* Modal الحذف */}
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
              <p className="text-lg mb-4">هل تريد حذف هذا الموعد؟</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  إلغاء
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(confirmDeleteId)}
                >
                  نعم
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// مكون صفحة الحجوزات

const BookingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const doctorId = user?.uid;
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [existingDiagnoses, setExistingDiagnoses] = useState({});
  const [openDiagnosisInputs, setOpenDiagnosisInputs] = useState({});
  const [diagnosisInputs, setDiagnosisInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDiagnosis, setPendingDiagnosis] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!doctorId) return;

      const doctorRef = doc(db, "Doctors", doctorId);
      const bookingsRef = collection(doctorRef, "PatientBookings");
      const snapshot = await getDocs(bookingsRef);
      const allBookings = snapshot.docs.map((doc) => doc.data());

      const currentDate = new Date().toISOString().split("T")[0];
      const upcoming = allBookings.filter((booking) => booking.date >= currentDate);
      const past = allBookings.filter((booking) => booking.date < currentDate);

      setBookings({ upcoming, past });

      const diagnosisPromises = allBookings.map(async (booking) => {
        const patientDocRef = doc(db, "users", booking.UserId);
        const patientSnap = await getDoc(patientDocRef);
        if (patientSnap.exists()) {
          const patientData = patientSnap.data();
          const key = `${booking.UserId}_${booking.date}`;
          return { key, value: patientData?.diagnosisByDate?.[booking.date] || null };
        }
        return null;
      });

      const diagnosisResults = await Promise.all(diagnosisPromises);
      const diagnosisMap = {};
      diagnosisResults.forEach((item) => {
        if (item) diagnosisMap[item.key] = item.value;
      });
      setExistingDiagnoses(diagnosisMap);
      setLoading(false);
    };

    fetchBookings();
  }, [doctorId]);

  const handleDiagnosisSave = async (patientId, date) => {
    const key = `${patientId}_${date}`;
    try {
      const diagnosisRef = doc(db, "users", patientId);
      await setDoc(
        diagnosisRef,
        {
          diagnosisByDate: {
            [date]: diagnosisInputs[key],
          },
        },
        { merge: true }
      );

      setExistingDiagnoses((prev) => ({
        ...prev,
        [key]: diagnosisInputs[key],
      }));

      setOpenDiagnosisInputs((prev) => ({
        ...prev,
        [key]: false,
      }));
    } catch (error) {
      console.error("فشل حفظ التشخيص:", error);
      alert("حدث خطأ أثناء حفظ التشخيص");
      setOpenDiagnosisInputs((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  const renderBookingItem = (booking, index, isPast = false) => {
    const patientId = booking.UserId;
    const bookingDate = booking.date;
    const uniqueKey = `${patientId}_${bookingDate}`;

    return (
      <li key={index} className="p-4 bg-gray-50 rounded-xl shadow-md mb-4 text-right space-y-3">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4 text-gray-700 font-medium text-sm sm:text-base">
          <div><span className="font-semibold">التاريخ:</span> {booking.date}</div>
          <div><span className="font-semibold">الوقت:</span> {booking.time}</div>
          <div className="sm:col-span-2"><span className="font-semibold">المريض:</span> {booking.patientName}</div>
        </div>

        {openDiagnosisInputs[uniqueKey] ? (
          <div className="space-y-2 mt-2">
            <input
              type="text"
              placeholder="أدخل التشخيص"
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={diagnosisInputs[uniqueKey] || ""}
              onChange={(e) =>
                setDiagnosisInputs({
                  ...diagnosisInputs,
                  [uniqueKey]: e.target.value,
                })
              }
            />
            <button
              className="w-full bg-[#4acbbf] text-white py-2 rounded-lg transition"
              onClick={() => {
                setPendingDiagnosis({ patientId, date: bookingDate });
                setShowConfirmModal(true);
              }}
            >
              حفظ التشخيص
            </button>
          </div>
        ) : (
          <button
            className="w-full bg-[#0a5372] hover:bg-[#0d2e4d] text-white py-2 rounded-lg transition"
            onClick={() => {
              setOpenDiagnosisInputs((prev) => ({
                ...prev,
                [uniqueKey]: true,
              }));

              if (existingDiagnoses[uniqueKey]) {
                setDiagnosisInputs((prev) => ({
                  ...prev,
                  [uniqueKey]: existingDiagnoses[uniqueKey],
                }));
              }
            }}
          >
            {existingDiagnoses[uniqueKey] ? "تعديل التشخيص" : "إضافة تشخيص"}
          </button>
        )}
      </li>
    );
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[500px] max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">حجوزاتي</h2>

        <h4 className="text-lg font-semibold text-gray-700 mt-4">الحجوزات القادمة</h4>
        <ul className="divide-y divide-gray-200 mb-4">
          {loading ? (
            <li className="text-gray-500 p-3">جاري تحميل الحجوزات...</li>
          ) : bookings.upcoming.length > 0 ? (
            bookings.upcoming.map((booking, i) => renderBookingItem(booking, i))
          ) : (
            <li className="text-gray-500 p-3">لا توجد حجوزات قادمة</li>
          )}
        </ul>

        <h4 className="text-lg font-semibold text-gray-700 mt-4">الحجوزات المنتهية</h4>
        <ul className="divide-y divide-gray-200 mb-4">
          {loading ? (
            <li className="text-gray-500 p-3">جاري تحميل الحجوزات...</li>
          ) : bookings.past.length > 0 ? (
            bookings.past.map((booking, i) => renderBookingItem(booking, i, true))
          ) : (
            <li className="text-gray-500 p-3">لا توجد حجوزات منتهية</li>
          )}
        </ul>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">تأكيد الحفظ</h2>
            <p className="text-gray-600 mb-6">هل تريد حفظ التشخيص؟</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-[#4acbbf] text-white rounded-lg hover:bg-[#3bb1a8]"
                onClick={async () => {
                  const { patientId, date } = pendingDiagnosis;
                  await handleDiagnosisSave(patientId, date);
                  setShowConfirmModal(false);
                  setPendingDiagnosis(null);
                }}
              >
                تأكيد
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



// مكون صفحة الملف الشخصي
const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const user = useAuthStore((state) => state.user);
  const doctorId = user.uid;

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorId) return;
      try {
        const docRef = doc(db, "Doctors", doctorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor(docSnap.data());
          setFormData(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        console.error("خطأ في تحميل البيانات:", error);
        setLoading(false);
      }
    };
    fetchDoctorData();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, "Doctors", doctorId);
      await updateDoc(docRef, formData);
      setDoctor(formData);
      setEditing(false);
      alert("تم تحديث البيانات بنجاح!");
    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error);
    }
  };

  if (loading) return <div className="flex justify-center mt-10">جاري تحميل البيانات...</div>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <img
            src={doctor?.profileImage || "https://via.placeholder.com/150"}
            alt="Doctor"
            className="w-28 h-28 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{doctor?.name}</h2>
          <p className="text-gray-500 mt-1">{doctor?.specialty}</p>
        </div>

        {editing ? (
          <div className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#09243c]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة</label>
                <input
                  type="text"
                  name="governorate"
                  value={formData.governorate || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#09243c]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#09243c]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">سعر الحجز</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#09243c]"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-[#09243c] hover:bg-[#0d2e4d] text-white py-2 px-6 rounded-lg transition"
              >
                حفظ التغييرات
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">الاسم:</p>
                <p className="text-gray-800">{doctor?.name}</p>
              </div>
              <div>
                <p className="font-medium">المحافظة:</p>
                <p className="text-gray-800">{doctor?.governorate}</p>
              </div>
              <div>
                <p className="font-medium">التخصص:</p>
                <p className="text-gray-800">{doctor?.specialty}</p>
              </div>
              <div>
                <p className="font-medium">سعر الحجز:</p>
                <p className="text-gray-800">{doctor?.price} جنيه</p>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 w-full bg-[#0a5372] hover:bg-[#0d2e4d] text-white py-3 px-4 rounded-lg transition"
            >
              تعديل البيانات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// مكون الداشبورد الرئيسي
const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const [page, setPage] = useState("dashboard");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    if (user?.displayName) {
      setDoctorName(user.displayName);
    } else if (user?.uid) {
      // إذا لم يكن هناك displayName، نبحث عن اسم الطبيب في Firestore
      const fetchDoctorName = async () => {
        try {
          const doctorRef = doc(db, "Doctors", user.uid);
          const docSnap = await getDoc(doctorRef);
          if (docSnap.exists()) {
            setDoctorName(docSnap.data().name);
          }
        } catch (error) {
          console.error("Error fetching doctor name:", error);
        }
      };
      fetchDoctorName();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      <Sidebar setPage={setPage} page={page} />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {page === "dashboard" && <DoctorDashboard />}
        {page === "appointments" && <AppointmentsPage />}
        {page === "BookingsPage" && <BookingsPage />}
        {page === "DoctorProfile" && <DoctorProfile />}
        {page === "chats" && <ChatsPage doctorName={doctorName} />}
      </main>
    </div>
  );
};

export default DashboardPage;
