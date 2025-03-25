import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Forget.css";
import logo from "../assets/logo.png";
import forget from "../assets/forget.png";

const Forget = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

// Envoi du code à l'email
const handleSendEmail = async () => {
    if (!email) {
      setMessage("Email is required.");
      return;
    }
    setLoading(true);
    try {
        console.log("email",email);
      const response = await axios.post('http://localhost:5000/api/auth/send-code', { email });
      setMessage(response.data.message);
      setCodeSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };
   // Vérification du code OTP
   const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setMessage("Please enter a valid 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      console.log('codeverif', email, code);
      const response = await axios.post('http://localhost:5000/api/auth/verify-code', { email, code });
      console.log('response', response);
      console.log("Backend response:", response.data);

      if (response.data.success) {
        navigate("/resetpwd");

      }
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

   // Gestion de la saisie du code OTP
   const handleInput = (index, event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length === 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
      
      if (index < 5) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };
  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && !verificationCode[index] && index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
    }
};
    


    return (
        <div className="container">
            <div className="left-section4">
                <img src={forget} alt="Forget Password" />
            </div>
            <div className="right-section4">
                <img src={logo} alt="Logo" className="logo" />
                <div className="container-sign">
                    <div className="box">
                        <h2 className="title-forget">Forget Password ?</h2>
                        <p className="phrase">Please enter your email address to receive a verification code.</p>
                        
                        <label className="label">Email</label>
                        <input type="email" placeholder="Your email" className="input-field5" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button className="send-code" onClick={handleSendEmail} disabled={loading}>
              {loading ? 'Sending...' : 'Send Code'}
                                     </button>
                        {codeSent && (
                            <div>
                                <p className="label">Verification code</p>
                                <div className="verification-code">
                                    {verificationCode.map((digit, index) => (
                                        <input
                                        key={index}
                                        id={`input-${index}`}
                                        type="text"
                                        maxLength="1"
                                        className="code-input"
                                        value={digit}
                                        onChange={(e) => handleInput(index, e)}
                                        onKeyDown={(e) => handleBackspace(index, e)}
                  
                                        />
                                    ))}
                                </div>
                                <button className="send-button" onClick={handleVerifyCode} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify Code'}

                                </button>
                            </div>
                        )}
                                   {message && <p className="msg">{message}</p>}

                        <Link to="/signin" className="back-link">Back to <span className="lien-login">Sign In</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forget;
