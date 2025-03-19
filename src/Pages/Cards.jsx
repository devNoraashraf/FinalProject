import { useState } from "react";
import img1 from '../assets/31.avif';
import img2 from '../assets/41.avif';
import img3 from '../assets/61.avif';
import img4 from '../assets/71.avif';
import img5 from '../assets/81.avif';
import img6 from '../assets/9.avif';
import img7 from '../assets/10.avif';
import img8 from '../assets/112.avif';
import img9 from '../assets/1.jpg';
import { Link } from "react-router-dom";

function Cards(){
    // const [showMore, setShowMore] = useState(false);
    return(
        <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center text-white mb-10">خدماتنا الطبية</h1>
        {/* services-list */}
        <div id="services-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" dir="rtl">
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105 " dir="rtl">
            <figure>
              <img src={img1} alt="حجز دكتور" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4" dir="rtl">
              <h2 className=" flex  text-xl font-semibold text-black">حجز دكتور</h2>
              <p className="text-base text-black leading-relaxed">احجز موعدًا مع أفضل الأطباء في مختلف التخصصات بسهولة. يمكن للمستخدمين اختيار التخصص والموقع من خلال واجهة بسيطة.</p>
              <div className="flex justify-end">
                <Link to="/booking"  className="bg-[#00325f] text-white px-4 py-4 rounded-full hover:bg-[#d68d13] transition-colors w-full  h-14 text-center">احجز موعدا</Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img2} alt="صيدلية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex  text-black">صيدلية</h2>
              <p className="text-base text-black leading-relaxed">اطلب الأدوية عبر الإنترنت وتمتع بتوصيل سريع للمنزل. نقدم لك مجموعة واسعة من الأدوية والعلاجات التي يمكنك طلبها بكل سهولة.</p>
              <div className="flex justify-end">
                <Link to="/pharmacy"  className="bg-[#00325f] text-white h-14 px-4 py-4 rounded-full hover:bg-[#d68d13] transition-colors w-full text-center">اطلب ادويتك</Link>
              </div>
            </div>
          </div>
    
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img3} alt="استشارة طبية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex text-black">استشارة طبية</h2>
              <p className="text-base text-black leading-relaxed">استشارة طبية عن بُعد مع أفضل الأطباء عبر الإنترنت. استمتع بالحصول على مشورة طبية دقيقة وسريعة في الوقت الذي يناسبك.</p>
              <div className="flex justify-end">
                <Link to="/auth"  className="bg-[#00325f] text-white h-14 px-4 py-4 rounded-full hover:bg-[#d68d13] transition-colors w-full text-center">استشر طبيبك</Link>
              </div>
            </div>
          </div>
        </div>
        {/* more-services
        {showMore && (
        <div id="more-services" className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img4} alt="حجز دكتور" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex justify-end text-black">حجز دكتور</h2>
              <p className="text-base text-black leading-relaxed">احجز موعدًا مع أفضل الأطباء في مختلف التخصصات بسهولة. يمكن للمستخدمين اختيار التخصص والموقع من خلال واجهة بسيطة  .</p>
              <div className="flex justify-end">
                <button className="bg-[#00325f] text-white h-14 px-4 py-2 rounded-full w-full hover:bg-[#d68d13] transition-colors">تواصل</button>
              </div>
            </div>
          </div>
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img5} alt="صيدلية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex justify-end text-black">صيدلية</h2>
              <p className="text-base text-black leading-relaxed">اطلب الأدوية عبر الإنترنت وتمتع بتوصيل سريع للمنزل نقدم لك مجموعة من الأدوية والعلاجات التي يمكنك طلبها بكل سهولة.</p>
              <div className="flex justify-end">
                <button className="bg-[#00325f] text-white h-14 px-4 py-2 rounded-full hover:bg-[#d68d13] transition-colors w-full">تواصل</button>
              </div>
            </div>
          </div>
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img6} alt="استشارة طبية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex justify-end text-black">استشارة طبية</h2>
              <p className="text-base text-black leading-relaxed">استشارة طبية عن بُعد مع أفضل الأطباء عبر الإنترنت. استمتع بالحصول على مشورة طبية دقيقة وسريعة في الوقت الذي يناسبك.</p>
              <div className="flex justify-end">
                <button className="bg-[#00325f] text-white h-14 px-4 py-2 rounded-full hover:bg-[#d68d13] transition-colors w-full">تواصل</button>
              </div>
            </div>
          </div>
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img7} alt="استشارة طبية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex justify-end text-black">استشارة طبية</h2>
              <p className="text-base text-black leading-relaxed">استشارة طبية عن بُعد مع أفضل الأطباء عبر الإنترنت. استمتع بالحصول على مشورة طبية دقيقة وسريعة في الوقت الذي يناسبك.</p>
              <div className="flex justify-end">
                <button className="bg-[#00325f] text-white h-14 px-4 py-2 rounded-full hover:bg-[#d68d13] transition-colors w-full">تواصل</button>
              </div>
            </div>
          </div>
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img8} alt="استشارة طبية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex justify-end text-black">استشارة طبية</h2>
              <p className="text-base text-black leading-relaxed">استشارة طبية عن بُعد مع أفضل الأطباء عبر الإنترنت. استمتع بالحصول على مشورة طبية دقيقة وسريعة في الوقت الذي يناسبك.</p>
              <div className="flex justify-end">
                <button className="bg-[#00325f] text-white h-14 px-4 py-2 rounded-full hover:bg-[#d68d13] transition-colors w-full">تواصل</button>
              </div>
            </div>
          </div>
          <div className="bg-white text-black w-full shadow-xl p-6 rounded-lg transition-transform hover:shadow-2xl hover:scale-105">
            <figure>
              <img src={img9} alt="استشارة طبية" className="w-full h-48 object-cover rounded-lg"/>
            </figure>
            <div className="flex flex-col gap-5 mt-4">
              <h2 className="text-xl font-semibold flex justify-end text-black">استشارة طبية</h2>
              <p className="text-base text-black leading-relaxed">استشارة طبية عن بُعد مع أفضل الأطباء عبر الإنترنت. استمتع بالحصول على مشورة طبية دقيقة وسريعة في الوقت الذي يناسبك.</p>
              <div className="flex justify-end">
                <button className="bg-[#00325f] text-white h-14 px-4 py-2 rounded-full hover:bg-[#d68d13] transition-colors w-full">تواصل</button>
              </div>
            </div>
          </div>
        </div>
        )}
        <div className="text-center mt-8">
        <button
  onClick={() =>
       setShowMore(!showMore)
  }
  className="px-8 py-3 bg-yellow-400 text-white text-lg font-semibold rounded-full hover:bg-[#00325f] focus:outline-none focus:ring-2 focus:ring-[#d68d13] transition duration-300">
  {showMore ? "عرض أقل" : "عرض المزيد"}
    </button> */}

      {/* </div> */}
      </div>
    )
}
export default Cards;
