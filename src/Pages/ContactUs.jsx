import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section className="relative py-24 overflow-hidden" dir="rtl">
      {/* الخلفية الفاخرة */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#006270] opacity-95"></div>
        <div 
          className="absolute inset-0 bg-[url('/src/assets/nora1.jpg')] bg-cover bg-center"
          style={{ opacity: 0.15 }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_at_center,_#008080_0,_rgba(0,98,114,0)_70%)] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">تواصل مع فريق Medicross</h2>
          <div className="w-32 h-1.5 bg-white/30 mx-auto mb-6 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl">
            نحن هنا لمساعدتك! اترك رسالتك وسيتواصل معك فريقنا في أسرع وقت
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* نموذج الاتصال */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-[#006272] mb-6 text-right">أرسل رسالتك</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 text-right">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 text-right border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                      placeholder="الاسم الكامل"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 text-right">البريد الإلكتروني</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3 text-right border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                        placeholder="example@domain.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 text-right">رقم الهاتف</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-3 text-right border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                        placeholder="+966 5X XXX XXXX"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-2 text-right">الرسالة</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 text-right border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition duration-300"
                      rows="5"
                      placeholder="اكتب رسالتك هنا..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg transition duration-300 ${
                      isSubmitting ? 'bg-[#008080]/90' : 'bg-gradient-to-l from-[#008080] to-[#006272] hover:from-[#006272] hover:to-[#004d5a]'
                    } shadow-lg hover:shadow-xl`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري الإرسال...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        إرسال الرسالة
                      </span>
                    )}
                  </motion.button>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg text-right border border-green-200"
                    >
                      <div className="flex items-start">
                        <svg className="mt-1 ml-2 w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <h4 className="font-medium">تم إرسال رسالتك بنجاح!</h4>
                          <p className="text-sm mt-1">سيقوم فريقنا بالتواصل معك خلال 24 ساعة. شكراً لثقتك بمركز Medicross.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 flex-1">
              <div className="p-8 sm:p-10 h-full">
                <h3 className="text-2xl font-bold text-white mb-8 text-right">معلومات التواصل</h3>
                
                <div className="space-y-8">
                  {/* بطاقة معلومات */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="flex flex-row-reverse items-start bg-white/5 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="ml-4 mt-1">
                      <div className="bg-[#008080] p-3 rounded-lg shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-medium text-white/90">البريد الإلكتروني</h4>
                      <p className="text-white/70 mt-1">info@medicross.com</p>
                      <p className="text-white/70">support@medicross.com</p>
                    </div>
                  </motion.div>
                  
                  {/* بطاقة معلومات */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="flex flex-row-reverse items-start bg-white/5 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="ml-4 mt-1">
                      <div className="bg-[#008080] p-3 rounded-lg shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-medium text-white/90">الهاتف</h4>
                      <p className="text-white/70 mt-1">+966 12 345 6789</p>
                      <p className="text-white/70">+966 50 123 4567</p>
                    </div>
                  </motion.div>
                  
                  {/* بطاقة معلومات */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="flex flex-row-reverse items-start bg-white/5 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="ml-4 mt-1">
                      <div className="bg-[#008080] p-3 rounded-lg shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-medium text-white/90">العنوان</h4>
                      <p className="text-white/70 mt-1">حي الصحافة، شارع الملك فهد</p>
                      <p className="text-white/70">جدة، المملكة العربية السعودية</p>
                    </div>
                  </motion.div>
                  
                  {/* بطاقة معلومات */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="flex flex-row-reverse items-start bg-white/5 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="ml-4 mt-1">
                      <div className="bg-[#008080] p-3 rounded-lg shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-medium text-white/90">ساعات العمل</h4>
                      <p className="text-white/70 mt-1">الأحد - الخميس: 8 صباحاً - 10 مساءً</p>
                      <p className="text-white/70">الجمعة - السبت: 4 مساءً - 10 مساءً</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-white font-medium mb-4 text-right">تابعنا على وسائل التواصل</h4>
                  <div className="flex justify-end space-x-4 space-x-reverse">
                    <motion.a 
                      href="#" 
                      whileHover={{ y: -3 }}
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ y: -3 }}
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ y: -3 }}
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      whileHover={{ y: -3 }}
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
