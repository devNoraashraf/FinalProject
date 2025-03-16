import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";  
function ServicePage() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "ما هي الخدمات التي تقدمونها؟",
            answer: "  نحن نقدم مجموعة واسعة من الخدمات الطبية، بما في ذلك حجز المواعيد، توصيل الأدوية، وخدمات الرعاية المنزلية."

        },
        {
            question: "كيف يمكنني حجز موعد؟",

            answer: "يمكنك حجز موعد بسهولة من خلال موقعنا الإلكتروني أو عبر تطبيق الهاتف المحمول."
            
        },
        {
            question: " هل تقبلون التأمين الصحي؟",
            answer: "نعم، نحن نتعاون مع العديد من شركات التأمين الصحي لتوفير الخدمات المناسبة لك."
        },
        
 
    ];

    return (
        <>
            <section className="py-12 bg-gray-100" dir='rtl'>
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">F.A.Q.</h1>
                        <p className="text-gray-600">الاسئلة الاكثر شيوعا.</p>
                    </div>
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-none">
                            <div
                                className="flex justify-between items-center cursor-pointer py-4 px-2 text-lg font-semibold text-gray-800 transition-all hover:text-blue-600"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                {activeIndex === index ? (
                                    <FaChevronDown className="text-gray-500 transition-transform" />
                                ) : (
                                    <FaChevronUp className="text-gray-500 transition-transform" />
                                )}
                            </div>
                            {activeIndex === index && (
                                <div className="px-2 pb-4 text-gray-600">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default ServicePage;
