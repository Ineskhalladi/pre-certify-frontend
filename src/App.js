import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ContactUs from "./pages/ContactUs";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer"

const App = () => {
 /* const location = useLocation();*/
  return (

    <div>
      <Footer />
    </div>
  /*<>
    {location.pathname !== '/signin' && location.pathname !== '/signup' && <NavigationBar />}

    
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ContactUs />} />
      </Routes>
  
    </>*/


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



