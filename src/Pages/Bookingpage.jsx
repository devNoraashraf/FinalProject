import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // استيراد useParams لاستخراج doctorId
import { doc, collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import useAuthStore from "../../store";

const BookingPage = ({ doctorId,closeModal }) => {
  console.log(doctorId);

  // const { doctorId } = useParams(); // استخراج doctorId من الرابط
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  console.log(user)
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) {
        console.error("Doctor ID is missing");
        return;
      }

      console.log("Fetching appointments for Doctor ID:", doctorId);
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");

      try {
        const snapshot = await getDocs(appointmentsRef);
        const availableAppointments = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((appointment) => {
            console.log("Appointment Data:", appointment);

            if (appointment.isBooked) return false; // استبعاد المواعيد المحجوزة

            const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}:00`);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // تصفير الوقت لليوم الحالي

            return appointmentDateTime >= today; // استبعاد المواعيد القديمة
          });

        setAppointments(availableAppointments);
        console.log("Available Appointments:", availableAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }finally {
        setIsLoading(false); // ✅ نوقف التحميل بعد ما نخلص
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleBooking = async () => {
    if (!selectedTime || !selectedDate || !user) {
      alert("يرجى ملء جميع الحقول واختيار موعد");
      return;
    }

    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      const snapshot = await getDocs(appointmentsRef);

      // 🔹 البحث عن الموعد المطلوب في قاعدة البيانات
      const appointmentDoc = snapshot.docs.find(
        (doc) => doc.data().date === selectedDate && doc.data().startTime === selectedTime
      );

      if (!appointmentDoc) {
        alert("الموعد غير متاح");
        return;
      }

      console.log("Booking appointment:", appointmentDoc.data());

      // 🔹 تحديث حالة isBooked إلى true
      const appointmentRef = doc(db, "Doctors", doctorId, "appointments", appointmentDoc.id);
      await updateDoc(appointmentRef, { isBooked: true });

      // 🔹 إضافة الحجز إلى قائمة حجوزات المرضى
      const patientBookingsRef = collection(doctorRef, "PatientBookings");
      await addDoc(patientBookingsRef, {
        date: selectedDate,
        time: selectedTime,
        patientName: user.name,

        patientEmail: user.email,
        createdAt: new Date(),
      });

      // ✅ تحديث القائمة بعد الحجز لإخفاء الموعد المحجوز
      setAppointments((prev) => prev.filter((app) => app.id !== appointmentDoc.id));

      alert("تم حجز الموعد بنجاح!");
      setSelectedTime("");
      setSelectedDate("");
      closeModal();

    } catch (error) {
      console.error("خطأ في الحجز: ", error);
    }
  };



  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
  
    
    {isLoading ? (
  <p className="text-gray-500 text-center"> جاري تحميل المواعيد...</p>
) : appointments.length > 0 ? (
  
  <div className="space-y-3">
    <h4 className="text-lg text-gray-600 mb-3">المواعيد المتاحة</h4>
    {appointments.map((appointment) => (
      <div
        key={appointment.id}
        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
          selectedTime === appointment.startTime && selectedDate === appointment.date
            ? "bg-[#4acbbf] text-white shadow-lg"
            : "bg-gray-100 hover:bg-gray-200 border-gray-300"
        }`}
        onClick={() => {
          if (
            selectedTime === appointment.startTime &&
            selectedDate === appointment.date
          ) {
            setSelectedTime(null);
            setSelectedDate(null);
          } else {
            setSelectedTime(appointment.startTime);
            setSelectedDate(appointment.date);
          }
        }}
      >
        <span className="font-semibold">{appointment.date}</span> - 
        <span className="ml-2">
          {appointment.startTime} إلى {appointment.endTime}
        </span>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500 text-center">لا توجد مواعيد متاحة</p>
)}

    <button
      className={`mt-6 w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 ${
        selectedTime && selectedDate
          ? "bg-[#193849] text-white ]"
          : "bg-gray-400 text-gray-700 cursor-not-allowed"
      }`}
      onClick={handleBooking}
      disabled={!selectedTime || !selectedDate}
    >
      حجز الموعد
    </button>
  </div>
  
  );
};

export default BookingPage;
