import React from 'react';
import imge1 from '../assets/xh.webp'
import imge2 from '../assets/perso3.jpg'

import imge3 from '../assets/ód¬nT (1).jpg'
import imge4 from '../assets/images.jpg'


export default function Section_five() {
  return (
    <section className="bg-gray-100 py-16 min-h-[600px]" dir='rtl'>
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          اختر من أحسن العروض
        </h2>
        <div className="relative">
          {/* العروض */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-x-auto">
            {/* بطاقة العرض 1 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="relative">
                <img
                  src={imge1}
                  alt="تقشير الوجه"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  خصم 50%
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-3">تقشير الوجه</h3>
              <p className="text-gray-600 line-through">500 جنيه</p>
              <p className="text-blue-600 font-bold">250 جنيه</p>
            </div>

            {/* بطاقة العرض 2 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="relative">
                <img
                  src={imge2}
                  alt="تركيب التقويم المعدني"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  خصم 20%
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-3">تركيب التقويم المعدني</h3>
              <p className="text-gray-600 line-through">15000 جنيه</p>
              <p className="text-blue-600 font-bold">12000 جنيه</p>
            </div>

            {/* بطاقة العرض 3 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="relative">
                <img
                  src={imge3}
                  alt="تنظيف البشرة"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  خصم 50%
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-3">تنظيف البشرة</h3>
              <p className="text-gray-600 line-through">800 جنيه</p>
              <p className="text-blue-600 font-bold">400 جنيه</p>
            </div>

            {/* بطاقة العرض 4 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="relative">
                <img
                  src={imge4}
                  alt="تنظيف الأسنان"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  خصم 40%
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-3">تنظيف الأسنان</h3>
              <p className="text-gray-600 line-through">1000 جنيه</p>
              <p className="text-blue-600 font-bold">600 جنيه</p>
            </div>
          </div>
        </div>

        <div className="text-right mt-4">
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            كل العروض
          </a>
        </div>
      </div>
    </section>
  );
}
