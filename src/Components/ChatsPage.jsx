// components/ChatsPage.jsx
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const ChatsPage = ({ doctorName }) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // جلب المحادثات من Firebase
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const q = query(
        collection(db, "Chats"),
        where("participants", "array-contains", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatList);
      });

      return () => unsubscribe();
    }
  }, []);

  // تصفية المحادثات حسب اسم المريض
  const filteredChats = chats.filter((chat) =>
    chat.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[500px] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">المحادثات</h2>
        <input
          type="text"
          placeholder="ابحث باسم المريض..."
          className="mb-4 p-2 border rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {filteredChats.length === 0 ? (
          <p className="text-gray-500">لا توجد محادثات بعد</p>
        ) : (
          <ul className="space-y-3">
            {filteredChats.map((chat) => (
              <li
                key={chat.id}
                className="p-3 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                onClick={() =>
                  navigate(`/chat/${chat.id}`, {
                    state: {
                      doctorId: getAuth().currentUser.uid,
                      doctor: { name: doctorName },
                    },
                  })
                }
              >
                <div>
                  <p className="font-medium">{chat.patientName || "مريض"}</p>
                  <p className="text-sm text-gray-500">اضغط لفتح المحادثة</p>
                </div>
                {chat.unreadCount?.[getAuth().currentUser.uid] > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unreadCount[getAuth().currentUser.uid]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;