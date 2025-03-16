import React from 'react'
import img1 from '../assets/download1.jpg'
import img2 from '../assets/download-_1_.jpg'
import img3 from '../assets/1a0d3713-7045-46c8-90e3-41c8d2a85f98.png'
import img4 from '../assets/e5d02a28-b378-4e1a-8f8c-e1d0668e2c0c.jpeg'
import img5 from '../assets/3.jpg'
import img6 from '../assets/4.jpg'
import img7 from '../assets/6.jpg'
import img8 from '../assets/7.jpg'
import img9 from '../assets/8.jpg'
import img10 from '../assets/12.jpg'
import img11 from '../assets/11.jpg'
import img12 from '../assets/101.jpg'

function Card() {
    const categories = [
        { img: img1, title: "العناية بالأم والطفل" },
        { img: img2, title: "أدوية بدون روشتة" },
        { img: img3, title: "الأدوية الوصفية" },
        { img: img4, title: "العروض" },
        { img: img5, title: "الفيتامينات والتغذية" },
        { img: img6, title: "مكافحة العدوي" },
        { img: img7, title: "العناية بالوجه والجسم" },
        { img: img8, title: "العناية بالمرأة" },
        { img: img9, title: "العناية بالرجل" },
        { img: img10, title: "العناية بالشعر" },
        { img: img11, title: "مستلزمات طبية" },
        { img: img12, title: "كبار السن" }

    ];
return (
    <>
    {/* <h2 className='card-text'> ابحث بالقسم </h2> */}
    {/* <div className="grid-container">
        <div className="card"><img src={img1} alt="العناية بالأم والطفل"/><p>العناية بالأم والطفل</p></div>
        <div className="card"><img src={img2} alt="أدوية بدون روشتة"/><p>أدوية بدون روشتة</p></div>
        <div className="card"><img src={img3} alt="الأدوية الوصفية"/><p>الأدوية الوصفية</p></div>
        <div className="card"><img src={img4} alt="العروض"/><p>العروض</p></div>
        <div className="card"><img src={img5} alt="الفيتامينات والتغذية"/><p>الفيتامينات والتغذية</p></div>
        <div className="card"><img src={img6} alt="مكافحة العدوي"/><p>مكافحة العدوي</p></div>
        <div className="card"><img src={img7} alt="العناية بالوجة والجسم"/><p>العناية بالوجة والجسم</p></div>
        <div className="card"><img src={img8} alt="العناية بالمراة"/><p>العناية بالمراة</p></div>
        <div className="card"><img src={img9} alt="العناية بالرجل"/><p>العناية بالرجل</p></div>
        <div className="card"><img src={img10} alt="العناية بالشعر"/><p>العناية بالشعر</p></div>
        <div className="card"><img src={img11} alt="مستلزمات طبية"/><p>مستلزمات طبية</p></div>
        <div className="card"><img src={img12} alt="كبار السن"/><p>كبار السن</p></div>
    </div> */}
            <div className="bg-gray-100 py-8 px-4">
            <h2 className="text-2xl font-semibold text-right mb-6 pr-32">ابحث بالقسم</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center px-10">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-[#09243c] hover:text-white cursor-pointer group">
                        <img src={category.img} alt={category.title} className="w-48 h-48 object-cover rounded-lg" />
                        <p className="text-[#09243c] mt-4 text-lg font-medium group-hover:text-white">{category.title}</p>
                    </div>
                ))}
            </div>
        </div>

    </>
)
}

export default Card;