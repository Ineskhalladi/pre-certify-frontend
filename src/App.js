import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ContactUs from "./pages/ContactUs";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"

const App = () => {
  const location = useLocation();
  return (

   
  <>
    {location.pathname !== '/signin' && location.pathname !== '/signup' && <NavBar />}

    
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ContactUs />} />
      </Routes>
   {location.pathname !== '/signin' && location.pathname !== '/signup' && <Footer />}
    </>


  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;



