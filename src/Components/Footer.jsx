import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

// تعريف الألوان
const colors = {
  primary: "#006272",
  primaryLight: "#008080",
  secondary: "#e0f7fa",
  accent: "#ff7043",
  textDark: "#1a365d",
  textLight: "#f7fafc"
};

function Footer() {
  // بيانات الروابط
  const servicesLinks = [
    { name: "أمراض الرئة", url: "#" },
    { name: "العظام", url: "#" },
    { name: "الصيدلية", url: "#" },
    { name: "إصابات رياضية", url: "#" },
    { name: "القلب", url: "#" },
    { name: "خدمات الأسنان", url: "#" }
  ];

  const aboutLinks = [
    { name: "من نحن", url: "#" },
    { name: "وظائفنا", url: "#" },
    { name: "شهادات العملاء", url: "#" },
    { name: "الاتصال والموقع", url: "#" }
  ];

  // أنيميشن للعناصر
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.05,
      color: colors.accent,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer 
      className="bg-[#09243c] text-white py-12"
      dir="rtl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-6">
        {/* العمود الأول - معلومات الشركة */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div 
            className="flex items-center mb-4"
            variants={itemVariants}
          >
            <motion.img 
              src={logo} 
              alt="شعار Medicross" 
              className="w-16 h-16 mr-3"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
            <motion.h3 
              className="text-2xl font-bold"
              whileHover={{ color: colors.accent }}
            >
              Medicross
            </motion.h3>
          </motion.div>
          <motion.p 
            className="text-gray-300 mb-6"
            variants={itemVariants}
          >
            في مجال الرعاية الصحية كان هناك حاجة لتطوير الخدمات الجديدة وكذلك تحسين الأداء الحالي.
          </motion.p>
          <motion.div 
            className="flex gap-4"
            variants={itemVariants}
          >
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-gray-300 hover:text-white text-xl"
                whileHover={{ 
                  scale: 1.2,
                  color: colors.accent
                }}
                transition={{ duration: 0.2 }}
                custom={i}
                variants={itemVariants}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* العمود الثاني - روابط الخدمات */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 pb-2 border-b-2 border-accent inline-block"
            variants={itemVariants}
          >
            روابط الخدمات
          </motion.h3>
          <motion.ul
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {servicesLinks.map((link, i) => (
              <motion.li 
                key={i}
                className="mb-2"
                custom={i}
                variants={itemVariants}
              >
                <motion.a 
                  href={link.url} 
                  className="text-gray-300 hover:text-accent flex items-center"
                  whileHover={{ x: -5 }}
                >
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  {link.name}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* العمود الثالث - روابط عنّا */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 pb-2 border-b-2 border-accent inline-block"
            variants={itemVariants}
          >
            روابط عنّا
          </motion.h3>
          <motion.ul
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {aboutLinks.map((link, i) => (
              <motion.li 
                key={i}
                className="mb-2"
                custom={i}
                variants={itemVariants}
              >
                <motion.a 
                  href={link.url} 
                  className="text-gray-300 hover:text-accent flex items-center"
                  whileHover={{ x: -5 }}
                >
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  {link.name}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* العمود الرابع - تواصل معنا */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 pb-2 border-b-2 border-accent inline-block"
            variants={itemVariants}
          >
            تواصل معنا
          </motion.h3>
          <motion.div
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div 
              className="flex items-start mb-4"
              custom={0}
              variants={itemVariants}
            >
              <FaMapMarkerAlt className="text-accent mt-1 mr-2" />
              <p className="text-gray-300">
                511 SW 10th Ave 1206, Portland, OR الولايات المتحدة
              </p>
            </motion.div>
            <motion.div 
              className="flex items-center mb-4"
              custom={1}
              variants={itemVariants}
            >
              <FaEnvelope className="text-accent mr-2" />
              <a href="mailto:Medicrosshealth@gmail.com" className="text-gray-300 hover:text-accent">
                Medicrosshealth@gmail.com
              </a>
            </motion.div>
            <motion.div 
              className="flex items-center"
              custom={2}
              variants={itemVariants}
            >
              <FaClock className="text-accent mr-2" />
              <p className="text-gray-300">
                من الاثنين إلى السبت: 7:00 صباحًا – 7:00 مساءً
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* حقوق النشر */}
      <motion.div 
        className="border-t border-gray-700 py-6 text-center text-sm text-gray-400 mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة لـ Medicross</p>
        <motion.div 
          className="flex justify-center gap-4 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
        >
          <a href="#" className="hover:text-accent">شروط الخدمة</a>
          <span>|</span>
          <a href="#" className="hover:text-accent">سياسة الخصوصية</a>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
