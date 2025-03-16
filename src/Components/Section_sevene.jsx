import React from 'react';

import D from '../assets/doctor-50.jpg'
import P from '../assets/person3.jpg'

 




export default function Section_sevene() {
  return (
    <div className="bg-white py-12 px-6 md:px-16" dir='rtl'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* الصورة والنسبة */}
        <div className="relative">
          <img src={D} alt="طبيب مع مريض" className="rounded-lg shadow-lg w-full" />
          <div className="absolute bottom-6 left-6 bg-[#09243c]  p-6 rounded-lg">
            <p className="text-5xl font-bold text-white">99%</p>
            <p className="text-lg text-white">رضا العملاء هو نجاحنا</p>
          </div>
        </div>

        {/* قسم التقييم */}
        <div className="text-right">
          <h3 className="text-blue-900 font-semibold text-lg">آراء العملاء</h3>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">رضا العملاء هو دافع عملنا!</h2>
          <div className="flex items-center mt-3 justify-end">
            <p className="ml-3 text-gray-600">التقييم العام 4.7 / 3285 مراجعة على Zocdoc &gt;</p>
            <span className="text-yellow-500 text-xl">★★★★★</span>
          </div>
          <div className="bg-gray-100 p-6 mt-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              “ أكتب بالنيابة عن أخي الذي كان مريضًا في مستشفاكم. أود أن أشكركم بالنيابة عن عائلتي بأكملها على المساعدة والاهتمام... ”
            </p>
            <div className="flex items-center mt-4 justify-end">
              <div className="mr-4 text-right">
                <p className="font-semibold text-gray-900"> السيد محمد حسن</p>
                <p className="text-sm text-gray-600">أخصائي الاوردة  </p>
              </div>
              <img src={P}  alt="صورة الملف الشخصي" className="w-12 h-12 rounded-full border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
