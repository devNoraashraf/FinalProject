import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

function Medicines() {
    const { departmentId } = useParams();
    const [medicines, setMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [maxPrice] = useState(1000); 

    useEffect(() => {
        console.log(departmentId);
        const fetchMedicines = async () => {
            const medsRef = collection(db, "pharmacy", departmentId, "medicines");
            const querySnapshot = await getDocs(medsRef);
            let meds = [];
            querySnapshot.forEach((doc) => {
                meds.push({ id: doc.id, ...doc.data() });
            });

            setMedicines(meds);
            console.log(`القسم (${departmentId}) يحتوي على ${meds.length} أدوية.`);
        };
        fetchMedicines();
    }, [departmentId]);

    const filteredMedicines = medicines.filter((med) =>
        med.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedType === '' || med.type === selectedType) &&
        med.price <= maxPrice
    );

    return (
        <div className="px-10 mt-5 mb-5">

            <div className="flex flex-col md:flex-row justify-end gap-10 mb-5 bg-[#3ba99c] p-5 rounded-xl rtl text-right">

                <input
                    type="text"
                    placeholder="ابحث عن دواء"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/3 text-right"
                />
                
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/4 text-right"
                >
                    <option value="">اختر النوع</option>
                    <option value="أقراص">أقراص</option>
                    <option value="عبوة">عبوة</option>
                    <option value="حقن">حقن</option>
                    <option value="كبسولات">كبسولات</option>
                    <option value="جهاز">جهاز</option>
                    <option value="مجموعة">مجموعة</option>
                    <option value="حفاضات">حفاضات</option>
                    <option value="اكياس">اكياس</option>
                    <option value="لصقات">لصقات</option>
                    <option value="شراب">شراب</option>
                </select>
            </div>

            {/* عرض الأدوية */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
                {filteredMedicines.map((med) => (
                    <div key={med.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform group overflow-hidden">
                        <img src={med.img} alt={med.title} className="w-48 h-48 object-cover rounded-lg transition-opacity duration-300 hover:opacity-80" />
                        <h4 className="text-xl font-semibold mt-4 text-blue-900 text-center">{med.title}</h4>
                        <p className="text-blue-900">{med.type}</p>
                        <p className="text-blue-900">السعر: {med.price} جنيه</p>
                        <button className="bg-[#4acbbf] text-blue-900 px-8 py-2 mt-3 rounded-lg shadow-md hover:bg-[#3ba99c] transition">إضافة +</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Medicines;
