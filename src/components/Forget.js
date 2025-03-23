import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Forget.css";
import logo from "../assets/logo.png";
import forget from "../assets/forget.png";

const Forget = () => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            let newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);
        }
    };

    const handleSendEmail = async () => {
        console.log("Sending email request with:", email);

        if (!email) {
            setMessage("Email is required.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgetpwd", { email });
            console.log("Response from backend:", response);
            setMessage(response.data.message);
            setCodeSent(true);
        } catch (error) {
            console.error("Error during email sending:", error);
            setMessage(error.response?.data?.message || "Erreur lors de l'envoi.");
        }
    };

    const handleVerifyCode = async () => {
        const code = verificationCode.join("");
        if (code.length !== 6) {
            setMessage("Please enter a valid 6-digit code.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/verify-code", { email, code });
            console.log("Verification response:", response);
            setMessage(response.data.message);
            if (response.data.success) {
                navigate("/resetpwd", { state: { email } });
            }
        } catch (error) {
            console.error("Error during code verification:", error);

            setMessage(error.response?.data?.message || "Code invalide.");
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <img src={forget} alt="Forget Password" />
            </div>
            <div className="right-section">
                <img src={logo} alt="Logo" className="logo" />
                <div className="container-sign">
                    <div className="box">
                        <h2 className="title-forget">Forget Password ?</h2>
                        <p className="phrase">Please enter your email address to receive a verification code.</p>
                        
                        <label className="label">Email</label>
                        <input type="email" placeholder="Your email" className="input-field5" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button className="send-button" onClick={handleSendEmail}>Send Code</button>
                        {codeSent && (
                            <>
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
                                <button className="send-button" onClick={handleVerifyCode}>Verify Code</button>
                            </>
                        )}
                        {message && <p>{message}</p>}
                        <Link to="/signin" className="back-link">Back to <span className="lien-login">Sign In</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forget;
