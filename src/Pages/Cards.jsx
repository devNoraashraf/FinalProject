import { useState } from "react";
import { FaClinicMedical, FaUserMd, FaPills, FaLaptopMedical } from "react-icons/fa";
import { MdMedicalServices, MdHealthAndSafety } from "react-icons/md";
import { Link } from "react-router-dom";

function Cards() {
  const [showMore, setShowMore] = useState(false);
  
  const services = [
    {
      id: 1,
      title: "حجز دكتور",
      description: "احجز موعدًا مع أفضل الأطباء في مختلف التخصصات بسهولة. اختر التخصص والموقع والوقت المناسب لك.",
      icon: <FaUserMd className="text-4xl text-[#00325f]" />,
      link: "/booking",
      buttonText: "احجز موعدًا"
    },
    {
      id: 2,
      title: "صيدلية",
      description: "اطلب الأدوية بسهولة واحصل على توصيل سريع لمنزلك. نوفر تشكيلة واسعة من الأدوية والمنتجات الصحية.",
      icon: <FaPills className="text-4xl text-[#00325f]" />,
      link: "/pharmacy",
      buttonText: "اطلب أدويتك"
    },
    {
      id: 3,
      title: " تشخيص الأمراض",
      description: "استشر أطباء متخصصين عبر الإنترنت في أي وقت. احصل على تشخيص دقيق ونصائح طبية فورية.",
      icon: <FaLaptopMedical className="text-4xl text-[#00325f]" />,
      link: "/nora",
      buttonText: "استشر طبيبك"
    },
    {
      id: 4,
      title: "الفحوصات المنزلية",
      description: "خدمة الفحوصات المخبرية في منزلك مع نتائج دقيقة وسريعة. نوفر جميع أنواع التحاليل الطبية.",
      icon: <MdMedicalServices className="text-4xl text-[#00325f]" />,
      link: "/tests",
      buttonText: "احجز فحصك"
    },
    {
      id: 5,
      title: "الرعاية المنزلية",
      description: "تمتع برعاية تمريضية متخصصة في منزلك. نوفر ممرضين وممرضات مؤهلين لجميع احتياجاتك الصحية.",
      icon: <MdHealthAndSafety className="text-4xl text-[#00325f]" />,
      link: "/home-care",
      buttonText: "اطلب الخدمة"
    },
    {
      id: 6,
      title: "التأمين الصحي",
      description: "حلول تأمين صحي شاملة بأسعار تنافسية. نوفر أفضل التغطيات التأمينية من شركات رائدة.",
      icon: <FaClinicMedical className="text-4xl text-[#00325f]" />,
      link: "/insurance",
      buttonText: "احصل على تأمينك"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#00325f] mb-4">خدماتنا الطبية</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          نقدم حلولاً طبية متكاملة لراحتكم وضمان صحتكم
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl">
        {services.slice(0, showMore ? services.length : 3).map((service) => (
          <div 
            key={service.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-end mb-4">
                <div className="bg-[#f5f9ff] p-3 rounded-full">
                  {service.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#00325f] mb-3 text-right">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-6 text-right leading-relaxed">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="block w-full py-3 px-6 bg-gradient-to-r from-[#00325f] to-[#006272] text-white text-center rounded-lg hover:from-[#006272] hover:to-[#00325f] transition-all duration-300 font-medium"
              >
                {service.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-8 py-3 bg-white text-[#00325f] border-2 border-[#00325f] rounded-full hover:bg-[#00325f] hover:text-white transition-colors duration-300 font-semibold"
        >
          {showMore ? "عرض خدمات أقل" : "عرض جميع الخدمات"}
        </button>
      </div>
    </div>
  );
}

export default Cards;