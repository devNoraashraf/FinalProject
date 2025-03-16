import React from 'react'

export default function Section_two() {
  return (
    <section class="bg-gray-50 py-16 h-[70vh]" dir='rtl'>
        <div class="container mx-auto grid md:grid-cols-3 gap-6 px-6 h-[50vh]">
            <div class="bg-gray-300 shadow-lg rounded-lg p-6 text-center">
                <h3 class="text-xl font-bold text-blue-900 mb-4">اطلب أدويتك بسهولة وتوصيل إلى باب منزلك
                </h3>
                <p class="text-gray-700 mb-8">اختر أدويتك من بين أفضل الصيدليات المسجلة لدينا، واستفد من العروض الحصرية. نوفر لك خدمة توصيل سريعة إلى منزلك لضمان راحتك واحتياجاتك الصحية.

                </p>
                <button className="bg-[#09243c] text-[#eca516] px-4 py-2 font-bold rounded-md transition-all duration-300 hover:bg-[#eca516] hover:text-[#09243c]">
  احجز معنا
</button>

            </div>
            <div class="bg-blue-300 shadow-lg rounded-lg p-6 text-center">
                <h3 class="text-xl font-bold text-blue-900 mb-4"> احجز موعدك في أفضل العيادات بسهولة
                </h3>
                <p class="text-gray-700 mb-8"> استعرض قائمة العيادات المسجلة في الموقع، واحجز مكانك بضغطة زر. نوفر لك طريقة سهلة ومرنة لاختيار العيادة المناسبة دون الحاجة للانتظار.

                </p>
                <button className="bg-[#09243c] text-[#eca516] px-4 py-2 font-bold rounded-md transition-all duration-300 hover:bg-[#eca516] hover:text-[#09243c]">
  احجز معنا
</button>

            </div>
            <div class="bg-orange-200 shadow-lg rounded-lg p-6 text-center">
                <h3 class="text-xl font-bold text-blue-900 mb-4">احجز ممرضًا للرعاية في منزلك
                </h3>
                <p class="text-gray-700 mb-8">   خدمة توفر لك ممرضًا مؤهلًا يصل إلى منزلك للعناية بصحتك أو صحة أفراد عائلتك. مثالي للرعاية المنزلية ومتابعة الحالات الطبية باحترافية.

                </p>
                <button className="bg-[#09243c] text-[#eca516] px-4 py-2 font-bold rounded-md transition-all duration-300 hover:bg-[#eca516] hover:text-[#09243c]">
  احجز معنا
</button>

            </div>
        </div>
    </section>
  )
}
