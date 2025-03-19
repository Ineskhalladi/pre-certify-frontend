






import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar2.css";
import { FaRegUserCircle, FaChevronDown, FaChevronUp, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FiGrid, FiLayout, FiMessageCircle, FiMonitor, FiZap } from "react-icons/fi";
import { LuBell, LuList } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";

const NavBar2 = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMaVeilleOpen, setIsMaVeilleOpen] = useState(false);
  const [isExigencesOpen, setIsExigencesOpen] = useState(false);

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
              onBlur={() => setIsProfileOpen(false)}   >
            <FaRegUserCircle className="user-icon3" />
            <span className="user-name" onClick={() => setIsProfileOpen(!isProfileOpen)}>OUSSAMA_NC</span>
            {isProfileOpen ? <FaChevronUp className="dropdown-icon3" /> : <FaChevronDown className="dropdown-icon3" />}
          </div>
        </div>
      </div>

      <nav className="navbar-bottom3">
        <Link to="/dashboard" className="menu-item3"><FiMonitor className="icon-nav3" /> Tableau de Bord</Link>
        <Link to="/basegenerale" className="menu-item3"><LuList className="icon-nav3" /> Base Générale</Link>

        <div 
          className="dropdown3" 
          onMouseEnter={() => setIsMaVeilleOpen(true)}
          onMouseLeave={() => setIsMaVeilleOpen(false)}
        >
          <div className="menu-item3">
            <FiLayout className="icon-nav3" /> Ma Veille 
          </div>
          {isMaVeilleOpen && (
            <div className="dropdown-content3">
              <Link to="/textes pour information">Textes pour Information</Link>
              <Link to="/textes applicables">Textes Applicables</Link>
              <Link to="/evaluation de conformite">Évaluation de Conformité</Link>
              <Link to="/mon Plan d'action">Mon Plan d'Action</Link>
              <Link to="/Suivie">Suivie</Link>
              <Link to="/mes statistiques">Mes Statistiques</Link>
            </div>
          )}
        </div>

        <div 
          className="dropdown3" 
          onMouseEnter={() => setIsExigencesOpen(true)}
          onMouseLeave={() => setIsExigencesOpen(false)}
        >
          <div className="menu-item3">
            <FiZap className="icon-nav3" /> Mes Autres Exigences 
          </div>
          {isExigencesOpen && (
            <div className="dropdown-content3">
              <Link to="/mes exigences">Mes Exigences</Link>
              <Link to="/evaluation de conformite">Évaluation de Conformité</Link>
              <Link to="/mon Plan d'action">Mon Plan d'Action</Link>
              <Link to="/statistiques des exigences">Statistiques des Exigences</Link>
            </div>
          )}
        </div>

        <Link to="/monitoring" className="menu-item3"><FiGrid className="icon-nav3" /> Monitoring</Link>
        <Link to="/mes alertes" className="menu-item3"><LuBell className="icon-nav3" /> Mes Alertes <span className="alert-count">20</span></Link>
        <Link to="/faq" className="menu-item3"><FiMessageCircle className="icon-nav3" /> FAQ</Link>
        
        <div className="search-container3">
  <BiSearch className="search-icon3" onClick={() => console.log("Recherche activée")} />
  <input type="text" placeholder="Rechercher..." className="search-input2" />
</div>
      </nav>

      {isProfileOpen && (
        <div className="dropdown-menu3">
          <Link to="/mon profil" className="dropdown-item3">Mon Profil</Link>
          <Link to="/parametres" className="dropdown-item3">Paramètres</Link>
          <Link to="/deconnexion" className="dropdown-item3 logout"><FaSignOutAlt className="logout-icon" /> Déconnexion</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar2;








