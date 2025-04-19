import { useState, useRef, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Booking from "./Pages/BookingComponent";
import Cards from "./Pages/Cards";
import Medicines from "./Pages/Medicines";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Form from "./Pages/Form";
import Card from "./Pages/Card";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import PasswordRecovery from "./Pages/PasswordRecovery";
import About from "./Pages/About";
import Cookies from "universal-cookie";
import Profile from "./Pages/ProfilePage";
import ChangePassword from "./Pages/ChangePassword";
import Home from "./Pages/Home";
import Adminpage from "./Pages/Adminpage";
import ChatPage from "./Pages/ChatPage";
import BookingPage from "./Pages/Bookingpage";
import DoctorsListPage from './Pages/DoctorsListPage';
import DoaaDahboard from "./Pages/DoaaDahboard";
import DoctorsList from './Pages/DoctorsList';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const inputroomref = useRef(null);
  const location = useLocation();
  const userType = cookies.get("userType");

  const hideHeaderFooter =
    ["/dashboard", "/ddashboard", "/admin", "/signIn", "/register"].includes(location.pathname) ||
    (userType === "doctor" && location.pathname.startsWith("/d"));

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Cards />} />
        <Route path="/pharmacy" element={<Card />} />
        <Route path="/MedicineForm" element={<Form />} />
        <Route path="/pharmacy/:departmentId" element={<Medicines />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/admin" element={<Adminpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ddashboard" element={<DoaaDahboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/DoctorsList" element={<DoctorsList />} />
        <Route path="/booking/:doctorId" element={<BookingPage />} />
        <Route path="/doctors" element={<DoctorsListPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/about" element={<About />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
