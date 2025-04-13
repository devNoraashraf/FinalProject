import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config"; // استيراد التهيئة من ملف الفايربيز

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: async () => {
        await signOut(auth);
        set({ user: null });
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
