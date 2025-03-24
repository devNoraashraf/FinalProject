import { useState, useEffect } from "react";
import { db, storage } from "../../firebase-config";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Form() {
const [formData, setFormData] = useState({
    imageUrl: "",
    imageFile: null,
    name: "",
    price: "",
    type: "",
    category: ""
});
const [categories, setCategories] = useState([]);

useEffect(() => {
    const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "pharmacy"));
        if (!querySnapshot.empty) {
        setCategories(querySnapshot.docs.map(doc => ({
            id: doc.id 
    })));
        } else {
        console.warn("لا توجد أقسام في Firestore.");
        }
    } catch (error) {
        console.error("خطأ في جلب الأقسام:", error);
    }
    };
    fetchCategories();
}, []);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();

    // التحقق من أن كل الحقول ممتلئة
    if (!formData.name.trim() || !formData.price.trim() || !formData.type || !formData.category || (!formData.imageUrl.trim() && !formData.imageFile)) {
        alert("يجب ملء جميع الحقول قبل الحفظ!");
        return;
    }

    let imageUrl = formData.imageUrl.trim(); 
    try {
        const categoryRef = doc(db, "pharmacy", formData.category);
        const medicinesCollection = collection(categoryRef, "medicines");

        await addDoc(medicinesCollection, {
            img: imageUrl || "https://via.placeholder.com/150",
            title: formData.name,
            price: Number(formData.price),
            type: formData.type
        });

        console.log("تمت الإضافة بنجاح");
        alert("تم حفظ الدواء بنجاح!");

        setFormData({
            imageUrl: "",
            imageFile: null,
            name: "",
            price: "",
            type: "",
            category: ""
        });

    } catch (error) {
        console.error("خطأ في الإضافة:", error);
        alert("حدث خطأ أثناء حفظ الدواء.");
    }
};


return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-20 mb-20">
    <h2 className="text-2xl font-bold mb-4 text-right">إضافة دواء جديد</h2>
    <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="imageUrl" placeholder="أدخل رابط الصورة" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded text-right" />
        <input type="text" name="name" placeholder="اسم الدواء"  value={formData.name} onChange={handleChange}  className="w-full p-2 border rounded text-right" />
        <input type="number" name="price"  placeholder="السعر" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded text-right" />

        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded text-right">
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

<select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded text-right">
<option value="">اختر القسم</option>
{categories.map((cat) => (
    <option key={cat.id} value={cat.id}>{cat.id}</option> 
))}
</select>

<button type="submit" className="w-full bg-[#4acbbf] text-white py-2 rounded hover:bg-[#3ba99c]"> حفظ الدواء </button>
    </form>
    </div>
);
}

export default Form;
