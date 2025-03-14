import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp, query, where,orderBy } from "firebase/firestore";
import { auth, db } from "/firebase-config"; // ✅ استيراد Firebase بشكل صحيح

const Chat = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages"); // ✅ تحديد مرجع قاعدة البيانات

  useEffect(() => {
    if (!room) return; // ✅ التأكد من أن الغرفة محددة قبل الاشتراك في البيانات

    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt")); // ✅ تحديد الاستعلام

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesList = [];
      snapshot.forEach((doc) => {
        messagesList.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesList);
    });

    return () => unsubscribe(); // ✅ إلغاء الاشتراك عند مغادرة الصفحة
  }, [room]); // ✅ إعادة تحميل البيانات عند تغيير الغرفة

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return; // ✅ منع إرسال رسائل فارغة

    await addDoc(messagesRef, {
      text: message, // ✅ التأكد من أن البيانات متوافقة مع طريقة العرض
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName || "Anonymous",
      room: room,
    });

    setMessage(""); // ✅ إعادة تعيين حقل الإدخال بعد الإرسال
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}</span>
            <p>
              {message.text} <br />
              {message.createdAt?.seconds 
                ? new Date(message.createdAt.seconds * 1000).toLocaleString() 
                : "No timestamp"}
            </p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="newmessage">
        <input
          className="messageinput"
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message} // ✅ التأكد من استخدام القيمة الصحيحة
        />
        <button type="submit" className="sendmessage">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
