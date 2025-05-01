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
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const digit = /[0-9]/;
    const specialChar = /[\W_]/;
  
    if (!minLength.test(pwd)) return "Minimum 8 caractères requis.";
    if (!upperCase.test(pwd)) return "Au moins 1 lettre majuscule.";
    if (!lowerCase.test(pwd)) return "Au moins 1 lettre minuscule.";
    if (!digit.test(pwd)) return "Au moins 1 chiffre.";
    if (!specialChar.test(pwd)) return "Au moins 1 symbole (@, #, $, ...).";
    
    return "";
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleFocus = () => {
    setError(""); // Réinitialise l'erreur dès qu'on clique sur un champ
  };
  const handleSignIn = async () => {
     if (passwordError) {
      setError(passwordError);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", { email, password });
      console.log('Réponse du serveur:', response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // 🆕
      const userRole = response.data.user.role; // تحقق من الدور
    if (userRole === 'super_admin') {
      navigate("/listedesdemandes");  // توجيه الـ Super Admin إلى لوحة التحكم الخاصة به
    } else if (userRole === 'user_entreprise') {
      navigate("/dashboard");  // توجيه الـ User Entreprise إلى لوحة التحكم الخاصة به
    } else {
      setError("Rôle non autorisé");
    }
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
        <img src={logo} alt="Logo" className="logo-sign" />
        <div className="container-sign">
          <div className="login-box">
            <h2 className="title">VEILLE REGLEMENTAIRE</h2>
            
            <div className="tabs">
              <Link to="/signin" className="active">Sign in</Link>
              <Link to="/signup" className="inactive">Sign up</Link>
            </div>
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
                onFocus={handleFocus} />
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
                onChange={handlePasswordChange}
                onFocus={handleFocus} 
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="error-msg">{error}</p>}
            {passwordError && <p className="error-msg">{passwordError}</p>}

            <Link to="/forget" className="forgot-password">Forgot password?</Link>
            <button className="login-button" onClick={handleSignIn} disabled={!!passwordError}>Login</button>
          </div>
        </div>
     <Link to="/home" className="back-link1">Back to <span className="lien-login1">Home</span></Link>
        
      </div>
      
    </div>
  );
};

export default SignIn;