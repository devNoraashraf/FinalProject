import React from 'react';
import imges from'../assets/person3.jpg'
export default function Section_four() {
  return (
    <section className="bg-white py-16" dir='rtl'>
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-8 px-6">
        <div>
          <img
            src={imges}
            alt="من نحن"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ليس فقط رعاية صحية أفضل، بل تجربة أفضل
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            نحن نوفر لك حلولًا طبية ذكية تسهّل حياتك اليومية، من حجز المواعيد الطبية إلى طلب الأدوية والرعاية المنزلية. 
            هدفنا هو تقديم خدمات صحية موثوقة بطريقة سهلة وآمنة، لتلبية جميع احتياجاتك الطبية في مكان واحد.
          </p>
          <button className="bg-[#09243c] text-[#eca516] px-4 py-2 font-bold rounded-md transition-all duration-300 hover:bg-[#eca516] hover:text-[#09243c]">
  احجز معنا
</button>

        </div>
      </div>
    </section>
  );
}
