import imges from '../assets/doctor-5710160_1280.jpg'
import React from 'react';

export default function SectionOne() {
  return (
    <section>
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 px-6" dir='rtl'>
        <div>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            طب متقدم، رعاية مليئة بالرحمة
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            نحن نقدم خدمات رعاية صحية استثنائية مع لمسة شخصية.
          </p>
          <button className="bg-[#eca516] text-[#09243c] px-4 py-2 font-bold rounded-md transition-all duration-300 hover:bg-[#09243c] hover:text-[#eca516]">
  احجز معنا
</button>

        </div>
        <div>
          <img
            src={imges}
            alt="الرعاية الصحية"
            className="rounded-lg shadow-lg mt-16 h-[500px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
