import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "/firebase-config";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import { FaPaperPlane, FaUserMd, FaArrowLeft, FaInfoCircle, FaClinicMedical, FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaPhone, FaVideo } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor } = location.state;
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "Chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "Chats", chatId, "messages"), {
      text: message,
      senderId: currentUser.uid,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-[Tajawal] relative overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#006272] to-transparent opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#006272] opacity-5 filter blur-3xl"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10">
        {/* شريط التنقل */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#006272] hover:text-[#004d5a] transition-colors"
            >
              <FaArrowLeft className="text-lg" />
              <span className="font-medium">رجوع</span>
            </button>
            
            {/* <div className="flex items-center gap-4">
              <button className="text-[#006272] p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaPhone className="text-lg" />
              </button>
              <button className="text-[#006272] p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaVideo className="text-lg" />
              </button>
            </div> */}
          </div>
        </div>

        {/* بطاقة الطبيب */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#006272] to-[#00838f] p-6 text-white relative">
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"></div>
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                    <FaUserMd size={28} className="text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{doctor?.name}</h1>
                  <p className="text-white/90">{doctor?.specialty}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaStar className="text-yellow-300" /> {doctor?.review || '5.0'}
                    </span>
                    <span className="bg-green-500/90 px-3 py-1 rounded-full text-sm">
                      متصل الآن
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* منطقة المحادثة */}
            <div className="flex flex-col md:flex-row">
              {/* المعلومات الجانبية */}
              <div className="w-full md:w-1/3 p-6 border-r border-gray-100 hidden md:block">
                <div className="space-y-6">
                  <div className="bg-[#f8fafc] p-4 rounded-lg">
                    <h3 className="font-bold text-[#006272] mb-3 flex items-center gap-2">
                      <FaClinicMedical /> معلومات العيادة
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">اسم العيادة</p>
                        <p className="font-medium">{doctor?.clinic || "غير محدد"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">العنوان</p>
                        <p className="font-medium">{doctor?.address || "غير محدد"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">سعر الكشف</p>
                        <p className="font-medium text-[#006272]">
                          {doctor?.price ? `${doctor.price} ج.م` : "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] p-4 rounded-lg">
                    <h3 className="font-bold text-[#006272] mb-3">مواعيد العمل</h3>
                    <p className="text-sm">من السبت إلى الخميس</p>
                    <p className="text-sm">٩ صباحًا - ٩ مساءً</p>
                  </div>
                </div>
              </div>

              {/* الدردشة */}
              <div className="w-full md:w-2/3 flex flex-col">
                <div 
                  ref={chatRef} 
                  className="flex-1 overflow-y-auto p-6 h-[50vh] bg-[#f9fbfd] relative"
                >
                  {/* نمط خلفية الدردشة */}
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%2270%22 height=%2270%22 viewBox=%220 0 70 70%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M35 35c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7-7-3.134-7-7zm0 0c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7 7-3.134 7-7z%22 fill=%22%23006372%22 fill-opacity=%220.1%22/%3E%3C/svg%3E')]"></div>
                  
                  {messages.length === 0 ? (
                    <div className="relative h-full flex flex-col items-center justify-center text-center">
                      <div className="bg-white p-6 rounded-xl shadow-sm max-w-md border border-gray-100">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#006272]/10 flex items-center justify-center">
                          <FaUserMd size={28} className="text-[#006272]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#006272] mb-2">ابدأ محادثة مع الدكتور</h3>
                        <p className="text-gray-600 mb-4">هذه بداية المحادثة مع الدكتور {doctor?.name}</p>
                        <p className="text-sm text-gray-500">يمكنك إرسال استشارتك الطبية الآن</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.senderId === currentUser.uid ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs md:max-w-md p-4 rounded-2xl relative ${
                              msg.senderId === currentUser.uid
                                ? "bg-[#006272] text-white rounded-br-none shadow-md"
                                : "bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100"
                            }`}
                          >
                            <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                            <p 
                              className={`text-xs mt-2 ${
                                msg.senderId === currentUser.uid ? "text-white/70" : "text-gray-500"
                              }`}
                            >
                              {msg.timestamp?.toDate ? format(msg.timestamp.toDate(), "hh:mm a") : "جارٍ الإرسال..."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* حقل الإرسال */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <form 
                    onSubmit={sendMessage}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-4 shadow-inner"
                  >
                    <input
                      type="text"
                      placeholder="اكتب رسالتك هنا..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 border-0 bg-transparent py-3 focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className={`p-3 rounded-full transition-all ${
                        message.trim() 
                          ? "bg-[#006272] text-white hover:bg-[#00838f]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <IoMdSend size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;