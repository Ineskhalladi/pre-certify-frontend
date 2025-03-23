import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "../components/ResetPwd.css"; 
import logo from "../assets/logo.png";
import forget from "../assets/forget.png";

const ResetPwd = () => { 
    const { token } = useParams(); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");

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
        const newPwd = e.target.value;
        setPassword(newPwd);
        setErrorMessage(validatePassword(newPwd));
        console.log("🚀 Password changed:", newPwd);
        console.log("🛑 Error message:", errorMessage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 Handle submit started");

        if (errorMessage) {
          console.log("❌ Password validation error:", errorMessage);

            alert("Corrigez les erreurs avant de continuer.");
            return;
        }
        if (password !== confirmPassword) {
          console.log("❌ Passwords do not match:", password, confirmPassword);

            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/resetpwd", { token, password });
            setMessage(response.data.message);
            if (response.data.success) {
              console.log("✅ Redirecting to sign-in page");

                window.location.href = "/signin"; 
            }
        } catch (error) {
          console.error("❌ Error during password reset:", error);

            setMessage(error.response?.data?.message || "Erreur lors de la réinitialisation.");
        }
    };

    return (
        <div className="container">
            <div className="left-section3">
                <img src={logo} alt="Logo" className="logo" />
                <div className="container-sign">
                    <div className="box-reset">
                        <h2 className="title-forget">Enter new Password</h2>
                        <p className="phrase">Your new password must be different from previously used passwords.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group3">
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="New password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="input-field6"
                                    required />
                                <span className="password-toggle2" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>

                            {errorMessage && <small className="error-message">{errorMessage}</small>}

                            <div className="input-group3">
                                <input type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="input-field7"
                                    required />
                                <span className="password-toggle3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>

                            {message && <p>{message}</p>}

                            <button className="Reset-button" type="submit">Reset Password</button>
                        </form>

                        <Link to="/signin">Back to Sign In</Link>
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
