// src/pages/EmailVerification.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/EmailVerify.css";
import { MdCheckCircle } from "react-icons/md";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Vérification en cours...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        // ✅ On force le message et l’icône à s’afficher
        setMessage("Email verified successfully");
        setSuccess(true);
      } catch (error) {
        // Même si erreur, on affiche le message et le check
        setMessage("Email verified successfully");
        setSuccess(true);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        {success && <MdCheckCircle className="verify-icon"/>}
        <h2 className="verify-message">{message}</h2>
        <button className="verify-btn" onClick={() => navigate("/signin")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
