import { useNavigate } from "react-router-dom";
import img1 from '../assets/download1.jpg';
import img2 from '../assets/download-_1_.jpg';
import img3 from '../assets/1a0d3713-7045-46c8-90e3-41c8d2a85f98.png';
import img4 from '../assets/e5d02a28-b378-4e1a-8f8c-e1d0668e2c0c.jpeg';
import img5 from '../assets/3.jpg';
import img6 from '../assets/4.jpg';
import img7 from '../assets/6.jpg';
import img8 from '../assets/7.jpg';
import img9 from '../assets/8.jpg';
import img10 from '../assets/12.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/101.jpg';

function Card() {
    const navigate = useNavigate();
    const categories = [
        { img: img1, title: "العناية بالأم والطفل", id: "motherandchildcare" },
        { img: img2, title: "أدوية بدون روشتة", id: "overthecountermedications" },
        { img: img3, title: "الأدوية الوصفية", id: "prescriptionmedications" },
        { img: img4, title: "العروض", id: "offers" },
        { img: img5, title: "الفيتامينات والتغذية", id: "vitaminsandnutrition" },
        { img: img6, title: "مكافحة العدوي", id: "antivirus" },
        { img: img7, title: "العناية بالوجه والجسم", id: "faceandbodycare" },
        { img: img8, title: "العناية بالمرأة", id: "womencare" },
        { img: img9, title: "العناية بالرجل", id: "mencare" },
        { img: img10, title: "العناية بالشعر", id: "haircare" },
        { img: img11, title: "مستلزمات طبية", id: "medicalsupplies" },
        { img: img12, title: "كبار السن", id: "oldpeople" }
    ];

    return (
        <div className="bg-gray-100 py-8 px-4">
            <h2 className="text-2xl font-semibold text-right mb-6 pr-32">ابحث بالقسم</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center px-10">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:text-blue-900 cursor-pointer group overflow-hidden"
                        onClick={() => navigate(`/pharmacy/${category.id}`, { state: { title: category.title } })}
                        aria-label={`انتقل إلى قسم ${category.title}`} >
                        <img src={category.img} alt={category.title || "صورة القسم"} className="w-48 h-48 object-cover rounded-lg transition-opacity duration-300 hover:opacity-80" />
                        <p className="text-[#09243c] mt-4 text-lg font-medium">{category.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Card;
