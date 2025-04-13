// Pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Davatar from "../assets/doctor-avatar.png";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "/firebase-config";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setPage, doctorName }) => {
  return (
    <div className="w-1/4 h-screen bg-opacity-50 text-white p-4 flex flex-col items-center bg-[#09243c]">
      <img
        src={Davatar}
        alt="Doctor"
        className="w-24 h-24 rounded-full mb-4 border-2 border-white"
      />
      <h2 className="text-lg font-semibold text-white">{doctorName}</h2>
      <nav className="mt-6 w-full">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setPage("dashboard")}
              className="block w-full p-2 bg-gray-800 rounded"
            >
              داشبورد
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage("appointments")}
              className="block w-full p-2 bg-gray-800 rounded"
            >
              مواعيدي
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage("chats")}
              className="block w-full p-2 bg-gray-800 rounded"
            >
              المحادثات
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage("settings")}
              className="block w-full p-2 bg-gray-800 rounded"
            >
              إعدادات الحساب
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Dashboard = ({ page, myAppointments, setMyAppointments, doctorName }) => {
  const [filter, setFilter] = useState("all");
  const [newAppointment, setNewAppointment] = useState("");
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const appointments = [
    { id: 1, status: "upcoming", date: "2024-03-15", patient: "محمد حسن" },
    { id: 2, status: "completed", date: "2024-03-10", patient: "سارة علي" },
    { id: 3, status: "upcoming", date: "2024-03-20", patient: "أحمد كمال" },
  ];

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  // Fetch chats where doctor is a participant
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (page === "chats" && currentUser) {
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
  }, [page]);

  const filteredChats = chats.filter(chat =>
    chat.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 w-3/4">
      {page === "dashboard" && (
        <>
          <h1 className="text-2xl font-bold mb-4">الحجوزات</h1>
          <div className="mb-4 flex gap-2">
            <button onClick={() => setFilter("all")} className="p-2 bg-gray-300 rounded">الكل</button>
            <button onClick={() => setFilter("upcoming")} className="p-2 bg-gray-300 rounded">القادمة</button>
            <button onClick={() => setFilter("completed")} className="p-2 bg-gray-300 rounded">المنتهية</button>
          </div>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded shadow bg-white">
                <p>المريض: {appointment.patient}</p>
                <p>التاريخ: {appointment.date}</p>
                <p className="text-sm text-gray-500">
                  {appointment.status === "upcoming" ? "موعد قادم" : "منتهي"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {page === "appointments" && (
        <>
          <h1 className="text-2xl font-bold mb-4">مواعيدي</h1>
          <div className="mb-4">
            <input
              type="date"
              value={newAppointment}
              onChange={(e) => setNewAppointment(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              onClick={() =>
                setMyAppointments([
                  ...myAppointments,
                  { id: myAppointments.length + 1, date: newAppointment },
                ])
              }
              className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
              إضافة
            </button>
          </div>
        </>
      )}

      {page === "chats" && (
        <>
          <h1 className="text-2xl font-bold mb-4">المحادثات</h1>
          <input
            type="text"
            placeholder="ابحث باسم المريض..."
            className="mb-4 p-2 border rounded w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredChats.length === 0 ? (
            <p className="text-gray-500">لا توجد محادثات بعد.</p>
          ) : (
            <ul className="space-y-4">
              {filteredChats.map((chat) => (
                <li
                  key={chat.id}
                  className="p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200 flex items-center justify-between"
                  onClick={() =>
                    navigate(`/chat/${chat.id}`, {
                      state: {
                        doctorId: getAuth().currentUser.uid,
                        doctor: { name: doctorName },
                      },
                    })
                  }
                >
                  <div className="flex items-center gap-3">
                    {/* <img
                      src={chat.patientAvatar || "/default-avatar.png"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border"
                    /> */}
                    <div>
                      <p className="font-bold">{chat.patientName || "مريض"}</p>
                      <p className="text-sm text-gray-500">اضغط لفتح المحادثة</p>
                    </div>
                  </div>
                  {chat.unreadCount?.[getAuth().currentUser.uid] > 0 && (
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      {chat.unreadCount[getAuth().currentUser.uid]} 🔔
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {page === "settings" && (
        <>
          <h1 className="text-2xl font-bold mb-4">إعدادات الحساب</h1>
          <p>هنا يمكنك تعديل بيانات الحساب.</p>
        </>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const [page, setPage] = useState("dashboard");
  const [myAppointments, setMyAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("دكتور");

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser?.displayName) {
      setDoctorName(currentUser.displayName);
    }
  }, []);

  return (
    <div className="flex h-screen" dir="rtl">
      <Sidebar setPage={setPage} doctorName={doctorName} />
      <Dashboard
        page={page}
        myAppointments={myAppointments}
        setMyAppointments={setMyAppointments}
        doctorName={doctorName}
      />
    </div>
  );
};

export default DashboardPage;
