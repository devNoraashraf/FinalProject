import React from 'react';
import imges from '../assets/person3.jpg'
export default function SectionThree() {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 mt-12 mb-8 min-h-[600px]"dir='rtl'>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">الأطباء الأكثر اختياراً</h2>
        <a href="#" className="text-blue-600 font-medium">أظهر المزيد</a>
      </div>

      {/* تصنيفات الأطباء */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">جراحة</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">سكر وغدد صماء</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">جراحة مخ وأعصاب</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">نفسي</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">أطفال وحديثي الولادة</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">قلب وأوعية دموية</button>
      </div>

      {/* قائمة الأطباء */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {[
          { name: 'أحمد مجدي', specialty: 'قلب وأوعية دموية', location: 'الدقي والمهندسين: أحمد عرابي', rating: '4.6' },
          { name: 'سالي محمد الشيخ', specialty: 'نفسي', location: 'الدقي والمهندسين: شارع مصدق', rating: '4.2' },
          { name: 'هالة وديع', specialty: 'أطفال وحديثي الولادة', location: 'التجمع: شارع التسعين', rating: '4.7' },
          { name: 'شيماء أبو المعاطي', specialty: 'جلدية', location: 'مدينة نصر: شارع علي أمين', rating: '4.5' }
        ].map((doctor, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
            <img className="w-16 h-16 rounded-full object-cover" src={imges} alt={doctor.name} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-gray-600 text-sm">{doctor.specialty}</p>
              <p className="text-gray-500 text-xs">{doctor.location}</p>
              <div className="flex items-center text-yellow-500 mt-1">
                ⭐ {doctor.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
