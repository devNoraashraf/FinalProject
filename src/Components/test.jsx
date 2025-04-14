import React from 'react'

export default function Section_eight() {
  return (
    <section class="bg-white py-16" dir='rtl'>
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-blue-900 mb-8 text-center"
        >الأسئلة الشائعة
        </h2>
        <div class="space-y-6 max-w-3xl mx-auto">
          
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <button class="w-full text-right font-semibold text-blue-900 focus:outline-none flex justify-between items-center" onclick="toggleFAQ('faq1')">
                    <span>ما هي الخدمات التي تقدمونها
                        ؟

                    </span>
                    <svg id="faq1-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 transform transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 7.707A1 1 0 116.293 6.293l3-3A1 1 0 0110 3z" clip-rule="evenodd" />
                    </svg>
                </button>
                <p id="faq1" class="text-gray-700 mt-4 hidden"
                >نحن نقدم مجموعة واسعة من الخدمات الطبية، بما في ذلك حجز المواعيد، توصيل الأدوية، وخدمات الرعاية المنزلية.

                </p>
            </div>

          
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <button class="w-full text-right font-semibold text-blue-900 focus:outline-none flex justify-between items-center" onclick="toggleFAQ('faq2')">
                    <span>كيف يمكنني حجز موعد؟

                        
                    </span>
                    <svg id="faq2-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 transform transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 7.707A1 1 0 116.293 6.293l3-3A1 1 0 0110 3z" clip-rule="evenodd" />
                    </svg>
                </button>
                <p id="faq2" class="text-gray-700 mt-4 hidden"
                >يمكنك حجز موعد بسهولة من خلال موقعنا الإلكتروني أو عبر تطبيق الهاتف المحمول.</p>
            </div>

          
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <button class="w-full text-right font-semibold text-blue-900 focus:outline-none flex justify-between items-center" onclick="toggleFAQ('faq3')">
                    <span>هل تقبلون التأمين الصحي؟</span>
                    <svg id="faq3-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 transform transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 7.707A1 1 0 116.293 6.293l3-3A1 1 0 0110 3z" clip-rule="evenodd" />
                    </svg>
                </button>
                <p id="faq3" class="text-gray-700 mt-4 hidden"
                >نعم، نحن نتعاون مع العديد من شركات التأمين الصحي لتوفير الخدمات المناسبة لك.</p>
            </div>
        </div>
    </div>
</section>
  )
}