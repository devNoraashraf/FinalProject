import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../firebase-config"; // استيراد Firestore
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // ✅ تمت إضافته

import { FaUserMd, FaStethoscope, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from "react-icons/fa";

import BookingPage from "./Bookingpage";
import Modal from "react-modal";
Modal.setAppElement("#root");



const DoctorsList = () => {




  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);



  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [governorateFilter, setGovernorateFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation(); // ✅ تم إضافته
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSpecialtyFilter(queryParams.get("specialty") || "");
    setGovernorateFilter(queryParams.get("governorate") || "");
    setRatingFilter(queryParams.get("rating") || "");
    setPriceFilter(queryParams.get("price") || "");
    setSearchQuery(queryParams.get("search") || "");
  }, [location.search]); // ✅ تم إضافته


  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "Doctors"));
      const doctorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "",
        specialty: doc.data().specialty || "",
        governorate: doc.data().governorate || "",
        price: doc.data().price || 0,
        review: doc.data().review || 0,
        ...doc.data(),
      }));
  
      setDoctors(doctorsData);
  
      const uniqueSpecialties = [...new Set(doctorsData.map((doc) => doc.specialty))].filter(Boolean);
      setSpecialties(uniqueSpecialties);
  
      const uniqueGovernorates = [...new Set(doctorsData.map((doc) => doc.governorate))].filter(Boolean);
      setGovernorates(uniqueGovernorates);
  
      // بعد تحميل الداتا، طبق الفلاتر من URL
      const queryParams = new URLSearchParams(location.search);
      const specialty = queryParams.get("specialty") || "";
      const governorate = queryParams.get("governorate") || "";
      const rating = queryParams.get("rating") || "";
      const price = queryParams.get("price") || "";
      const search = queryParams.get("search") || "";
  
      setSpecialtyFilter(specialty);
      setGovernorateFilter(governorate);
      setRatingFilter(rating);
      setPriceFilter(price);
      setSearchQuery(search);
  
      // فلترة مباشرة بعد تعيين القيم
      const filtered = doctorsData.filter((doc) =>
        (specialty === "" || doc.specialty === specialty) &&
        (governorate === "" || doc.governorate === governorate) &&
        (rating === "" || doc.review >= parseFloat(rating)) &&
        (price === "" ||
          (price === "100" && doc.price < 100) ||
          (price === "300" && doc.price < 300) ||
          (price === "500" && doc.price < 500) ||
          (price === "501" && doc.price >= 500)) &&
        (search === "" || 
          doc.name.toLowerCase().includes(search.toLowerCase()) || 
          doc.specialty.toLowerCase().includes(search.toLowerCase()) || 
          doc.governorate.toLowerCase().includes(search.toLowerCase()))
      );
  
      setFilteredDoctors(filtered);
      setIsLoading(false);
    };
  
    fetchDoctors();
  }, [location.search]);
  
  useEffect(() => {
    handleFilterChange();
  }, [specialtyFilter, governorateFilter, ratingFilter, priceFilter, searchQuery]);

  const handleFilterChange = () => {
    let filtered = doctors.filter((doc) =>
      (specialtyFilter === "" || doc.specialty === specialtyFilter) &&
      (governorateFilter === "" || doc.governorate === governorateFilter) &&
      (ratingFilter === "" || doc.review >= parseFloat(ratingFilter)) &&
      (priceFilter === "" ||
        (priceFilter === "100" && doc.price < 100) ||
        (priceFilter === "300" && doc.price < 300) ||
        (priceFilter === "500" && doc.price < 500) ||
        (priceFilter === "501" && doc.price >= 500)) &&
      (searchQuery === "" || 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.governorate.toLowerCase().includes(searchQuery.toLowerCase()))
    );
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
    <div className="flex flex-col items-center gap-6 p-6 w-full">
    <div className="flex flex-col gap-4 w-full max-w-4xl bg-[#193849] p-4 rounded-lg shadow-md">
      <div className="flex flex-row-reverse gap-4 items-center">
        <button 
          onClick={handleFilterChange} 
          className="bg-[#4acbbf] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#3ab0a5] transition"
        >
          بحث
        </button>
  
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="أو اكتب اسم الدكتور/المركز/المستشفى هنا..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4acbbf] pr-10 bg-white"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} className="p-2 border rounded-lg bg-white">
          <option value="">اختر التخصص</option>
          {specialties.map((specialty, index) => <option key={index} value={specialty}>{specialty}</option>)}
        </select>
        <select value={governorateFilter} onChange={(e) => setGovernorateFilter(e.target.value)} className="p-2 border rounded-lg bg-white">
          <option value="">اختر المحافظة</option>
          {governorates.map((gov, index) => <option key={index} value={gov}>{gov}</option>)}
        </select>
        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="p-2 border rounded-lg bg-white">
          <option value="">التقييم</option>
          <option value="4">4+ ⭐</option>
          <option value="3">3+ ⭐</option>
        </select>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="p-2 border rounded-lg">
            <option value="">السعر</option>
            <option value="100">أقل من 100</option>
            <option value="300">أقل من 300</option>
            <option value="500">أقل من 500</option>
            <option value="501">فوق 500</option>
          </select>
      </div>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
  {filteredDoctors.length === 0 ? (
    <div className="text-center text-lg font-semibold text-gray-600">لا توجد نتائج لعرضها.</div>
  ) : (
    filteredDoctors.map((doctor) => (

      <motion.div 
        key={doctor.id} 
        className="bg-white p-4 rounded-lg shadow-lg text-right cursor-pointer transition-colors hover:bg-[#193849] group font-[Tajawal]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={doctor.image || "https://png.pngtree.com/thumb_back/fh260/background/20220313/pngtree-doctor-man-with-stethoscope-in-hospital-image_1059265.jpg"} 
          alt={doctor.name} 
          className="w-full h-48 object-cover rounded-lg mb-4" 
        />

        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
          <span className="text-[#4acbbf] bg-[#1e9086] p-2 rounded-full"><FaUserMd /></span> {doctor.name}
        </h2>

        <div className="text-lg text-gray-700 space-y-2 group-hover:text-white transition-colors duration-300">
          <div className="flex items-center gap-3">
            <span className="text-[#4acbbf] bg-[#1e9086] p-2 rounded-full"><FaStethoscope /></span> {doctor.specialty}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#4acbbf] bg-[#1e9086] p-2 rounded-full"><FaMapMarkerAlt /></span> {doctor.governorate}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#4acbbf] bg-[#1e9086] p-2 rounded-full"><FaMoneyBillWave /></span> {doctor.price} جنيه
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#facc15] bg-[#c29d07] p-2 rounded-full"><FaStar /></span> {doctor.review} / 5
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleBooking(doctor.id)}
            className="mt-4 bg-[#193849] text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-white hover:text-[#08473a]"
          >
            احجز الموعد
          </button>
        </div> {/* ✅ تم إغلاق الـ div الناقص هنا */}

        {/* نافذة المودال */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-lg"
          overlayClassName="fixed inset-0"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 text-center relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">حجز الموعد</h2>

            <BookingPage doctorId={selectedDoctorId} closeModal={() => setIsOpen(false)} />

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