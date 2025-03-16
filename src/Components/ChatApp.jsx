import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "/firebase-config"; 
import { FaPaperPlane } from "react-icons/fa";
import doctorImg from "../assets/doctor.webp"; 
import patientImg from "../assets/patient.webp"; 

const Chat = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages"); 

  useEffect(() => {
    if (!room) return; 

    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesList = [];
      snapshot.forEach((doc) => {
        messagesList.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesList);
    });

    return () => unsubscribe(); 
  }, [room]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return; 

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName || "Anonymous",
      room: room,
    });

    setMessage(""); 
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/src/assets/care.jpg')] bg-cover bg-center bg-fixed relative">
      {/* طبقة شفافة لتحسين الخلفية */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* صندوق الشات */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-5 flex flex-col h-[80vh] relative z-10">
        {/* عنوان الدردشة */}
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">🩺 دردشة مع الطبيب</h2>

        {/* صندوق الرسائل */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.user === auth.currentUser?.displayName ? "justify-end" : "justify-start"}`}
            >
              {/* صورة المستخدم */}
              {message.user !== auth.currentUser?.displayName && (
                <img src={doctorImg} alt="Doctor" className="w-10 h-10 rounded-full shadow-md border-2 border-blue-500" />
              )}

              {/* الرسالة */}
              <div
                className={`p-3 rounded-lg max-w-xs shadow-md ${
                  message.user === auth.currentUser?.displayName ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="block text-xs font-medium">{message.user}</span>
                <p className="text-sm">{message.text}</p>
                <span className="block text-xs opacity-70 text-right">
                  {message.createdAt?.seconds
                    ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString()
                    : "No timestamp"}
                </span>
              </div>

              {/* صورة المستخدم الحالي */}
              {message.user === auth.currentUser?.displayName && (
                <img src={patientImg} alt="Patient" className="w-10 h-10 rounded-full shadow-md border-2 border-green-500" />
              )}
            </div>
          ))}
        </div>

        {/* إدخال الرسالة */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t bg-gray-100 rounded-b-lg">
          <input
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اكتب رسالتك..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit" className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            <FaPaperPlane className="text-lg transform hover:scale-110 transition duration-200" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
