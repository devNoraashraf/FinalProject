// HomeFilter.jsx (يمكنك تضمينه في الصفحة الرئيسية)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../firebase-config";

const HomeFilter = () => {
  const [specialties, setSpecialties] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [governorateFilter, setGovernorateFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Doctors"));
      const docs = querySnapshot.docs.map(doc => doc.data());

      const uniqueSpecialties = [...new Set(docs.map(d => d.specialty))].filter(Boolean);
      const uniqueGovernorates = [...new Set(docs.map(d => d.governorate))].filter(Boolean);
      setSpecialties(uniqueSpecialties);
      setGovernorates(uniqueGovernorates);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      specialty: specialtyFilter,
      governorate: governorateFilter,
      rating: ratingFilter,
      price: priceFilter,
      search: searchQuery,
    });

    navigate(`/DoctorsList?${queryParams.toString()}`);
};

  return (
    <div className="flex flex-col gap-4 bg-[#193849] p-4 rounded-lg max-w-4xl mx-auto shadow-md">
      <div className="flex flex-row-reverse gap-4 items-center">
        <button 
          onClick={handleSearch} 
          className="bg-[#4acbbf] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#3ab0a5] transition"
        >
          بحث
        </button>

        <input
          type="text"
          placeholder="اكتب اسم الدكتور أو التخصص..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 flex-grow border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4acbbf] bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} className="p-2 border rounded-lg bg-white">
          <option value="">اختر التخصص</option>
          {specialties.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>

        <select value={governorateFilter} onChange={(e) => setGovernorateFilter(e.target.value)} className="p-2 border rounded-lg bg-white">
          <option value="">اختر المحافظة</option>
          {governorates.map((g, i) => <option key={i} value={g}>{g}</option>)}
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
  );
};

export default HomeFilter;