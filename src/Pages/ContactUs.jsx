import React from 'react'
import img from '../assets/care3.avif';

function ContactUs() {
  return (

        <div>
        <p className="text-gray-600 mb-4 mt-4 text-center text-[25px]">نحن هنا لمساعدتك. يمكنك التواصل معنا عبر البريد الإلكتروني أو رقم الهاتف أو تعبئة النموذج أدناه.</p>

        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-6" dir="rtl" >
            <div className="md:w-1/2 flex flex-col p-8">
            <img src={img} alt="" className="w-full h-auto mb-4" />
              <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> contact@website.com</p>
              <p className="text-gray-700"><strong>الهاتف:</strong> 002 0112345678</p>
              <p className="text-gray-700"><strong>العنوان:</strong> اسوان و مصر </p>
            </div>
            
            {/* نموذج التواصل */}
            <div className="md:w-1/2 p-8">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الاسم</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    placeholder="أدخل اسمك" 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    placeholder="أدخل بريدك الإلكتروني" 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الرسالة</label>
                  <textarea 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    rows="4" 
                    placeholder="اكتب رسالتك هنا" 
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
                >
                  إرسال
                </button>
              </form>
            </div>
          </div>
          </div>
    );

}

export default ContactUs