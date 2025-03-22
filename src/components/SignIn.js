import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../App.css"; 
import logo from "../assets/logo.png";
import sign from "../assets/sign.png";
import axios from "axios";

const SignIn = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", { email, password });
      console.log('Réponse du serveur:', response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion au serveur");
    }
  };


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
            {error && <p className="error-message">{error}</p>}
            <br/>
            <div className="input-group">
              <FaUser className="icons" />
              <input 
                type="text" 
                placeholder="In your email" 
                className="input-field" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br/>
            <div className="input-group">
              <FaLock className="icons" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Your password" 
                className="input-field" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <Link to="/forget" className="forgot-password">Forgot password?</Link>
            <button className="login-button" onClick={handleSignIn}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;