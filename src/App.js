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
import EmailVerification from "./components/EmailVerification";
import VeilleReg from "./pages/VeilleReg";
import Normes from "./pages/Normes";
import TexteInfo from "./pages/TexteInfo";
import TexteApp from "./pages/TexteApp";
import ConformeV from "./pages/ConformeV";
import PlanActionV from "./pages/PlanActionV";


const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" 
  || location.pathname === "/signup" 
  || location.pathname === "/forget" 
  || location.pathname === "/resetpwd"
  || location.pathname.startsWith("/verify");
  const isDashboard = location.pathname === "/dashboard";
  const isBaseGenerale = location.pathname === "/basegenerale";
  const isTexteInfo = location.pathname === "/texteinfo";
  const isTexteApp = location.pathname === "/texteapp";
  const isConformeV = location.pathname === "/conformev";
  const isPlanActionV = location.pathname === "/planactionv";


  return (
    <>
      {!isAuthPage && !isDashboard && !isBaseGenerale && !isTexteInfo && !isTexteApp && !isConformeV && !isPlanActionV && <NavBar />}

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/normes" element={<Normes />} />
      <Route path="/veillereg" element={<VeilleReg />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:token" element={<EmailVerification />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/resetpwd" element={<ResetPwd />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/basegenerale" element={<BaseGenerale/>} />
        <Route path="/texteinfo" element={<TexteInfo />} />
        <Route path="/texteapp" element={<TexteApp />} />
        <Route path="/conformev" element={<ConformeV />} />
        <Route path="/planactionv" element={<PlanActionV />} />

      </Routes>

      {!isAuthPage && !isDashboard && !isBaseGenerale && !isTexteInfo && !isTexteApp && !isConformeV && !isPlanActionV && <Footer />}
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
