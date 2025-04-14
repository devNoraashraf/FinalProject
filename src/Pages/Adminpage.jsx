import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import admin from '../assets/avatar-admin.jpg';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie } from 'recharts';
import Form from './Form'; 
const useDashboardStore = create((set) => ({
  doctors: [],
  users: [],
  medicines: [],
  appointments: { upcoming: [], past: [] },
  userData: { name: '', email: '' },

  fetchData: async () => {
    try {
      // جلب البيانات الأساسية بشكل متوازي
      const [doctorsSnapshot, usersSnapshot, pharmacySnapshot] = await Promise.all([
        getDocs(collection(db, 'Doctors')),
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'pharmacy'))
      ]);

      // جلب الأدوية بشكل متوازي
      const medicinePromises = pharmacySnapshot.docs.map(async (pharmacyDoc) => {
        const medicinesRef = collection(pharmacyDoc.ref, "medicines");
        const medicinesSnapshot = await getDocs(medicinesRef);
        return medicinesSnapshot.docs.map(doc => ({
          id: doc.id,
          pharmacyId: pharmacyDoc.id,
          ...doc.data(),
        }));
      });
      const allMedicinesArrays = await Promise.all(medicinePromises);
      const allMedicines = allMedicinesArrays.flat();

      // جلب المواعيد بشكل متوازي
      const appointmentPromises = doctorsSnapshot.docs.map(async (doctorDoc) => {
        const doctorData = doctorDoc.data();
        const appointmentsSnapshot = await getDocs(collection(db, `Doctors/${doctorDoc.id}/PatientBookings`));
        return appointmentsSnapshot.docs.map(appDoc => ({
          id: appDoc.id,
          doctorName: doctorData.name,
          ...appDoc.data()
        }));
      });
      const allAppointmentsArrays = await Promise.all(appointmentPromises);
      const allAppointments = allAppointmentsArrays.flat();

      // تصنيف الحجوزات
      const currentTime = new Date();
      const upcoming = allAppointments.filter(app => new Date(app.date) > currentTime);
      const past = allAppointments.filter(app => new Date(app.date) <= currentTime);

      set({
        doctors: doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        users: usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        medicines: allMedicines,
        appointments: { upcoming, past },
        userData: { name: 'Admin', email: 'admin@example.com' }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  // Add new state for specialty filter
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  

  const { doctors, users, chats, medicines, appointments, fetchData, removeItem, userData, updateUserData } = useDashboardStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);

  const editMedicine = (medicine) => {
    setIsEditing(true);
    setEditingMedicine(medicine);
  };

  const handleUpdateMedicine = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, `pharmacy/${editingMedicine.pharmacyId}/medicines`, editingMedicine.id), {
        title: editingMedicine.title,
        price: editingMedicine.price,
        description: editingMedicine.description
      });
      setIsEditing(false);
      setEditingMedicine(null);
      fetchData(); // Refresh the data
      alert('تم تحديث الدواء بنجاح!');
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert('حدث خطأ أثناء تحديث الدواء');
    }
  };

  const deleteMedicine = async (medicineId, pharmacyId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدواء؟')) {
      try {
        await deleteDoc(doc(db, `pharmacy/${pharmacyId}/medicines`, medicineId));
        fetchData(); // Refresh the data
        alert('تم حذف الدواء بنجاح!');
      } catch (error) {
        console.error("Error deleting medicine:", error);
        alert('حدث خطأ أثناء حذف الدواء');
      }
    }
  };

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

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };
  
  const renderMedicines = (medicines) => (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddingMedicine(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          ➕ إضافة دواء جديد
        </button>
      </div>

      <Modal isOpen={isAddingMedicine} onClose={() => setIsAddingMedicine(false)}>
        <Form onClose={() => setIsAddingMedicine(false)} onSuccess={() => {
          setIsAddingMedicine(false);
          fetchData();
        }} />
      </Modal>

      <div className="grid grid-cols-3 gap-4">
        <Modal isOpen={isEditing} onClose={() => {
          setIsEditing(false);
          setEditingMedicine(null);
        }}>
          <h3 className="text-xl font-bold mb-4 text-right">تعديل الدواء</h3>
          <form onSubmit={handleUpdateMedicine} className="space-y-4">
            <div>
              <label className="block mb-2 text-right">اسم الدواء:</label>
              <input
                type="text"
                value={editingMedicine?.title || ''}
                onChange={(e) => setEditingMedicine({...editingMedicine, title: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-2 text-right">السعر:</label>
              <input
                type="number"
                value={editingMedicine?.price || ''}
                onChange={(e) => setEditingMedicine({...editingMedicine, price: Number(e.target.value)})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-2 text-right">الوصف:</label>
              <textarea
                value={editingMedicine?.description || ''}
                onChange={(e) => setEditingMedicine({...editingMedicine, description: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                حفظ التغييرات
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingMedicine(null);
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        </Modal>
  
      {medicines.map((medicine) => (
        <div key={medicine.id} className="p-4 border rounded-lg shadow bg-white hover:shadow-lg transition-shadow">
          <div className="relative">
            {medicine.img ? (
              <img src={medicine.img} alt={medicine.title} className="w-full h-40 object-cover rounded-md" />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md">
                لا توجد صورة
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-right">{medicine.title}</h3>
            <p className="text-gray-600 mt-1 text-right">{medicine.description}</p>
            <p className="text-blue-600 font-semibold mt-2 text-right">{medicine.price} جنيه</p>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <button
              onClick={() => editMedicine(medicine)}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              تعديل
            </button>
            <button
              onClick={() => deleteMedicine(medicine.id, medicine.pharmacyId)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
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

      // Update dashboard section
      if (activeSection === 'dashboard') {
        return (
          <div className="p-6 bg-[#f8fafc]">
            <h2 className="text-2xl font-bold mb-6 text-[#09243c]">📊 لوحة التحكم</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#006272]/10">
                <h3 className="text-lg font-semibold text-[#006272]">الأطباء</h3>
                <p className="text-3xl font-bold mt-2 text-[#09243c]">{doctors.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#006272]/10">
                <h3 className="text-lg font-semibold text-[#006272]">المستخدمين</h3>
                <p className="text-3xl font-bold mt-2 text-[#09243c]">{users.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#006272]/10">
                <h3 className="text-lg font-semibold text-[#006272]">الحجوزات</h3>
                <p className="text-3xl font-bold mt-2 text-[#09243c]">{appointments.upcoming.length + appointments.past.length}</p>
              </div>
            </div>
      
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#006272]">إحصائيات المستخدمين</h3>
                <BarChart width={400} height={300} data={[
                  { name: 'الأطباء', value: doctors.length },
                  { name: 'المستخدمين', value: users.length },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#006272" />
                </BarChart>
              </div>
      
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-[#006272]">حالة الحجوزات</h3>
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
                    fill="#006272"
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


if (activeSection === 'doctors') {
  const specialties = ['all', ...new Set(doctors.map(doc => doc.specialty))];
  const filteredDoctors = specialtyFilter === 'all' 
    ? doctors 
    : doctors.filter(doc => doc.specialty === specialtyFilter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4 flex-wrap">
        {specialties.map(specialty => (
          <button
            key={specialty}
            onClick={() => setSpecialtyFilter(specialty)}
            className={`px-4 py-2 rounded-full transition-colors ${
              specialtyFilter === specialty
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {specialty === 'all' ? 'كل التخصصات' : specialty}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التخصص</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الهاتف</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctors.map(doctor => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-right">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{doctor.specialty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{doctor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" 
                    onClick={() => setSelectedItem(doctor)}
                  >
                    التفاصيل
                  </button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" 
                    onClick={() => removeItem('doctors', doctor.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

if (activeSection === 'users') {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الهاتف</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسجيل</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-right">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {new Date(user.createdAt?.seconds * 1000).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" 
                  onClick={() => setSelectedItem(user)}
                >
                  التفاصيل
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" 
                  onClick={() => removeItem('users', user.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

    const dataMap = {
      doctors: doctors,
      users: users,
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
    <div className="flex min-h-screen" dir='rtl'>
      <div className="w-64 bg-gradient-to-b from-[#09243c] to-[#006272] text-white p-6 flex flex-col fixed h-screen">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img src={admin} alt="مدير الموقع" className="w-20 h-20 rounded-full border-4 border-white/20 shadow-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-white">{userData.name}</h2>
          <p className="text-sm text-gray-300">مدير النظام</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <div className="space-y-2">
            {[
              { label: 'لوحة التحكم', key: 'dashboard', icon: '📊' },
              { label: 'الأطباء', key: 'doctors', icon: '👨‍⚕️' },
              { label: 'المستخدمين', key: 'users', icon: '👥' },
              { label: 'الأدوية', key: 'medicines', icon: '💊' },
              { label: 'الحجوزات', key: 'appointments', icon: '📅' },
              { label: 'الإعدادات', key: 'settings', icon: '⚙️' }
            ].map(({ label, key, icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === key 
                    ? 'bg-white/10 text-white translate-x-2'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-1'
                }`}
              >
                <span className="mr-3">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="pt-6 border-t border-white/10">
          <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:text-white transition-colors rounded-lg">
            <span className="mr-3">🚪</span>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
      {/* Main content with padding to account for fixed sidebar */}
      <div className="flex-1 mr-64 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Adminpage;
