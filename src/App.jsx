import { useState, useRef , useEffect } from "react";
import { Route, Routes , useLocation} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Booking from "./Pages/BookingComponent";
import Cards from "./Pages/Cards";
import Medicines from "./Pages/Medicines";
import Form from "./Pages/Form";
import Card from "./Pages/Card";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import Auth from "./Components/Auth";
import Cookies from "universal-cookie";
import Chat from "./Components/ChatApp";
import Profile from "./Pages/profile";
import ChangePassword from "./Pages/ChangePassword"; 
import Home from "./Pages/Home";
import Adminpage from "./Pages/Adminpage";



import DoaaDahboard from 
"./Pages/DoaaDahboard"
import DoctorsList from "./Pages/DoctorsList";
import BookingPage from "./Pages/Bookingpage";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const inputroomref = useRef(null);
   
  const location = useLocation();
  const noHeaderFooterPages = ["/dashboard", "/admin", "/signIn", "/register"];




  if (!isAuth) {
    return (
      <>
      {!noHeaderFooterPages.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Cards />} />
          <Route path="/pharmacy" element={<Card />} />
          <Route path="/MedicineForm" element={<Form />} />
          <Route path="/pharmacy/:departmentId" element={<Medicines />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          {/* <Route path="/profile" element={ <Profile />}/> */}

          <Route path="/DoctorList" element={<DoctorsList />} />
          <Route path="/booking/:doctorId" element={<BookingPage  />} />
          <Route path="/DoaaDahboard" element={<DoaaDahboard />} />


          <Route
            path="/profile"
            element={
              <Profile />
            }
          />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/auth" element={<Auth setIsAuth={setIsAuth} />} />
        </Routes>
        {!noHeaderFooterPages.includes(location.pathname) && <Footer />}
        </>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter room name:</label>
          <input ref={inputroomref} />
          <button onClick={() => setRoom(inputroomref.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
