import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    alert("تم تسجيل الدخول بنجاح!");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">تسجيل الدخول</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block font-semibold">البريد الإلكتروني:</label>
        <input type="email" {...register("email", { required: "البريد مطلوب" })} className="w-full p-2 border rounded-md" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label className="block mt-4 font-semibold">كلمة المرور:</label>
        <input type="password" {...register("password", { required: "كلمة المرور مطلوبة" })} className="w-full p-2 border rounded-md" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mt-4">تسجيل الدخول</button>
      </form>
      <p className="text-center mt-4">
        ليس لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/register")}>تسجيل جديد</button>
      </p>
    </div>
  );
};

export default SignIn