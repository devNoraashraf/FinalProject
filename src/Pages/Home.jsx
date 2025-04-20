import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "/firebase-config";// Adjust the import path as needed

// الألوان الجديدة
const colors = {
  primary: '#006272',
  primaryLight: '#008080',
  secondary: '#e0f7fa',
  accent: '#ff7043',
  textDark: '#1a365d',
  textLight: '#f7fafc'
};

// بيانات الخدمات
const services = [
  {
    id: 1,
    title: "تشخيص الامراض ",
    description: "تشخيص وعلاج أمراض القلب والأوعية الدموية بأحدث التقنيات",
    icon: "❤️"
  },
  {
    id: 2,
    title: "حجز دكتور",
    description: "رعاية شاملة     ",
    icon: "❤️"
  },
  {
    id: 3,
    title: " الصيدلية",
    description: "   الادوية   ",
    icon: "🧴"
  }
];

// بيانات آراء العملاء
const testimonials = [
  {
    id: 1,
    name: "محمد علي",
    role: "مريض قلب",
    comment: "الدكتور أحمد من أفضل الأطباء الذين قابلتهم، شرح الوضع بطريقة واضحة وقدم العلاج المناسب",
    rating: 5
  },
  {
    id: 2,
    name: "سارة أحمد",
    role: "أم لطفلين",
    comment: "الدكتورة سارة رائعة مع الأطفال، ابني لم يعد يخاف من زيارة الطبيب بفضلها",
    rating: 5
  },
  {
    id: 3,
    name: "أحمد حسن",
    role: "مريض جلدية",
    comment: "بعد سنوات من المعاناة مع الأكزيما، الدكتور محمد ساعدني في السيطرة على الحالة",
    rating: 4
  }
];

// مكون نجمة التقييم
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// مكون بطاقة الخدمة مع أنيميشن
const ServiceCard = ({ service, index }) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }}
  >
    <motion.div
      className="text-4xl mb-4"
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {service.icon}
    </motion.div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
    <p className="text-gray-600 mb-4">{service.description}</p>
    <motion.button
      className={`text-${colors.primary} font-semibold hover:text-${colors.primaryLight} transition duration-300 mt-auto`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      المزيد من التفاصيل →
    </motion.button>
  </motion.div>
);

function Home() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section مع أنيميشن متطور */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 opacity-90 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full opacity-10"
            animate={{
              x: [0, 1000],
              y: [0, 500],
              scale: [1, 0.5],
              opacity: [0.1, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-white rounded-full opacity-10"
            animate={{
              x: [0, 800],
              y: [0, 300],
              scale: [1, 0.3],
              opacity: [0.1, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: 2
            }}
          />
        </motion.div>

        <motion.div
          className="text-center text-white z-20 px-4 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            مركز <span style={{ color: colors.primaryLight }}> Medicross</span> للرعاية الصحية
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            نقدم رعاية صحية شاملة بمعايير عالمية، مع فريق من أفضل الأطباء المتخصصين
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <motion.button
              className={`bg-${colors.primary} hover:bg-${colors.primaryLight} text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300`}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 15px ${colors.primaryLight}`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/booking" className="block w-full h-full">
                احجز موعد الآن
              </Link>
            </motion.button>

            <motion.button
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/services" className="block w-full h-full">
                تعرف على خدماتنا
              </Link>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Services Section - تصميم محسن وأنيق مع محاذاة يمين للنص */}
      <section className="py-20 bg-[#f8fafa]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[#006272] mb-4">
              خدماتنا الطبية المتكاملة
            </h2>
            <div className="w-24 h-1 bg-[#006272] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              نقدم حزمة متكاملة من الخدمات الطبية بأعلى معايير الجودة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🩺",
                title: "تشخيص الأمراض",
                points: [
                  "تشخيص دقيق بالذكاء الاصطناعي",
                  "دليلك للذهاب إلى الطبيب",
                  "اختيارك للطبيب المناسب"
                ]
              },
              {
                icon: "👨‍⚕️",
                title: "حجز الأطباء",
                points: [
                  "أكبر شبكة أطباء متخصصين",
                  "حجز موعد في دقائق",
                  "استشارة الدكتور فورا"
                ]
              },
              {
                icon: "💊",
                title: "خدمة الصيدلية",
                points: [
                  "طلب أدوية أونلاين",
                  "توصيل سريع للمنزل",
                  "جميع الأدوية لدينا"
                ]
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#006272]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#e0f7fa] flex items-center justify-center text-4xl">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#006272] mb-4 text-center">
                  {service.title}
                </h3>
                <ul className="space-y-3 text-gray-700 text-right pr-4" dir="rtl">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#006272] ml-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>

              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Doctors Section المعدل لجلب البيانات من Firebase */}
      {/* Doctors Section المعدل لجلب البيانات من Firebase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">فريق أطبائنا</h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-6 overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: colors.primary }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              تعرف على فريقنا من الأطباء المتخصصين ذوي الخبرة الواسعة
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              <p>حدث خطأ في جلب بيانات الأطباء: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.slice(0, 3).map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* صورة الطبيب مع تأثير حركي */}
                  <motion.div
                    className="w-full h-64 overflow-hidden relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    {/* شريط التخصص */}
                    <div
                      className="absolute bottom-0 right-0 bg-[#006272] text-white px-4 py-2 text-sm font-medium"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {doctor.specialty}
                    </div>
                  </motion.div>

                  {/* محتوى البطاقة */}
                  <div className="p-6 text-right">
                    {/* اسم الطبيب */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>



                    {/* التقييم */}
                    {typeof doctor.review === "number" && (
                      <div className="flex items-center mb-4">
                        <StarRating rating={doctor.review} />
                        <span className="text-gray-500 text-sm mr-2">({doctor.review})</span>
                      </div>
                    )}

                    {/* أزرار الحجز والمزيد */}
                    <div className="flex justify-center items-center mt-6">


                      <motion.button
                        className={`bg-[#006272] hover:bg-[#008080] text-white px-6 py-2 rounded-lg font-medium transition duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link to={`/booking?doctor=${doctor.id}`}>
                          احجز الآن
                        </Link>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {/* Pharmacy Section - خدمة طلب الأدوية */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">

            {/* المحتوى النصي */}
            <motion.div
              className="md:w-1/2 text-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#006272] mb-4">
                اطلب أدويتك أونلاين بسهولة
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                اطلب أدويتك أونلاين من خلال موقعنا الإلكتروني. نقدم لك خدمة توصيل سريعة وآمنة لجميع الأدوية المطلوبة.
              </p>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li className="flex items-center justify-end gap-2">
                  <svg className="w-5 h-5 text-[#006272]" fill="currentColor" viewBox="0 0 20 20"><path d="M5 13l4 4L19 7" /></svg>
                  تشكيلة واسعة من الأدوية
                </li>
                <li className="flex items-center justify-end gap-2">
                  <svg className="w-5 h-5 text-[#006272]" fill="currentColor" viewBox="0 0 20 20"><path d="M5 13l4 4L19 7" /></svg>
                  توصيل سريع وآمن
                </li>
                <li className="flex items-center justify-end gap-2">
                  <svg className="w-5 h-5 text-[#006272]" fill="currentColor" viewBox="0 0 20 20"><path d="M5 13l4 4L19 7" /></svg>
                  استشارة دوائية إن لزم
                </li>
              </ul>
              <Link to="/pharmacy">
                <button className="bg-[#006272] hover:bg-[#008080] text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
                  اطلب الآن
                </button>
              </Link>
            </motion.div>

            {/* صورة تمثل الخدمة */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="src/assets/pht.avif"
                alt="طلب أدوية"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </section>

      </section>
      {/* Appointment Section مع أنيميشن متميز */}
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0 md:pr-8 text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                احجز موعدك الآن
              </motion.h2>
              <motion.p
                className="text-blue-100 mb-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                لا تنتظر في الطوابير، احجز موعدك مع طبيب متخصص في أي وقت ومن أي مكان
              </motion.p>
              <motion.ul
                className="space-y-3 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.li
                  className="flex items-center"
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  حجز سريع وسهل خلال دقائق
                </motion.li>
                <motion.li
                  className="flex items-center"
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  إشعارات تذكير بالموعد
                </motion.li>
                <motion.li
                  className="flex items-center"
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  إمكانية إلغاء أو تعديل الموعد
                </motion.li>
              </motion.ul>
              <motion.button
                className="bg-white text-gray-800 hover:bg-gray-400 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/booking" className="block w-full h-full">
                  احجز موعد الآن
                </Link>
              </motion.button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="حجز موعد"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section مع أنيميشن متطور */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              آراء مرضانا
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gray-300 mx-auto mb-6 overflow-hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: colors.primary }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              ما يقوله مرضانا عن تجربتهم مع مركزنا الطبي
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <motion.p
                  className="text-gray-600 italic mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  "{testimonial.comment}"
                </motion.p>
                <StarRating rating={testimonial.rating} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action مع أنيميشن جذاب */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="bg-white rounded-xl shadow-md p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 rounded-full"
              style={{ backgroundColor: colors.primary, opacity: 0.1 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.05, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full"
              style={{ backgroundColor: colors.primary, opacity: 0.1 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.05, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 2
              }}
            />

            <motion.h2
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              هل لديك استفسار أو تحتاج إلى مساعدة؟
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-8 max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              فريقنا الطبي جاهز للإجابة على جميع استفساراتك وتقديم النصائح الطبية اللازمة
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className={`bg-${colors.primary} hover:bg-${colors.primaryLight} text-black px-8 py-3 rounded-lg font-semibold text-lg transition duration-300`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 15px ${colors.primaryLight}`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/ContactUs" className="block w-full h-full">
                  اتصل بنا الآن
                </Link>
              </motion.button>
              <motion.button
                className={`bg-white border border-${colors.primary} text-${colors.primary} hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                اطرح سؤالاً
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* App Promo Section */}
      <section className="py-20 bg-[#f0fbfc]">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* النص */}
          <motion.div
            className="md:w-1/2 text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#006272] mb-6 leading-tight">
              حمل تطبيقنا الآن
            </h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              تابع مواعيدك، استلم إشعارات طبية، واطلب أدويتك بسهولة عبر تطبيقنا المتاح على جميع الأجهزة الذكية.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-end items-end">
              {/* زر Google Play */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="تحميل من Google Play"
                  className="h-14 hover:scale-105 transition-transform duration-300"
                />
              </a>

              {/* زر App Store محاط بخلفية بيضاء وظل */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-lg shadow-md p-1 hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="تحميل من App Store"
                    className="h-12"
                  />
                </div>
              </a>
            </div>
          </motion.div>

          {/* صورة التطبيق */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="src/assets/11.jpg"
              alt="تطبيق موبايل"
              className="w-full max-w-xs md:max-w-md rounded-3xl shadow-2xl border-4 border-white"
            />
          </motion.div>

        </div>
      </section>


    </div>
  );
}

export default Home;