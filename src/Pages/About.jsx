import React, { useState, useEffect } from "react";
import { FaClinicMedical, FaUserMd, FaHeartbeat, FaHandsHelping, FaStethoscope } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "/firebase-config"; // تأكد من المسار الصحيح لملف Firebase

function About() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = collection(db, 'Doctors');
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsList = doctorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDoctors(doctorsList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

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

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-300 py-8">
                <p>حدث خطأ في جلب بيانات الأطباء: {error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-white text-[#006272] rounded-lg"
                >
                  حاول مرة أخرى
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {doctors.slice(0, 4).map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className="group bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="relative mb-6 overflow-hidden rounded-lg h-48">
                      <img
                        src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="bg-[#00a3b8] px-3 py-1 rounded-full text-sm font-medium">
                          {doctor.experience || "خبرة واسعة"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                    <p className="text-[#a7e4ed] mb-4 flex items-center">
                      <FaStethoscope className="mr-2 text-sm" /> 
                      {doctor.specialty || "طبيب متخصص"}
                    </p>
                    
                  </div>
                ))}
              </div>
            )}

            
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#006272] mb-6">انضم إلى رحلتنا في رعاية صحية أفضل</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            سواء كنت تبحث عن استشارة طبية أو ترغب في الانضمام إلى فريقنا، نحن هنا لمساعدتك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/booking"
              className="px-8 py-3 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors font-medium text-center"
            >
              احجز موعدًا الآن
            </Link>
            <Link
              to="/ContactUs"
              className="px-8 py-3 border-2 border-[#006272] text-[#006272] rounded-lg hover:bg-[#006272]/10 transition-colors font-medium text-center"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;