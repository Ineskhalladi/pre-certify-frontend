import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Forget.css"; 
import logo from "../assets/logo.png";
import forget from "../assets/forget.png";

const Forget = () => { 
    const [email, setEmail] = useState("");

  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      let newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={forget} alt="Forget Password" />
      </div>
      <div className="right-section">
        <img src={logo} alt="Logo" />
        <div className="container-sign">
          <div className="login-box">
            <h2 className="title-forget">Forget Password ?</h2>
            <p className="phrase">
              Please enter your email address to receive a 
              <br/>verification code.
            </p>
            
            <label className="label">Email</label>
              <input type="email" placeholder="In your email" className="input-field5"  value={email}
          onChange={(e) => setEmail(e.target.value)} required />
            
            <p className="label">Verification code</p>
            <div className="verification-code">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="code-input"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </div>
            <button className="send-button">Send</button>
            <Link to="/login" className="back-link">Back to <span>Login</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
