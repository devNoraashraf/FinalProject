// import React from 'react'
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
// import img from '../assets/s.jpg'


// const SignUp = () => {
//   const [isDoctor, setIsDoctor] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     specialization: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate successful registration
//     alert("تم التسجيل بنجاح!");
//     navigate("/signIn");
//   };

//   return (
// <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
// <div className="w-full max-w-md bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
//         <div className="flex mb-4 border-b">
//           <button
//             className={`flex-1 p-2 ${!isDoctor ? "border-b-2 border-blue-500" : ""}`}
//             onClick={() => setIsDoctor(false)}
//           >
//             تسجيل كمستخدم
//           </button>
//           <button
//             className={`flex-1 p-2 ${isDoctor ? "border-b-2 border-blue-500" : ""}`}
//             onClick={() => setIsDoctor(true)}
//           >
//             تسجيل كطبيب
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="الاسم الكامل"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="البريد الإلكتروني"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="كلمة المرور"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           {isDoctor && (
//             <input
//               type="text"
//               name="specialization"
//               placeholder="التخصص"
//               value={formData.specialization}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           )}
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             تسجيل
//           </button>
//         </form>
//         <p className="text-center mt-4">
//        لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/signIn")}>تسجيل الدخول</button>
//      </p>
//       </div>
//     </div>
//   );
//   };

// export default SignUp

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import img from "../assets/s.jpg";
import userAvatar from "../assets/avatar.png";
import doctorAvatar from "../assets/doctor-avatar.png";

// const SignUp = () => {
//   const [isDoctor, setIsDoctor] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     specialization: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // تسجيل المستخدم في Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;

//       // تحديد المجموعة المناسبة (Collection)
//       const collectionName = isDoctor ? "Doctors" : "users";

//               // تعيين صورة افتراضية بناءً على الدور
//               const defaultAvatar = isDoctor ? "/assets/doctor-avatar.png" : "/assets/avatar.png";

//               // تحديث البروفايل في Firebase Auth
//               // await updateProfile(user, {
//               //     photoURL: defaultAvatar
//               // });

//       // حفظ بيانات المستخدم في Firestore
//       await setDoc(doc(db, collectionName, user.uid), {
//         name: formData.name,
//         email: formData.email,
//         photoURL: defaultAvatar, 
//         role: isDoctor ? "doctor" : "user",
//         specialization: isDoctor ? formData.specialization : null,
//       });

//       alert("تم التسجيل بنجاح!");
//       // navigate(isDoctor ? "/dashboard" : "/profile"); // إعادة التوجيه حسب الدور
//       navigate("/signIn")
//     } catch (error) {
//       console.error("خطأ أثناء التسجيل:", error.message);
//       alert(error.message);
//     }
//   };

const SignUp = () => {
  const [tab, setTab] = useState("user"); // لتحديد التاب الحالي
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState(""); // التخصص للأطباء
  const navigate = useNavigate();

  const defaultImages = {
    user: userAvatar,
    doctor: doctorAvatar,
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        name,
        email,
        role: tab,
        profileImage: defaultImages[tab],
      };

      if (tab === "doctor") {
        userData.specialty = specialty;
        await setDoc(doc(db, "Doctors", user.uid), userData);
      } else {
        await setDoc(doc(db, "users", user.uid), userData);
      }

      navigate("/signIn");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
      <div className="w-full max-w-md bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
        <div className="flex mb-4 border-b">
          <button className={`flex-1 p-2  "border-b-2 border-blue-500" : ""}`} onClick={() => setTab("user")}>
            تسجيل كمستخدم
          </button>
          <button className={`flex-1 p-2  "border-b-2 border-blue-500" : ""}`} onClick={() => setTab("doctor")}>
            تسجيل كطبيب
          </button>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" name="name" placeholder="الاسم الكامل" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)}  className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)}className="w-full p-2 border rounded" required />
          {tab === "doctor" && (
              <input type="text" name="specialization" placeholder="التخصص" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full p-2 border rounded" required />
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">تسجيل</button>
        </form>
        <p className="text-center mt-4">
          لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/signIn")}>تسجيل الدخول</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;