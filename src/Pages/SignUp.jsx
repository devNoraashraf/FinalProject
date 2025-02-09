import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const userType = watch("userType", "");
  
    const onSubmit = (data) => {
      console.log("Register Data:", data);
      alert("تم التسجيل بنجاح!");
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">تسجيل جديد</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 font-semibold">نوع المستخدم:</label>
          <select {...register("userType", { required: "يجب اختيار نوع المستخدم" })} className="w-full p-2 border rounded-md">
            <option value="">اختر...</option>
            <option value="doctor">طبيب</option>
            <option value="patient">مريض</option>
          </select>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType.message}</p>}
  
          <label className="block mt-4 font-semibold">البريد الإلكتروني:</label>
          <input type="email" {...register("email", { required: "البريد مطلوب" })} className="w-full p-2 border rounded-md" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  
          <label className="block mt-4 font-semibold">كلمة المرور:</label>
          <input type="password" {...register("password", { required: "كلمة المرور مطلوبة" })} className="w-full p-2 border rounded-md" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
  
          {userType === "doctor" && (
            <>
              <label className="block mt-4 font-semibold">التخصص الطبي:</label>
              <input type="text" {...register("specialty", { required: "التخصص مطلوب" })} className="w-full p-2 border rounded-md" />
              {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty.message}</p>}
            </>
          )}
  
          {userType === "patient" && (
            <>
              <label className="block mt-4 font-semibold">العمر:</label>
              <input type="number" {...register("age", { required: "العمر مطلوب" })} className="w-full p-2 border rounded-md" />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </>
          )}
  
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mt-4">تسجيل جديد</button>
        </form>
        <p className="text-center mt-4">
          لديك حساب؟ <button className="text-blue-500 underline" onClick={() => navigate("/signIn")}>تسجيل الدخول</button>
        </p>
      </div>
    );
  };

export default SignUp