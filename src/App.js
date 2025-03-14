import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <div className="App">
      <ContactUs />
    </div>

/*<Router>
      <Routes>
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/" element={<ContactUs/>} />


      </Routes>
    </Router>*/
  );
};

export default App;



/*<Route path="//" element={<Navigate replace to="/signin" />} />*/
