import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';

function Medicines() {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [maxPrice] = useState(1000);
    const [cart, setCart] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchMedicines = async () => {
            const medsRef = collection(db, "pharmacy", departmentId, "medicines");
            const querySnapshot = await getDocs(medsRef);
            const meds = [];
            querySnapshot.forEach((doc) => {
                meds.push({ id: doc.id, ...doc.data() });
            });
            setMedicines(meds);
        };
        fetchMedicines();
    }, [departmentId]);

    const addToCart = (medicine) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === medicine.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === medicine.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...medicine, quantity: 1 }];
            }
        });
    
        // إظهار الإشعار
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000); // يختفي بعد ثانيتين
    };
    
    // لحفظ السلة في Firestore
    const updateCartInFirestore = async (cartItems) => {
        const user = auth.currentUser;
        if (user) {
            const cartRef = doc(db, "carts", user.uid);
            try {
                await setDoc(cartRef, { items: cartItems });
                console.log("تم حفظ السلة في Firebase ");
            } catch (error) {
                console.error("خطأ في حفظ السلة:", error);
            }
        }
    };
    useEffect(() => {
        const saveCartToFirestore = async () => {
            const user = auth.currentUser;
            if (user) {
                const cartRef = doc(db, "carts", user.uid);
                try {
                    await setDoc(cartRef, { items: cart });
                    console.log("تم حفظ السلة في Firebase ");
                } catch (error) {
                    console.error("خطأ في حفظ السلة:", error);
                }
            }
        };

        if (cart.length > 0) {
            saveCartToFirestore();
        }
    }, [cart]);

    const filteredMedicines = medicines.filter((med) =>
        med.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedType === '' || med.type === selectedType) &&
        med.price <= maxPrice
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-5">
            {showNotification && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white text-[#006272] px-6 py-3 rounded-lg shadow-lg z-50">
                    تم إضافة الدواء إلى السلة
                </div>
            )}
    
            <div className="px-10 mb-5">
                {/* الفلاتر وزر السلة */}
                <div className="flex flex-col md:flex-row justify-end gap-10 mb-5 bg-[#006272] p-5 rounded-xl rtl text-right">
                    <button
                        onClick={() => navigate('/cart')}
                        className="bg-gradient-to-r from-[#008080] to-[#006272] text-white text-center hover:from-[#006272] hover:to-[#008080] px-4 py-2 rounded-lg shadow-md flex items-center gap-2 font-bold">
                        🛒 سلة الشراء
                        {cart.length > 0 && (
                            <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1">{cart.length}</span>
                        )}
                    </button>
                    <input
                        type="text"
                        placeholder="ابحث عن دواء"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border p-2 rounded-md w-full md:w-1/3 text-right" />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border p-2 rounded-md w-full md:w-1/4 text-right text-[#006272]">
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
                            <h4 className="text-xl font-semibold mt-4 text-[#006272] text-center">{med.title}</h4>
                            <p className="text-[#006272]">{med.type}</p>
                            <p className="text-[#006272]">السعر: {med.price} جنيه</p>
                            <button
                                onClick={() => addToCart(med)}
                                className="bg-[#006272] text-white px-8 py-2 mt-3 rounded-lg shadow-md hover:bg-[#008080] transition" >
                                إضافة +
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
}

export default Medicines;
