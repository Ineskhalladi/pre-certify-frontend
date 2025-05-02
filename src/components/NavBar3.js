

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./NavBar2.css";
import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FiGrid, FiLayout, FiMonitor, FiPower, FiUsers, FiZap } from "react-icons/fi";
import { LuBell, LuList } from "react-icons/lu";
import { BiFolder, BiSearch, BiUser } from "react-icons/bi";
import profile from "../assets/profile.png"
import { TbUsersGroup } from "react-icons/tb";
const NavBar3 = () => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
 
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);
  
  const handleLogout = () => {
    console.log("Déconnecté");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/signin");
    }, 300);
  };
  
  
  return (
    <div className="navbar-container3">
      <div className="navbar-top3">
        <img src={logo} alt="PreCertify Logo" className="logo3" />
        <div className="navbar-right3">
          <div className="user-info3">
            <span className="user-ref">Ref : <span className="num-date">14016725</span></span>
            <span className="user-expire">Expire le : <span className="num-date">12/06/2025</span></span>
          </div>
          <div className="user-profile"  tabIndex={0}  // Permet à l'élément de capter le focus
              onClick={() => setIsProfileOpen(!isProfileOpen)}> 
<div className="avatar-container">
    <img src={profile} alt="Profil" className="avatar-icon" />
    <span className="online-dot"></span>
  </div>            <span className="user-name" onClick={() => setIsProfileOpen(!isProfileOpen)}> {userName} </span>
            {isProfileOpen ? <FaChevronUp className="dropdown-icon3" /> : <FaChevronDown className="dropdown-icon3" />}
          </div>
        </div>
      </div>

      <nav className="navbar-bottom3">
          <Link to="/dashboards" className={`menu-item3 ${location.pathname === "/dashboard" ? "active" : ""}`}><FiMonitor className="icon-nav3" /> Dashboard</Link>
        
        <Link to="/listedesdemandes" className={`menu-item3 ${location.pathname === "/listedesdemandes" ? "active" : ""}`}
        ><LuList className="icon-nav3" /> Liste des demandes</Link>

<Link to="/listeentreprises" className={`menu-item3 ${location.pathname === "/listeentreprises" ? "active" : ""}`}
        ><LuList className="icon-nav3" /> Liste de accepter des entreprises </Link>

<Link to="/auditeur" className={`menu-item3 ${location.pathname === "/auditeur" ? "active" : ""}`}
        ><LuList className="icon-nav3" /> Liste des auditeurs </Link>

   
<Link to="/textes" className={`menu-item3 ${location.pathname === "/textes" ? "active" : ""}`}
        ><LuList className="icon-nav3" /> Liste des textes  </Link>
     

      </nav>

      {isProfileOpen && (
        <div className="dropdown-menu3">
            <div className="dropdown-item3">
    <BiUser className="icon-profiles" />
    <Link to="/moncompte" onClick={() => setIsProfileOpen(false)}>Mon compte</Link>
  </div>
 
          <div className="dropdown-item3 logout"
           onMouseDown={handleLogout}
           tabIndex="0"
           role="button">
  <FiPower className="logout-icon" /> Déconnexion
</div>
        </div>
      )}
    </div>
  );
};

export default NavBar3;








