import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { auth, db } from "../../firebase-config";
import { doc, collection, addDoc, getDocs, getDoc, deleteDoc, updateDoc, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store";
import { getAuth } from "firebase/auth";
import { FaCalendarAlt, FaClipboardList, FaCommentDots, FaUserCog, FaSignOutAlt } from "react-icons/fa";



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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;
      setLoading(true);
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      const snapshot = await getDocs(appointmentsRef);
      setAppointments(snapshot.docs.map((doc) => doc.data()));
      setLoading(false);
    };
    fetchAppointments();
  }, [doctorId]);

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate.toLocaleDateString("en-CA");

    try {
      if (!doctorId || !startTime || !endTime) {
        alert("يرجى إدخال أوقات العمل قبل تحديد الموعد.");
        return;
      }

      setLoading(true);
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      await addDoc(appointmentsRef, {
        date: formattedDate,
        startTime,
        endTime,
        isBooked: false
      });

      setAppointments([...appointments, { date: formattedDate, startTime, endTime, isBooked: false }]);
      setLoading(false);
      alert("تم إضافة الموعد بنجاح!");
    } catch (error) {
      console.error("خطأ في إضافة الموعد:", error);
      setLoading(false);
    }
    setShowCalendar(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تحديد المواعيد</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">وقت البداية</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#09243c] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">وقت النهاية</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#09243c] focus:border-transparent"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-3 bg-[#0a5372] hover:bg-[#0d2e4d] text-white rounded-lg transition"
            >
              {showCalendar ? "إخفاء التقويم" : "حدد تاريخ الموعد"}
            </button>
          </div>

          {showCalendar && (
            <div className="mt-4">
              <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
                className="w-full border rounded-lg p-2 shadow-sm mx-auto"
              />
            </div>
          )}
        </div>

        {loading && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">جاري حفظ البيانات...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// مكون صفحة المواعيد
const AppointmentsPage = () => {
  const user = useAuthStore((state) => state.user);
  const doctorId = user.uid;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;
      setLoading(true);
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      const snapshot = await getDocs(appointmentsRef);
      setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchAppointments();
  }, [doctorId]);

  const handleDelete = async (appointmentId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموعد؟")) {
      try {
        const doctorRef = doc(db, "Doctors", doctorId);
        const appointmentDoc = doc(doctorRef, "appointments", appointmentId);
        await deleteDoc(appointmentDoc);
        setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
        alert("تم حذف الموعد بنجاح!");
      } catch (error) {
        console.error("خطأ في حذف الموعد:", error);
      }
    }
  };

  const handleEdit = async (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    const newDate = prompt("أدخل التاريخ الجديد (YYYY-MM-DD):", appointment.date);
    const newStartTime = prompt("أدخل وقت البداية الجديد (HH:MM):", appointment.startTime);
    const newEndTime = prompt("أدخل وقت النهاية الجديد (HH:MM):", appointment.endTime);

    if (!newDate || !newStartTime || !newEndTime) return;

    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentDoc = doc(doctorRef, "appointments", appointmentId);
      await updateDoc(appointmentDoc, {
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
      });

      setAppointments(
        appointments.map((app) =>
          app.id === appointmentId ? { ...app, date: newDate, startTime: newStartTime, endTime: newEndTime } : app
        )
      );
      alert("تم تعديل الموعد بنجاح!");
    } catch (error) {
      console.error("خطأ في تعديل الموعد:", error);
    }
  };

  if (loading) return <div className="flex justify-center mt-10">جاري تحميل المواعيد...</div>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">مواعيدي</h2>

        {appointments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">لا توجد مواعيد مسجلة</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    التاريخ: {appointment.date}
                  </p>
                  <p className="text-gray-600">
                    الوقت: {appointment.startTime} - {appointment.endTime}
                  </p>
                  <p className={`text-sm ${appointment.isBooked ? 'text-green-600' : 'text-gray-500'}`}>
                    {appointment.isBooked ? 'محجوز' : 'متاح'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-[#0a5372] hover:bg-[#0d2e4d] text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleEdit(appointment.id)}
                  >
                    تعديل
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// مكون صفحة الحجوزات
const BookingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const doctorId = user.uid;
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!doctorId) return;
      setLoading(true);
      const doctorRef = doc(db, "Doctors", doctorId);
      const bookingsRef = collection(doctorRef, "PatientBookings");
      const snapshot = await getDocs(bookingsRef);
      const allBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const currentDate = new Date().toISOString().split("T")[0];
      const upcoming = allBookings.filter((booking) => booking.date >= currentDate);
      const past = allBookings.filter((booking) => booking.date < currentDate);

      setBookings({ upcoming, past });
      setLoading(false);
    };
    fetchBookings();
  }, [doctorId]);

  if (loading) return <div className="flex justify-center mt-10">جاري تحميل الحجوزات...</div>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">حجوزاتي</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">الحجوزات القادمة</h3>
            {bookings.upcoming.length > 0 ? (
              <ul className="space-y-3">
                {bookings.upcoming.map((booking) => (
                  <li key={booking.id} className="p-3 bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{booking.patientName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.date} - {booking.time}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        قادمة
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">لا توجد حجوزات قادمة</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">الحجوزات المنتهية</h3>
            {bookings.past.length > 0 ? (
              <ul className="space-y-3">
                {bookings.past.map((booking) => (
                  <li key={booking.id} className="p-3 bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{booking.patientName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.date} - {booking.time}
                        </p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        منتهية
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">لا توجد حجوزات منتهية</p>
            )}
          </div>
        </div>
      </div>
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
