import React from "react";
import { FaClinicMedical, FaUserMd, FaHeartbeat, FaHandsHelping, FaStethoscope } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#006272] mb-6">
            <span className="inline-block mr-2">
              <GiHealthNormal className="text-[#006272] inline" />
            </span>
            من نحن في MediCross
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            رحلتنا في تقديم الرعاية الصحية المتميزة التي تضع المريض في قلب اهتماماتنا
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-[#006272] mb-6">رسالتنا</h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  نهدف إلى جعل الرعاية الصحية عالية الجودة في متناول الجميع من خلال حلول طبية متكاملة وتجربة مريض استثنائية.
                </p>
                <div className="flex items-center text-[#006272]">
                  <FaHeartbeat className="text-3xl mr-4" />
                  <span className="text-xl font-semibold">صحتكم.. أولويتنا</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Medical Team"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#006272] mb-12 text-center">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#006272]">
              <div className="text-[#006272] mb-4">
                <FaUserMd className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">التميز الطبي</h3>
              <p className="text-gray-600">
                نلتزم بأعلى معايير الجودة الطبية ونوفر كوادر طبية على أعلى مستوى من الخبرة والكفاءة.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#006272]">
              <div className="text-[#006272] mb-4">
                <FaClinicMedical className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">الابتكار</h3>
              <p className="text-gray-600">
                نواكب أحدث التطورات الطبية والتقنية لضمان تقديم حلول علاجية متطورة وفعالة.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#006272]">
              <div className="text-[#006272] mb-4">
                <FaHandsHelping className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">التعاطف</h3>
              <p className="text-gray-600">
                نقدم رعاية طبية إنسانية تركز على المريض وتتفهم احتياجاته النفسية والجسدية.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Team Section */}
        <div className="bg-[#006272] rounded-2xl shadow-xl overflow-hidden text-white mb-16">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">فريقنا الطبي المتميز</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                نخبة من أفضل الأطباء والمختصين في مختلف التخصصات الطبية
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "د. أحمد علي",
                  specialty: "استشاري جراحة القلب",
                  experience: "20 سنة خبرة",
                  img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "د. سارة محمد",
                  specialty: "استشارية نساء وتوليد",
                  experience: "15 سنة خبرة",
                  img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "د. خالد عبدالله",
                  specialty: "أخصائي جراحة العظام",
                  experience: "18 سنة خبرة",
                  img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "د. نادية فاروق",
                  specialty: "استشارية طب أطفال",
                  experience: "12 سنة خبرة",
                  img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map((doctor, index) => (
                <div key={index} className="group bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="relative mb-6 overflow-hidden rounded-lg h-48">
                    <img 
                      src={doctor.img} 
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="bg-[#00a3b8] px-3 py-1 rounded-full text-sm font-medium">
                        {doctor.experience}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-[#a7e4ed] mb-4 flex items-center">
                    <FaStethoscope className="mr-2 text-sm" /> {doctor.specialty}
                  </p>
                  <button className="text-sm w-full py-2 border border-white rounded-lg hover:bg-white hover:text-[#006272] transition-colors">
                    عرض التفاصيل
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white text-[#006272] rounded-lg hover:bg-gray-100 font-semibold transition-colors">
                تعرف على المزيد من أطبائنا
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#006272] mb-6">انضم إلى رحلتنا في رعاية صحية أفضل</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            سواء كنت تبحث عن استشارة طبية أو ترغب في الانضمام إلى فريقنا، نحن هنا لمساعدتك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors font-medium">
              احجز موعدًا الآن
            </button>
            <button className="px-8 py-3 border-2 border-[#006272] text-[#006272] rounded-lg hover:bg-[#006272]/10 transition-colors font-medium">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;