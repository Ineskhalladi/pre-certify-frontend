import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaIdCard, FaLock, FaEye, FaEyeSlash, FaBriefcase } from "react-icons/fa";
import "../App.css";
import logo from "../assets/logo.png";
import sign from "../assets/sign.png";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [sector, setSector] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");


  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", { name, email, cin, sector, password });
      console.log('Réponse du serveur:', response.data);
      alert(`Bienvenue ${response.data.user.name} ! Connectez-vous maintenant.`);
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion au serveur");
    }
  };


  return (
    <div className="container">
      <div className="right-section2">
        <img src={logo} alt="Logo" />
        <div className="container-sign">
          <div className="signup-box">
            <h2 className="title2">VEILLE REGLEMENTAIRE</h2>

            <div className="tabs2">
              <Link to="/signin" className="inactive2">Sign in</Link>
              <Link to="/signup" className="active2">Sign up</Link>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group2">
              <FaUser className="icon2" />
              <input type="text" placeholder="In your name" className="input-field2" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group2">
              <FaEnvelope className="icon2" />
              <input type="email" placeholder="Your email" className="input-field2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group2">
              <FaIdCard className="icon2" />
              <input type="text" placeholder="Your CIN" className="input-field2" value={cin} onChange={(e) => setCin(e.target.value)} required pattern="[0-9]{8}" />
            </div>
            <div className="input-group2">
              <FaBriefcase className="icon2" />
              <select className="select-field2" value={sector} onChange={(e) => setSector(e.target.value)} required>
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
            <div className="input-group2">
              <FaLock className="icon2" />
              <input type={showPassword ? "text" : "password"} placeholder="Your password" className="input-field2" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="input-group2">
              <FaLock className="icon2" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="input-field2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="terms">
              <input  type="checkbox" required/> Checkbox for users to agree to the terms and conditions.
            </div>
           <Link to="/signin"> <button className="signup-button" onClick={handleSignup}>Create account</button></Link>
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
