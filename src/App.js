import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ContactUs from "./pages/ContactUs";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashbord"; // Nouvelle page avec uniquement NavBar2

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {!isAuthPage && !isDashboard && <NavBar />}

      <Routes>
        <Route path="/" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {!isAuthPage && !isDashboard && <Footer />}
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
