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
import Home from "./Pages/Home";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services" element={<Cards />} />
        <Route path="/pharmacy" element={<Card />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
