import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import img from '../assets/s.jpg'


const SignUp = () => {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const navigate = useNavigate();
    // const userType = watch("userType", "");
  
    // const onSubmit = (data) => {
    //   console.log("Register Data:", data);
    //   alert("تم التسجيل بنجاح!");
    // };
  
    // return (
    //   <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
    //     <h2 className="text-xl font-bold mb-4 text-center">تسجيل جديد</h2>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <label className="block mb-2 font-semibold">نوع المستخدم:</label>
    //       <select {...register("userType", { required: "يجب اختيار نوع المستخدم" })} className="w-full p-2 border rounded-md">
    //         <option value="">اختر...</option>
    //         <option value="doctor">طبيب</option>
    //         <option value="patient">مريض</option>
    //       </select>
    //       {errors.userType && <p className="text-red-500 text-sm">{errors.userType.message}</p>}
  
    //       <label className="block mt-4 font-semibold">البريد الإلكتروني:</label>
    //       <input type="email" {...register("email", { required: "البريد مطلوب" })} className="w-full p-2 border rounded-md" />
    //       {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  
    //       <label className="block mt-4 font-semibold">كلمة المرور:</label>
    //       <input type="password" {...register("password", { required: "كلمة المرور مطلوبة" })} className="w-full p-2 border rounded-md" />
    //       {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
  
    //       {userType === "doctor" && (
    //         <>
    //           <label className="block mt-4 font-semibold">التخصص الطبي:</label>
    //           <input type="text" {...register("specialty", { required: "التخصص مطلوب" })} className="w-full p-2 border rounded-md" />
    //           {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty.message}</p>}
    //         </>
    //       )}
  
    //       {userType === "patient" && (
    //         <>
    //           <label className="block mt-4 font-semibold">العمر:</label>
    //           <input type="number" {...register("age", { required: "العمر مطلوب" })} className="w-full p-2 border rounded-md" />
    //           {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
    //         </>
    //       )}
  
    //       <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mt-4">تسجيل جديد</button>
    //     </form>
    //     <p className="text-center mt-4">
    //       لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/signIn")}>تسجيل الدخول</button>
    //     </p>
    //   </div>
    // );
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful registration
    alert("تم التسجيل بنجاح!");
    navigate("/signIn");
  };

  return (
<div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
<div className="w-full max-w-md bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 p-2 ${!isDoctor ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setIsDoctor(false)}
          >
            تسجيل كمستخدم
          </button>
          <button
            className={`flex-1 p-2 ${isDoctor ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setIsDoctor(true)}
          >
            تسجيل كطبيب
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {isDoctor && (
            <input
              type="text"
              name="specialization"
              placeholder="التخصص"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            تسجيل
          </button>
        </form>
        <p className="text-center mt-4">
       لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/signIn")}>تسجيل الدخول</button>
     </p>
      </div>
    </div>
  );
  };

export default SignUp