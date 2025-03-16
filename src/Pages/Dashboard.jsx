import { useState } from "react";
import Davatar from "../assets/doctor-avatar.png";

const Sidebar = ({ setPage }) => {
  return (
    <div className="w-1/4 h-screen bg-opacity-50 text-white p-4 flex flex-col items-center">
      <img src={Davatar} alt="Doctor" className="w-24 h-24 rounded-full mb-4 border-2 border-white" />
      <h2 className="text-lg font-semibold text-black">د. أحمد علي</h2>
      <nav className="mt-6 w-full">
        <ul className="space-y-4">
          <li><button onClick={() => setPage("dashboard")} className="block w-full p-2 bg-gray-800 rounded">داشبورد</button></li>
          <li><button onClick={() => setPage("appointments")} className="block w-full p-2 bg-gray-800 rounded">مواعيدي</button></li>
          <li><button onClick={() => setPage("chats")} className="block w-full p-2 bg-gray-800 rounded">المحادثات</button></li>
          <li><button onClick={() => setPage("settings")} className="block w-full p-2 bg-gray-800 rounded">إعدادات الحساب</button></li>
        </ul>
      </nav>
    </div>
  );
};

const Dashboard = ({ page, myAppointments, setMyAppointments }) => {
  const [filter, setFilter] = useState("all");
  const [newAppointment, setNewAppointment] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDate, setEditDate] = useState("");

  const appointments = [
    { id: 1, status: "upcoming", date: "2024-03-15", patient: "محمد حسن" },
    { id: 2, status: "completed", date: "2024-03-10", patient: "سارة علي" },
    { id: 3, status: "upcoming", date: "2024-03-20", patient: "أحمد كمال" },
  ];

  const filteredAppointments = filter === "all" ? appointments : appointments.filter(a => a.status === filter);

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
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className="p-4 border rounded shadow">
                <p>المريض: {appointment.patient}</p>
                <p>التاريخ: {appointment.date}</p>
                <p className="text-sm text-gray-500">{appointment.status === "upcoming" ? "موعد قادم" : "منتهي"}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {page === "appointments" && (
        <>
          <h1 className="text-2xl font-bold mb-4">مواعيدي</h1>
          <div className="mb-4">
            <input type="date" value={newAppointment} onChange={(e) => setNewAppointment(e.target.value)} className="p-2 border rounded" />
            <button onClick={() => setMyAppointments([...myAppointments, { id: myAppointments.length + 1, date: newAppointment }])} className="ml-2 p-2 bg-blue-500 text-white rounded">إضافة</button>
          </div>
        </>
      )}
      {page === "chats" && (
        <>
          <h1 className="text-2xl font-bold mb-4">المحادثات</h1>
          <p>هنا يمكنك التحدث مع المرضى ومتابعة حالاتهم.</p>
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

  return (
    <div className="flex h-screen" dir="rtl">
      <Sidebar setPage={setPage} />
      <Dashboard page={page} myAppointments={myAppointments} setMyAppointments={setMyAppointments} />
    </div>
  );
};

export default DashboardPage;
