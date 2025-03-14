import { useState,useRef } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import Booking from "./Pages/BookingComponent";
import Cards from "./Pages/Cards";
import Card from "./Pages/Card";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import Auth from "./Components/Auth";
import  Cookies from 'universal-cookie';
import Chat from "./Components/ChatApp";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const inputroomref=useRef(null);
  if ( !isAuth) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/card" element={<Card />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth  setIsAuth={setIsAuth} />} />
        </Routes>
        <Footer />
      </>
    );
    
  }
  
  return  <div>
    {room?(
       <Chat room={room}/>
      )
       :(
     <div className="room">
    <label >Enter room name:</label>
    <input ref={inputroomref} />
     <button onClick={
      ()=>{
        setRoom(inputroomref.current.value)
      }
     }> Enter Chat</button>
     </div>
     )} 
     </div>
}

export default App;  
