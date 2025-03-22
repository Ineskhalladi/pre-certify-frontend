import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../components/ResetPwd.css"; 
import logo from "../assets/logo.png";
import forget from "../assets/forget.png";

const ResetPwd = () => { 
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour valider le mot de passe
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;               // Au moins 8 caractères
    const upperCase = /[A-Z]/;               // Au moins 1 majuscule
    const lowerCase = /[a-z]/;               // Au moins 1 minuscule
    const digit = /[0-9]/;                   // Au moins 1 chiffre
    const specialChar = /[\W_]/;             // Au moins 1 symbole

    if (!minLength.test(pwd)) return "Minimum 8 caractères requis.";
    if (!upperCase.test(pwd)) return "Au moins 1 lettre majuscule.";
    if (!lowerCase.test(pwd)) return "Au moins 1 lettre minuscule.";
    if (!digit.test(pwd)) return "Au moins 1 chiffre.";
    if (!specialChar.test(pwd)) return "Au moins 1 symbole (@, #, $, ...).";
    return ""; // Pas d'erreur
  };

  // Gérer le changement de mot de passe
  const handlePasswordChange = (e) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    setErrorMessage(validatePassword(newPwd));
  };

  // Vérification avant soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert("Corrigez les erreurs avant de continuer.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    alert("Mot de passe réinitialisé avec succès !");
  };

    return (
        <div className="container">
            <div className="left-section3">
            <img src={logo} alt="Logo" className="logo" />
                <div className="container-sign">
                    <div className="box-reset">
                        <h2 className="title-forget">Enter new Password</h2>
                        <p className="phrase">
                        Your new password must be different previous used passwords.  </p>
                        <form onSubmit={handleSubmit}>
                        <div className="input-group3">
          
              <input  type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={handlePasswordChange} className="input-field6" required />
            <span className="password-toggle2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </span>
            </div>
            {errorMessage && <small className="error-message">{errorMessage}</small>}
            <div className="input-group3">
             
              <input  type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} className="input-field7" required />
<span className="password-toggle3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {confirmPassword && password !== confirmPassword && (
          <small className="error-message">Les mots de passe doivent être identiques.</small>
        )}
                       <Link to="/signin"><button className="Reset-button" type="submit">Reset Password</button></Link> 
                        </form>
                    </div>
                </div>
            </div>
            <div className="right-section3">
            <img src={forget} alt="Forget Password" />

            </div>
        </div>
    );
};

export default ResetPwd;
