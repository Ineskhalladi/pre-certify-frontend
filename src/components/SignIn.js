import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../App.css"; 
import logo from "../assets/logo.png";
import sign from "../assets/sign.png";

const SignIn = () => { 
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container">
      <div className="left-section">
        <img src={sign} alt="Sign In" />
      </div>
      <div className="right-section">
        <img src={logo} alt="Logo" />
        <div className="container-sign">
          <div className="login-box">
            <h2 className="title">VEILLE REGLEMENTAIRE</h2>
            
            <div className="tabs">
              <Link to="/signin" className="active">Sign in</Link>
              <Link to="/signup" className="inactive">Sign up</Link>
            </div>

            <br/>
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" placeholder="In your name" className="input-field" required  />
            </div>
            <br/>
            <div className="input-group">
              <FaLock className="icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Your password" 
                className="input-field" 
              required />
               
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
            
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
            <button className="login-button">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
