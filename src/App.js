import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Forget from "./components/Forget";
import ResetPwd from "./components/ResetPwd";
import ContactUs from "./pages/ContactUs";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard"; 
import BaseGenerale from "./pages/BaseGenerale";
import Home from "./pages/Home";
const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/forget" || location.pathname === "/resetpwd";
  const isDashboard = location.pathname === "/dashboard";
  const isBaseGenerale = location.pathname === "/basegenerale";

  return (
    <>
      {!isAuthPage && !isDashboard && !isBaseGenerale && <NavBar />}

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/resetpwd" element={<ResetPwd />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/basegenerale" element={<BaseGenerale/>} />
      </Routes>

      {!isAuthPage && !isDashboard && !isBaseGenerale && <Footer />}
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
