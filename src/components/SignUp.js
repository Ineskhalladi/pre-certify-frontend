import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaIdCard, FaLock, FaEye, FaEyeSlash, FaBriefcase } from "react-icons/fa";
import "../App.css";
import logo from "../assets/logo.png";
import sign from "../assets/sign.png";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [sector, setSector] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
    setConfirmPasswordError(newPassword !== confirmPassword ? "Les mots de passe ne correspondent pas" : "");
    setFieldErrors((prevErrors) => ({ ...prevErrors, password: "" }));

  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(newConfirmPassword !== password ? "Les mots de passe ne correspondent pas" : "");
    setFieldErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));

  };

  const validateFields = () => {
    let errors = {};
    if (!name) errors.name = "Le nom est obligatoire.";
    if (!email) errors.email = "L'email est obligatoire.";
    if (!sector) errors.sector = "Le secteur est obligatoire.";
    if (!password) errors.password = "Le mot de passe est obligatoire.";
    if (!confirmPassword) errors.confirmPassword = "Veuillez confirmer votre mot de passe.";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };
  const handleCinChange = (e) => {
    const value = e.target.value;
    // Vérifie que ce sont uniquement des chiffres et au max 8 caractères
    if (/^[0-9]*$/.test(value) && value.length <= 8) {
      setCin(value);
      setFieldErrors((prevErrors) => ({ ...prevErrors, cin: "" }));
    }
  };
  
  
  const handleSignup = async () => {
    setError("");
    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", { name, email, cin, sector, password });
      setSuccessMessage("✅ Compte créé. Veuillez vérifier votre email.");
      console.log("Réponse du serveur:", response.data);
      setTimeout(() => {
        navigate("/signin");
      }, 20000);

    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion au serveur");
    }
  };


  return (
    <div className="container">
      <div className="right-section2">
        <img src={logo} alt="Logo" className="logo-sign" />
        <div className="container-sign">
          <div className="signup-box">
            <h2 className="title2">VEILLE REGLEMENTAIRE</h2>

            <div className="tabs2">
              <Link to="/signin" className="inactive2">Sign in</Link>
              <Link to="/signup" className="active2">Sign up</Link>
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="error-message">{successMessage}</p>}

            <div className="input-group2">
              <FaUser className="icon2" />
              <input type="text" placeholder="In your name" className="input-field2" value={name}   onChange={handleInputChange(setName, "name")} required />
            </div>
            {fieldErrors.name && <p className="error-msg2">{fieldErrors.name}</p>}

            <div className="input-group2">
              <FaEnvelope className="icon2" />
              <input type="email" placeholder="Your email" className="input-field2" value={email}   onChange={handleInputChange(setEmail, "email")} required />
            </div>
            {fieldErrors.email && <p className="error-msg2">{fieldErrors.email}</p>}

            <div className="input-group2">
              <FaIdCard className="icon2" />
              <input type="text" placeholder="Your CIN (8 chiffres)" className="input-field2" value={cin}    onChange={handleCinChange}  required maxLength="8"   inputMode="numeric" />

            </div>
            {fieldErrors.cin && <p className="error-msg2">{fieldErrors.cin}</p>}

            <div className="input-group2">
              <FaBriefcase className="icon2" />
              <select className="select-field2" value={sector}   onChange={handleInputChange(setSector, "sector")} required>
                <option value="">-- Choisir un secteur --</option>
                <option value="Sante">Santé</option>
                <option value="Informatique">Informatique et technologies connexes</option>
                <option value="gestion">Gestion et services</option>
                <option value="securite">Sécurité et risque</option>
                <option value="transport">Transport</option>
                <option value="energie">Énergie</option>
                <option value="diversite">Diversité et inclusion</option>
                <option value="durabilite">Durabilité environnementale</option>
                <option value="alimentation">Alimentation et agriculture</option>
                <option value="materiels">Matériels</option>
                <option value="batiment">Bâtiment et construction</option>
                <option value="ingenierie">Ingénierie</option>
              </select>

            </div>
            {fieldErrors.sector && <p className="error-msg2">{fieldErrors.sector}</p>}


            <div className="input-group2">
              <FaLock className="icon2" />
              <input type={showPassword ? "text" : "password"} placeholder="Your password" className="input-field2" value={password} onChange={handlePasswordChange} required />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>

            </div>
            {fieldErrors.password && <p className="error-msg2">{fieldErrors.password}</p>}

            {passwordError && <p className="error-msg2">{passwordError}</p>}
            <div className="input-group2">
              <FaLock className="icon2" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="input-field2" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>

            </div>
            {fieldErrors.confirmPassword && <p className="error-msg2">{fieldErrors.confirmPassword}</p>}

            {confirmPasswordError && <p className="error-msg2">{confirmPasswordError}</p>}
            <div className="terms">
              <input type="checkbox" required /> Checkbox for users to agree to the terms and conditions.
            </div>
           
              <button className="signup-button" onClick={handleSignup}  >Create account</button>
          
          </div>
        </div>
      </div>
      <div className="left-section2">
        <img src={sign} alt="Sign Up" />
      </div>
    </div>
  );
};

export default SignUp;
