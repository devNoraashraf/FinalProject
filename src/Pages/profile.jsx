import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import useAuthStore from "../../store";
import { 
  FiUser, 
  FiLock, 
  FiLogOut, 
  FiCalendar, 
  FiPhone, 
  FiMail,
  FiSettings,
  FiMessageSquare,
  FiClock,
  FiBell,
  FiShield,
  FiEdit
} from "react-icons/fi";
import { RiStethoscopeLine } from "react-icons/ri";

const cookies = new Cookies();

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phoneNumber || "",
    bloodType: "",
    allergies: ""
  });
  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminders: true,
    newMessages: true,
    medicalUpdates: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    shareMedicalData: true,
    showNameInReviews: false
  });

  const handleLogout = () => {
    auth.signOut().then(() => {
      cookies.remove("auth-token");
      navigate("/signIn");
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // هنا سيتم حفظ التغييرات في قاعدة البيانات
    console.log("تم حفظ البيانات:", formData);
  };

  const toggleNotificationSetting = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const requestAccountDeletion = () => {
    if(window.confirm("هل أنت متأكد من رغبتك في حذف حسابك؟ سيتم فقدان جميع بياناتك بشكل دائم.")) {
      // هنا سيتم تنفيذ عملية حذف الحساب
      console.log("تم طلب حذف الحساب");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ملفي الشخصي</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <FiLogOut className="mr-2" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                        {user?.name?.charAt(0) || "م"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">{user?.name || "مستخدم"}</h2>
                    <p className="text-sm text-gray-500">حساب مريض</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        <FiUser className={activeTab === "profile" ? "text-blue-500" : "text-gray-500"} />
                        <span>الملف الشخصي</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("appointments")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "appointments" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        <FiCalendar className={activeTab === "appointments" ? "text-blue-500" : "text-gray-500"} />
                        <span>الحجوزات</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("messages")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "messages" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        <FiMessageSquare className={activeTab === "messages" ? "text-blue-500" : "text-gray-500"} />
                        <span>المحادثات</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        <FiSettings className={activeTab === "settings" ? "text-blue-500" : "text-gray-500"} />
                        <span>الإعدادات</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">معلوماتي الشخصية</h2>
                    <p className="text-sm text-gray-500 mt-1">إدارة معلومات حسابك الشخصي</p>
                  </div>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors text-sm flex items-center gap-2"
                    >
                      <FiEdit size={14} /> تعديل الملف
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        إلغاء
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors text-sm"
                      >
                        حفظ التغييرات
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Avatar */}
                    <div className="relative">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-bold border-4 border-blue-50">
                          {user?.name?.charAt(0) || "م"}
                        </div>
                      )}
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                          <FiEdit className="text-gray-600" size={14} />
                        </button>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">الاسم الكامل</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                          ) : (
                            <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                              <p className="text-gray-800">{user?.name || "غير محدد"}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">البريد الإلكتروني</label>
                          <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                            <p className="text-gray-800">{user?.email || "غير محدد"}</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">رقم الهاتف</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                              placeholder="أدخل رقم الهاتف"
                            />
                          ) : (
                            <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                              <p className="text-gray-800">{user?.phoneNumber || "غير محدد"}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">تاريخ التسجيل</label>
                          <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                            <p className="text-gray-800">
                              {user?.metadata?.creationTime 
                                ? new Date(user.metadata.creationTime).toLocaleDateString('ar-EG') 
                                : "غير متوفر"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Medical Info Section */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                          <RiStethoscopeLine className="mr-2 text-blue-500" />
                          المعلومات الطبية
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">فصيلة الدم</label>
                            {isEditing ? (
                              <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                              >
                                <option value="">اختر فصيلة الدم</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                              </select>
                            ) : (
                              <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <p className="text-gray-800">{formData.bloodType || "غير محدد"}</p>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">الحساسيات</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                placeholder="أدخل الحساسيات إن وجدت"
                              />
                            ) : (
                              <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <p className="text-gray-800">{formData.allergies || "غير محدد"}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5">
                  <h2 className="text-xl font-semibold text-gray-800">حجوزاتي</h2>
                  <p className="text-sm text-gray-500 mt-1">عرض وإدارة مواعيدك الطبية</p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <FiClock className="mx-auto text-4xl text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">لا توجد حجوزات حالية</h3>
                      <p className="text-gray-500 mt-1">يمكنك حجز موعد جديد من خلال صفحة الأطباء</p>
                      <button
                        onClick={() => navigate("/doctors")}
                        className="mt-4 px-6 py-2 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors"
                      >
                        عرض الأطباء
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5">
                  <h2 className="text-xl font-semibold text-gray-800">محادثاتي</h2>
                  <p className="text-sm text-gray-500 mt-1">عرض المحادثات مع الأطباء</p>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <FiMessageSquare className="mx-auto text-4xl text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">لا توجد محادثات حالية</h3>
                      <p className="text-gray-500 mt-1">يمكنك بدء محادثة جديدة مع طبيب من خلال صفحة الأطباء</p>
                      <button
                        onClick={() => navigate("/doctors")}
                        className="mt-4 px-6 py-2 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors"
                      >
                        عرض الأطباء
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5">
                  <h2 className="text-xl font-semibold text-gray-800">إعدادات المريض</h2>
                  <p className="text-sm text-gray-500 mt-1">إدارة إعدادات حسابك الشخصي</p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {/* الأمان والحساب */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                        <FiLock className="mr-2 text-blue-500" />
                        الأمان والحساب
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">تغيير كلمة المرور</p>
                          <Link
                            to="/change-password"
                            className="inline-block px-4 py-2 bg-[#006272] text-white rounded-lg hover:bg-[#004d5a] transition-colors text-sm"
                          >
                            تغيير كلمة المرور
                          </Link>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">حذف الحساب</p>
                          <button 
                            onClick={requestAccountDeletion}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm"
                          >
                            طلب حذف الحساب
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* التفضيلات والإشعارات */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                        <FiBell className="mr-2 text-blue-500" />
                        التفضيلات والإشعارات
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">تذكير بالمواعيد</p>
                            <p className="text-xs text-gray-500">إشعارات قبل الموعد ب 24 ساعة وساعة</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.appointmentReminders}
                              onChange={() => toggleNotificationSetting('appointmentReminders')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">إشعارات الرسائل</p>
                            <p className="text-xs text-gray-500">إشعارات عند وصول رسائل جديدة من الأطباء</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.newMessages}
                              onChange={() => toggleNotificationSetting('newMessages')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">التحديثات الطبية</p>
                            <p className="text-xs text-gray-500">إشعارات حول التحديثات والمقالات الطبية</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.medicalUpdates}
                              onChange={() => toggleNotificationSetting('medicalUpdates')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* الخصوصية */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                        <FiShield className="mr-2 text-blue-500" />
                        الخصوصية
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">مشاركة البيانات الطبية</p>
                            <p className="text-xs text-gray-500">السماح للأطباء برؤية معلوماتك الطبية</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={privacySettings.shareMedicalData}
                              onChange={() => togglePrivacySetting('shareMedicalData')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">إظهار الاسم في التقييمات</p>
                            <p className="text-xs text-gray-500">عند تقييم الأطباء والخدمات</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={privacySettings.showNameInReviews}
                              onChange={() => togglePrivacySetting('showNameInReviews')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;