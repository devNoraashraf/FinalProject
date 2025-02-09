import logo from "../assets/image.png";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto py-10 px-6 grid md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <img src={logo} alt="شعار Medicross" className="w-10 h-10 mr-2" />
            Medicross
          </h3>
          <p className="text-gray-300 mb-4">
            في مجال الرعاية الصحية كان هناك حاجة لتطوير الخدمات الجديدة وكذلك تحسين الأداء الحالي.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-skype"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-telegram"></i></a>
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">روابط الخدمات</h3>
          <ul>
            <li><a href="#" className="text-gray-300 hover:underline">أمراض الرئة</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">العظام</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">الصيدلية</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">إصابات رياضية</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">القلب</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">خدمات الأسنان</a></li>
          </ul>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">روابط عنّا</h3>
          <ul>
            <li><a href="#" className="text-gray-300 hover:underline">من نحن</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">دراسات حالة</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">وظائفنا</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">شهادات العملاء</a></li>
            <li><a href="#" className="text-gray-300 hover:underline">الاتصال والموقع</a></li>
          </ul>
        </div>

        {/* Contact With Us */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl text-blue-900 font-bold mb-4">تواصل معنا!</h3>
          <p className="text-gray-800 mb-2">العنوان: 511 SW 10th Ave 1206, Portland, OR الولايات المتحدة</p>
          <p className="text-gray-800 mb-2">بريد الدعم: <a href="mailto:Medicrosshealth@gmail.com" className="hover:underline">Medicrosshealth@gmail.com</a></p>
          <p className="text-gray-800 mb-4">ساعات العمل: من الاثنين إلى السبت: 7:00 صباحًا – 7:00 مساءً</p>
          <p className="text-yellow-400 font-bold mb-4">الطوارئ 24 ساعة: +1 800-123-1234</p>
          <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 block text-center transition">طلب موعد</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-sm text-gray-400 text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>&copy; 2024 Case-Themes. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">خريطة الموقع</a>
            <a href="#" className="hover:underline">الشروط والأحكام</a>
            <a href="#" className="hover:underline">سياسة الخصوصية</a>
            <a href="#" className="hover:underline">إدارة ملفات تعريف الارتباط</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
