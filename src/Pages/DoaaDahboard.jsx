
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { auth, db } from "../../firebase-config";
import { doc, collection, addDoc, getDocs ,getDoc,deleteDoc,updateDoc} from "firebase/firestore";
import { useParams } from "react-router-dom";

import useAuthStore from "../../store";


 // استخراج doctorId من الرابط


const Sidebar = ({ setPage }) => {
  
  const user = useAuthStore((state) => state.user);
    console.log(user);
    
  const doctorId=user.uid;

  const [doctorName, setDoctorName] = useState("...جاري التحميل");
  const [doctorimage, setDoctorImage] = useState();

  useEffect(() => {
    const fetchDoctorName = async () => {
      if (!doctorId) return;
      try {
        const doctorRef = doc(db, "Doctors", doctorId);
        const docSnap = await getDoc(doctorRef);
        if (docSnap.exists()) {
          setDoctorName(docSnap.data().name); 
          setDoctorImage(docSnap.data().profileImage); 
        } else {
          setDoctorName("اسم غير متوفر");
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات الطبيب:", error);
        setDoctorName("خطأ في تحميل الاسم");
      }
    };
    fetchDoctorName();
  }, [doctorId]);

  return (
    <div className="flex flex-col bg-gray-900 text-white p-3 h-screen w-[250px]">
      <img
        src={doctorimage || "https://via.placeholder.com/150"}
        alt="Doctor"
        className="rounded-full mx-auto w-20"
      />
      <h4 className="text-center mt-2">{doctorName}</h4>
      <nav className="mt-4">
        <ul className="flex flex-col gap-2">
          <li>
            <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded" onClick={() => setPage("dashboard")}>
              تحديد المواعيد
            </button>
          </li>
          <li>
            <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded" onClick={() => setPage("appointments")}>
              مواعيدي
            </button>
          </li>
          <li>
            <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded" onClick={() => setPage("BookingsPage")}>
              حجوزاتي
            </button>
          </li>
          <li>
            <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded" onClick={() => setPage("DoctorProfile")}>
              إعدادات الحساب
            </button>
          </li>
          <li>
            <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded" onClick={() => setPage("DoctorProfile")}>
             الدردشات
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}  

const DoctorProfile = () => {

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const user = useAuthStore((state) => state.user);
  console.log(user);
  
const doctorId=user.uid;  useEffect(() => {
   
    if (doctorId) fetchDoctorData();
  }, [doctorId]);

  const fetchDoctorData = async () => {
    try {
      const docRef = doc(db, "Doctors", doctorId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDoctor(docSnap.data());
        setFormData(docSnap.data());
      } else {
        console.error("لم يتم العثور على بيانات الطبيب");
      }
      setLoading(false);
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error);
      setLoading(false);
    }
  };

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

  if (loading) return <p>⏳ تحميل البيانات...</p>;

  return (
    <div className="flex justify-center mt-12">
       <div className="bg-white p-8 rounded-2xl shadow-2xl w-[700px]">
        <div className="flex flex-col items-center">
          <img
            src={doctor?.profileImage || "https://via.placeholder.com/150"}
            alt="Doctor"
            className="w-28 h-28 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{doctor?.name}</h2>
          <p className="text-gray-500 mt-1">{doctor?.specialty}</p>
        </div>
  
        {editing ?(
  <div className="mt-6 h-auto space-y-6">
    <div className="flex flex-wrap gap-4">
      <div className="w-full md:w-[48%]">
        <label className="block text-sm font-medium text-gray-700">الاسم</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-full md:w-[48%]">
        <label className="block text-sm font-medium text-gray-700">المحافظة</label>
        <input
          type="text"
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-full md:w-[48%]">
        <label className="block text-sm font-medium text-gray-700">التخصص</label>
        <input
          type="text"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-full md:w-[48%]">
        <label className="block text-sm font-medium text-gray-700">سعر الحجز</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div className="flex justify-between pt-4">
      <button
        onClick={handleSaveChanges}
        className=" bg-[#09243c] hover:bg-[#4acbbf] text-white py-2 px-4 rounded-md  transition cursor-pointer"
      >
        حفظ
      </button>
      <button
        onClick={() => setEditing(false)}
        className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md transition cursor-pointer"
      >
        إلغاء
      </button>
    </div>
  </div>


        ) : (
          <div className="mt-6 space-y-2 text-gray-700">
            <div><strong>الاسم:</strong> {doctor?.name}</div>
            <div><strong>المحافظة:</strong> {doctor?.governorate}</div>
            <div><strong>التخصص:</strong> {doctor?.specialty}</div>
            <div><strong>سعر الحجز:</strong> {doctor?.price} جنيه</div>
  
            <button
              onClick={() => setEditing(true)}
              className="mt-6 w-full bg-[#09243c] text-white py-2 px-4 rounded-md hover:bg-[#4acbbf] transition"
            >
              تعديل البيانات
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
}


const DoctorDashboard = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  
const doctorId=user.uid;
const [showCalendar, setShowCalendar] = useState(false); // لحالة ظهور التقويم
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [startTime, setStartTime] = useState(""); // وقت البداية
  const [endTime, setEndTime] = useState(""); // وقت النهاية

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

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
   
    // حل مشكلة نقص اليوم
    const formattedDate = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD

    try {
      if (!doctorId || !startTime || !endTime) {
        alert("يرجى إدخال أوقات العمل قبل تحديد الموعد.");
        return;
      }

      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      await addDoc(appointmentsRef, { date: formattedDate, startTime, endTime, isBooked: false });

      setAppointments([...appointments, { date: formattedDate, startTime, endTime, isBooked: false }]);
    } catch (error) {
      console.error("خطأ في إضافة الموعد:", error);
    }
    setShowCalendar(false);
  };

  return (
    <div className="flex justify-center mt-10">
    
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[500px] text-center h-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">حدد مواعيدك</h2>
        
        <div className="mb-4 text-left">
          <label className="block text-gray-600 font-medium">وقت البداية</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300"
          />
        </div>
  
        <div className="mb-4 text-left">
          <label className="block text-gray-600 font-medium">وقت النهاية</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-300"
          />
        </div>
  
        {/* زر تحديد التاريخ */}
        <div className="mb-4">
          <button
            onClick={() => setShowCalendar(!showCalendar)} // تغيير حالة التقويم عند الضغط
            className="w-full p-2 bg-[#09243c] hover:bg-[#4acbbf] text-white rounded-lg"
          >
            حدد تاريخ
          </button>
        </div>
  
        {/* عرض التقويم فقط عند الضغط على الزر */}
        {showCalendar && (
          <div className="mb-4">
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="w-full border rounded-lg p-2 shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
  




// ✅ صفحة عرض المواعيد


const AppointmentsPage = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  
const doctorId=user.uid;
  
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const fetchAppointments = async () => {
    if (!doctorId) return;
    const doctorRef = doc(db, "Doctors", doctorId);
    const appointmentsRef = collection(doctorRef, "appointments");
    const snapshot = await getDocs(appointmentsRef);
    setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموعد؟")) {
      try {
        const doctorRef = doc(db, "Doctors", doctorId);
        const appointmentDoc = doc(doctorRef, "appointments", appointmentId);
        await deleteDoc(appointmentDoc);
        setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
      } catch (error) {
        console.error("خطأ في حذف الموعد:", error);
      }
    }
  };

  const handleEdit = async (appointmentId) => {
    const newDate = prompt("أدخل التاريخ الجديد (YYYY-MM-DD):");
    const newStartTime = prompt("أدخل وقت البداية الجديد (HH:MM):");
    const newEndTime = prompt("أدخل وقت النهاية الجديد (HH:MM):");

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
        appointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, date: newDate, startTime: newStartTime, endTime: newEndTime } : appointment
        )
      );
    } catch (error) {
      console.error("خطأ في تعديل الموعد:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[500px] max-w-lg text-center"> {/* زودت الحجم هنا */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">مواعيدي</h2> {/* زودت الحجم هنا */}
        
        <ul className="divide-y divide-gray-200">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4"> {/* زودت الحجم والمسافة هنا */}
                <span className="text-gray-700 font-medium text-lg">  D: {appointment.date} T: {appointment.startTime} - {appointment.endTime}</span> {/* زودت حجم النص هنا */}
                <div className="flex space-x-4"> {/* زيادة المسافة بين الأزرار */}
                  <button className="bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 rounded-lg m-1" onClick={() => handleDelete(appointment.id)}>
                    حذف
                  </button>
                  <button className="bg-[#09243c] hover:bg-[#4acbbf] text-white text-sm px-4 py-2 rounded-lg m-1" onClick={() => handleEdit(appointment.id)}>
                    تعديل
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-3">لا توجد مواعيد</li>
          )}
        </ul>
      </div>
    </div>
  );
  
  
};




const BookingsPage = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  
const doctorId=user.uid;
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });

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
    };
    fetchBookings();
  }, [doctorId]);

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[500px] max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4"> حجوزاتي</h2>
        
        <h4 className="text-lg font-semibold text-gray-700 mt-4"> الحجوزات القادمة</h4>
        <ul className="divide-y divide-gray-200 mb-4">
          {bookings.upcoming.length > 0 ? (
            bookings.upcoming.map((booking, index) => (
              <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-md mb-3"
            >
              <span className="text-gray-700 font-medium">D: {booking.date}</span>
              <span className="text-gray-700 font-medium">T: {booking.time}</span>
              <span className="text-gray-700 font-medium">{booking.patientName}</span>
            </li>
            
            ))
          ) : (
            <li className="text-gray-500 p-3">لا توجد حجوزات قادمة</li>
          )}
        </ul>
        
        <h4 className="text-lg font-semibold text-gray-700 mt-4"> الحجوزات المنتهية</h4>
        <ul className="divide-y divide-gray-200">
          {bookings.past.length > 0 ? (
            bookings.past.map((booking, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-md mb-3">
                <span className="text-gray-700 font-medium">D: {booking.date} T: {booking.time} - {booking.patientName}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-3">لا توجد حجوزات منتهية</li>
          )}
        </ul>
      </div>
    </div>
  );
};


// ✅ إدارة الصفحات داخل الداشبورد
const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
    console.log(user);
    
  const doctorId=user.uid;
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex h-screen" dir="rtl">
     <div>
     <Sidebar setPage={setPage} doctorId={doctorId} />
     </div>
    
      <div className="flex-grow-1 p-4">
        {page === "dashboard" && <DoctorDashboard  />}
        {page === "appointments" && <AppointmentsPage  />}
        {page === "BookingsPage" && <BookingsPage  />}
        {page === "DoctorProfile" &&  <DoctorProfile />}
      </div>
    </div>
  );
};

export default DashboardPage;
