import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import admin from '../assets/avatar-admin.jpg';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie } from 'recharts';

const useDashboardStore = create((set) => ({
  doctors: [],
  users: [],
  chats: [],
  medicines: [],
  appointments: { upcoming: [], past: [] },
  userData: { name: '', email: '' },

  fetchData: async () => {
    const doctorsSnapshot = await getDocs(collection(db, 'Doctors'));
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const chatsSnapshot = await getDocs(collection(db, 'Chats'));
    const pharmacySnapshot = await getDocs(collection(db, 'pharmacy'));
    let allAppointments = [];
    let allMedicines = [];

    for (const pharmacyDoc of pharmacySnapshot.docs) {
        const medicinesRef = collection(pharmacyDoc.ref, "medicines");
        const medicinesSnapshot = await getDocs(medicinesRef);
    
        const medicines = medicinesSnapshot.docs.map((doc) => ({
          id: doc.id,
          pharmacyId: pharmacyDoc.id, // ربط الدواء بالصيدلية الخاصة به
          ...doc.data(),
        }));
    
        allMedicines = [...allMedicines, ...medicines];
      }

    
    for (let doctorDoc of doctorsSnapshot.docs) {
      const doctorData = doctorDoc.data();
      const appointmentsSnapshot = await getDocs(collection(db, `Doctors/${doctorDoc.id}/appointments`));

      const doctorAppointments = appointmentsSnapshot.docs.map(appDoc => ({
        id: appDoc.id,
        doctorName: doctorData.name, // إضافة اسم الطبيب للحجز
        ...appDoc.data()
      }));

      allAppointments.push(...doctorAppointments);
    }

    // تصنيف الحجوزات
    const currentTime = new Date();
    const upcoming = allAppointments.filter(app => new Date(app.date) > currentTime);
    const past = allAppointments.filter(app => new Date(app.date) <= currentTime);


    set({
      doctors: doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      users: usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      chats: chatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      medicines: allMedicines,
      appointments: { upcoming, past },
      userData: { name: 'Admin', email: 'admin@example.com' }

    });
  },
  removeItem: async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
    set((state) => ({
      [collectionName]: state[collectionName].filter(item => item.id !== id)
    }));
  },
  updateUserData: async (newData) => {
    set({ userData: newData });
  }
  
}));

const Adminpage = () => {
  const { doctors, users, chats, medicines, appointments , fetchData, removeItem , userData, updateUserData} = useDashboardStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState(userData);



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setEditData(userData);
  }, [userData]);

  const handleUpdateUser = async () => {
    await updateUserData(editData);
    alert('تم تحديث البيانات بنجاح!');
  };

  const renderAppointments = (title, data) => (
    <div className="p-4 border rounded shadow bg-white w-1/2">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      {data.length ? (
        <ul className="space-y-3">
          {data.map(app => (
            <li key={app.id} className="p-3 border-b flex justify-between bg-gray-50 rounded-md shadow">
              <div>
                <p className="font-semibold">اسم المريض: {app.patientName}</p>
                <p>الطبيب: {app.doctorName}</p>
                <p>الموعد: {new Date(app.date).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">لا توجد حجوزات</p>
      )}
    </div>
  );

  const renderMedicines = (medicines) => (
    <div className="grid grid-cols-3 gap-4">
      {medicines.length ? (
        medicines.map((medicine) => (
          <div key={medicine.id} className="p-4 border rounded-lg shadow bg-white">
            {medicine.img ? (
              <img src={medicine.imageUrl} alt={medicine.title} className="w-full h-40 object-cover rounded-md" />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md">
                لا توجد صورة
              </div>
            )}
            <h3 className="mt-2 text-lg font-semibold">{medicine.title}</h3>
            <div className="flex justify-between mt-3">
            <button
              onClick={() => editMedicine(medicine.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
               تعديل
            </button>
            <button
              onClick={() => deleteMedicine(medicine.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
               حذف
            </button>
          </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-2 text-center">لا توجد أدوية متاحة</p>
      )}
    </div>
  );
  


  const renderContent = () => {
    if (selectedItem) {
        return (
          <div className="p-6 border rounded shadow bg-white">
            <h3 className="text-xl font-bold mb-4">تفاصيل</h3>
            <ul className="space-y-2">
              {Object.entries(selectedItem).map(([key, value]) =>
                key !== 'id' ? (
                  <li key={key} className="flex justify-between border-b py-1">
                    <span className="font-semibold">{key}:</span>
                    <span>{value}</span>
                  </li>
                ) : null
              )}
            </ul>
            <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedItem(null)}>رجوع</button>
          </div>
        );
      }

      if (activeSection === 'dashboard') {
        return (
          <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">📊 لوحة التحكم</h2>
      
            <div className="grid grid-cols-2 gap-6">
              {/* عدد الأطباء والمستخدمين */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">إحصائيات المستخدمين</h3>
                <BarChart width={400} height={300} data={[
                  { name: 'الأطباء', value: doctors.length },
                  { name: 'المستخدمين', value: users.length },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </div>
      
              {/* الحجوزات القادمة والمنتهية */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">حالة الحجوزات</h3>
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      { name: 'القادمة', value: appointments.upcoming.length },
                      { name: 'المنتهية', value: appointments.past.length },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#22C55E"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        );
      }
      

      if (activeSection === 'settings') {
        return (
          <div className="p-6 border rounded shadow bg-white">
            <h3 className="text-xl font-bold mb-4">الإعدادات</h3>
            <div className="space-y-3">
              <label className="block">
                <span className="font-semibold">الاسم:</span>
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="block w-full p-2 border rounded" />
              </label>
              <label className="block">
                <span className="font-semibold">البريد الإلكتروني:</span>
                <input type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="block w-full p-2 border rounded" />
              </label>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdateUser}>تحديث البيانات</button>
            </div>
          </div>
        );
      } 

      if (activeSection === 'appointments') {
        return (
            <div className="flex h-screen bg-gray-100 p-6 gap-6 ">
            {renderAppointments("📅 الحجوزات القادمة", appointments.upcoming)}
            {renderAppointments("⏳ الحجوزات المنهية", appointments.past)}
          </div>
        );
      }

      if (activeSection === 'medicines') {
        return (
          <div className="flex h-screen bg-gray-100 p-6 gap-6">
            {renderMedicines(medicines)}
          </div>
        );
      }
      
    

    const dataMap = {
      doctors: doctors,
      users: users,
      chats: chats,
      medicines: medicines
    };
    return dataMap[activeSection]?.length ? (
      <div className="space-y-2">
        {dataMap[activeSection].map(item => (
          <div key={item.id} className="p-2 border-b flex justify-between items-center">
            <span>{item.name || item.message}</span>
            <div className="space-x-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setSelectedItem(item)}>التفاصيل</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => removeItem(activeSection, item.id)}>حذف</button>
            </div>
        </div>
        ))}
      </div>
    ) : <p className="text-center text-gray-500">لا توجد بيانات متاحة</p>;
  };

  return (
    <div className="flex h-screen" dir='rtl'>
      <div className="w-1/4 bg-gray-800 text-white p-4 flex flex-col items-center">
        <img src={admin} alt="مدير الموقع" className="w-24 h-24 rounded-full" />
        <h2 className="mt-3 text-lg font-bold">{userData.name}</h2>
        <div className="w-full mt-4 space-y-2">
          {[{ label: 'لوحة التحكم', key: 'dashboard' },{ label: 'الأطباء', key: 'doctors' }, { label: 'المستخدمين', key: 'users' }, { label: 'الدردشات', key: 'chats' }, { label: 'الأدوية', key: 'medicines' }, { label: 'الحجوزات', key: 'appointments' }, { label: 'الإعدادات', key: 'settings' }].map(({ label, key }) => (
            <button key={key} className={`w-full bg-blue-500 p-2 rounded text-center ${activeSection === key ? 'bg-blue-700' : ''}`} onClick={() => setActiveSection(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-6">{renderContent()}</div>
    </div>
  );
};

export default Adminpage;
