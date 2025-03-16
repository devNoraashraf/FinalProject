import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import img from '../assets/s.jpg'


const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userType = formData.email.includes("doctor") ? "doctor" : "patient";
    navigate(userType === "doctor" ? "/dashboard" : "/home");
  };

  return (
<div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
<div className="w-full max-w-md bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            تسجيل الدخول
          </button>
        </form>
        <p className="text-center mt-4">
         ليس لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/register")}>تسجيل جديد</button>
       </p>
      </div>
    </div>
  );
};

export default SignIn