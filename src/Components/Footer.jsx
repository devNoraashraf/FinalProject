import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-[#09243c] text-white" dir="rtl">
    <div className="container mx-auto py-10 px-6 grid md:grid-cols-4 gap-8">
     
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <img src={logo} alt="شعار Medicross" className="w-20 h-20 mr-2" /> Medicross
        </h3>
        <p className="text-gray-300 mb-4">
          في مجال الرعاية الصحية كان هناك حاجة لتطوير الخدمات الجديدة وكذلك تحسين الأداء الحالي.
          فاسيليسوس اجلس في حالة مزاجية جيدة، مع وقت ممتع.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-skype"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-telegram"></i></a>
        </div>
      </div>

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

      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-xl text-blue-900 font-bold mb-4">تواصل معنا!</h3>
        <p className="text-black mb-2">العنوان: 511 SW 10th Ave 1206, Portland, OR الولايات المتحدة</p>
        <p className="text-black mb-2">بريد الدعم: Medicrosshealth@gmail.com</p>
        <p className="text-black mb-4">ساعات العمل: من الاثنين إلى السبت: 7:00 صباحًا – 7:00 مساءً</p>
        <p className="text-yellow-400 font-bold mb-4">الطوارئ 24 ساعة: +1 800-123-1234</p>
        <a href="#" className="bg-[#eca516] text-white py-2 px-4 rounded-lg hover:bg-[#09243c] block text-center">طلب موعد</a>
      </div>
    </div>

    <div className="border-t border-gray-700 py-4 text-sm text-gray-400 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p>&copy; 2025 جميع الحقوق محفوظة.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:underline text-[#eca516]" >خريطة الموقع</a>
          <a href="#" className="hover:underline text-[#eca516]">الشروط والأحكام</a>
          <a href="#" className="hover:underline text-[#eca516]">سياسة الخصوصية</a>
          <a href="#" className="hover:underline text-[#eca516]">إدارة ملفات تعريف الارتباط</a>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
