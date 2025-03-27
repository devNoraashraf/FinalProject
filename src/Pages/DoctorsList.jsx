import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { auth, db } from "../../firebase-config";

import { useNavigate } from "react-router-dom";
import BookingPage from "./Bookingpage";
import Modal from "react-modal";
Modal.setAppElement("#root");
const DoctorsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialtyFilter, setSpecialtyFilter] = useState(""); // تخزين التخصص المختار
  const [specialties, setSpecialties] = useState([]); // قائمة التخصصات
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const [searchQuery, setSearchQuery] = useState(""); // حالة البحث
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "Doctors"));
      const doctorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "",
        specialty: doc.data().specialty || "",
        governorate: doc.data().governorate || "",
        ...doc.data(),
      }));

      setDoctors(doctorsData);
      setFilteredDoctors(doctorsData);
      setIsLoading(false);

      const uniqueSpecialties = [...new Set(doctorsData.map((doc) => doc.specialty))].filter(
        (specialty) => specialty !== undefined
      );
      setSpecialties(uniqueSpecialties);
    };

    fetchDoctors();
  }, []);

  const handleFilterChange = (event) => {
    const selectedSpecialty = event.target.value;
    setSpecialtyFilter(selectedSpecialty);

    if (selectedSpecialty === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doc) => doc.specialty === selectedSpecialty);
      setFilteredDoctors(filtered);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = doctors.filter((doctor) => {
      const name = doctor.name ? doctor.name.toLowerCase() : "";
      const specialty = doctor.specialty ? doctor.specialty.toLowerCase() : "";
      const governorate = doctor.governorate ? doctor.governorate.toLowerCase() : "";

      return (
        name.includes(query.toLowerCase()) ||
        specialty.includes(query.toLowerCase()) ||
        governorate.includes(query.toLowerCase())
      );
    });

    setFilteredDoctors(filtered);
  };

  if (isLoading) {
    return <div className="text-center text-lg font-bold text-gray-700">جاري التحميل...</div>;
  }


  const handleBooking = (id) => {
    setSelectedDoctorId(id); // حفظ الـ ID
    setIsOpen(true); // فتح الـ Modal
  };

 
  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full  ">
      <div className="flex flex-col gap-4 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <label className="text-lg font-semibold text-[#08473a]">اختر التخصص:</label>
        
        <select
          value={specialtyFilter}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#08473a]"
        >
          <option value="">كل التخصصات</option>
          {specialties.map((specialty, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="ابحث باسم الطبيب أو التخصص أو المنطقة"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#08473a]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredDoctors.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-600">لا توجد نتائج لعرضها.</div>
        ) : (
          filteredDoctors.map((doctor) => (
<motion.div 
  key={doctor.id} 
  className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer transition-colors hover:bg-[#08473a] hover:text-white"
  
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
  transition={{ duration: 0.5 }}
>
  <img
    src={doctor.image || "https://png.pngtree.com/thumb_back/fh260/background/20220313/pngtree-doctor-man-with-stethoscope-in-hospital-image_1059265.jpg"}
    alt={doctor.name}
    className="w-full h-48 object-cover rounded-lg mb-4"
  />
  <h2 className="text-xl font-bold hover:text-white">{doctor.name}</h2>
  <p className="hover:text-white"><strong>التخصص:</strong> {doctor.specialty}</p>
  <p className="hover:text-white"><strong>المحافظة:</strong> {doctor.governorate}</p>
  <p className="hover:text-white"><strong>السعر:</strong> {doctor.price} جنيه</p>
  <p className="hover:text-white"><strong>التقييم:</strong> ⭐ {doctor.review}/5</p>

  <button
        onClick={() => handleBooking(doctor.id)}
        className="mt-4 bg-[#08473a] text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-white hover:text-[#08473a]"
      >
        احجز الموعد
      </button>

      {/* نافذة المودال */}
      <Modal
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
  className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-lg"
  overlayClassName="fixed inset-0"
>
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center relative">
    <h2 className="text-xl font-bold mb-4 text-gray-800">حجز الموعد</h2>
    
    <BookingPage doctorId={selectedDoctorId} />
    
    <button
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
      onClick={() => setIsOpen(false)}
    >
      إغلاق
    </button>
  </div>
</Modal>


 
</motion.div>

          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;