import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // استيراد useParams لاستخراج doctorId
import { doc, collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import useAuthStore from "../../store";

const BookingPage = ({ doctorId, closeModal }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;

      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");

      try {
        const snapshot = await getDocs(appointmentsRef);
        const availableAppointments = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((appointment) => {
            if (appointment.isBooked) return false;
            const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}:00`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return appointmentDateTime >= today;
          });

        setAppointments(availableAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleBooking = () => {
    if (!selectedTime || !selectedDate || !user) {
      alert("يرجى ملء جميع الحقول واختيار موعد");
      return;
    }
    setShowConfirmModal(true); // 👈 عرض المودال
  };

  const confirmBooking = async () => {
    setShowConfirmModal(false); // إخفاء المودال بعد التأكيد

    try {
      const doctorRef = doc(db, "Doctors", doctorId);
      const appointmentsRef = collection(doctorRef, "appointments");
      const snapshot = await getDocs(appointmentsRef);

      const appointmentDoc = snapshot.docs.find(
        (doc) => doc.data().date === selectedDate && doc.data().startTime === selectedTime
      );

      if (!appointmentDoc) {
        alert("الموعد غير متاح");
        return;
      }

      const appointmentRef = doc(db, "Doctors", doctorId, "appointments", appointmentDoc.id);
      await updateDoc(appointmentRef, { isBooked: true });

      const patientBookingsRef = collection(doctorRef, "PatientBookings");
      await addDoc(patientBookingsRef, {
        date: selectedDate,
        time: selectedTime,
        patientName: user.name,
        UserId: user.uid,
        patientEmail: user.email,
        createdAt: new Date(),
      });

      setAppointments((prev) => prev.filter((app) => app.id !== appointmentDoc.id));
      setSelectedTime("");
      setSelectedDate("");
      closeModal();
    } catch (error) {
      console.error("خطأ في الحجز: ", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto relative">
      {isLoading ? (
        <p className="text-gray-500 text-center">جاري تحميل المواعيد...</p>
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
              <span className="font-semibold">{appointment.date}</span> -{" "}
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
            ? "bg-[#0a5372] hover:bg-[#0d2e4d] text-white  "
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        onClick={handleBooking}
        disabled={!selectedTime || !selectedDate}
      >
        حجز الموعد
      </button>

      {/* ✅ مودال التأكيد */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">هل تريد تأكيد الحجز؟</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmBooking}
                className="bg-[rgb(8,71,58)] text-white px-4 py-2 rounded "
              >
                نعم
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                لا
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookingPage;
