import React from 'react';

import imgt from '../assets/t.jpg'

import imgz from '../assets/z.jpg'
import imgy from '../assets/y.jpg'



export default function Section_six() {
  return (
    <section className="bg-gray-100 py-16" dir='rtl'>
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">مجالات خبرتنا</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={imgt}
              alt="أمراض القلب" className="w-full" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-2">أمراض القلب</h3>
              <p className="text-gray-700 mb-4">رعاية متخصصة للحالات المتعلقة بالقلب.</p>
              <a href="#" className="text-blue-900 font-semibold hover:underline">اقرأ المزيد</a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={imgz} alt="الأمراض الجلدية" className="w-full" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-2">الأمراض الجلدية</h3>
              <p className="text-gray-700 mb-4">علاجات متخصصة للعناية بالبشرة.</p>
              <a href="#" className="text-blue-900 font-semibold hover:underline">اقرأ المزيد</a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={imgy} alt="طب الأطفال" className="w-full" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-2">طب الأطفال</h3>
              <p className="text-gray-700 mb-4">رعاية شاملة للأطفال.</p>
              <a href="#" className="text-blue-900 font-semibold hover:underline">اقرأ المزيد</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
