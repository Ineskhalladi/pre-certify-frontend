

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
import { BsFileText } from "react-icons/bs";
const NavBar4 = () => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMaVeilleOpen, setIsMaVeilleOpen] = useState(false);
  const [isExigencesOpen, setIsExigencesOpen] = useState(false);
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
        <Link to="/dashboarde" className={`menu-item3 ${location.pathname === "/dashboard" ? "active" : ""}`}><FiMonitor className="icon-nav3" /> Tableau de Bord</Link>
        <Link to="/cochertexte" className={`menu-item3 ${location.pathname === "/textesE" ? "active" : ""}`}
        ><BsFileText className="icon-nav3" /> Les Textes </Link>
         <div 
          className="dropdown3" 
          onMouseEnter={() => setIsMaVeilleOpen(true)}
          onMouseLeave={() => setIsMaVeilleOpen(false)}
        >
          <div className={`menu-item3 ${location.pathname === "/veille" ? "active" : ""}`} >
         <FiLayout className="icon-nav3" /> Ma Veille 
          </div>
          {isMaVeilleOpen && (
            <div className="dropdown-content3">
              <Link to="/texteappEn">Textes Applicables</Link>
              <Link to="/conformeEn">Évaluation de Conformité</Link>
              <Link to="/planactionEn">Mon Plan d'Action</Link>
              <Link to="/statistiquesEn">Mes Statistiques</Link>

            </div>
          )}
        </div>
<Link to="/mesresponsables" className={`menu-item3 ${location.pathname === "/textesE" ? "active" : ""}`}
        ><LuList className="icon-nav3" /> Liste des responsables</Link>

        <Link to="/monitoring" className={`menu-item3 ${location.pathname === "/monitoring" ? "active" : ""}`}>
        <FiGrid className="icon-nav3" /> Monitoring</Link>
         
             <Link to="/alertes"  className={`menu-item3 ${location.pathname === "/alertes" ? "active" : ""}`}>
             <LuBell className="icon-nav3" /> Mes Alertes <span className="alert-count">2</span></Link>        
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

export default NavBar4;








