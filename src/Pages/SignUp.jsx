import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import img from '../assets/s.jpg'


const SignUp = () => {
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