import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../components/NavBar.css';
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import evolu from "../assets/iconesevoluation.png";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSectors, setShowSectors] = useState(false);

  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} className="logo" alt="PreCertify Logo" />
      </div>
      
      <div className="navbar-menu">
        <Link to="/" className='na'>Home</Link>
        <Link to="/normes" className='na'>Normes</Link>
        
        <div 
          className="dropdown" 
          tabIndex={0} // Permet de gérer l'événement onBlur
          onBlur={() => setShowSectors(false)} // Masquer les secteurs si l'on clique en dehors
        >
          <button className="naa" onClick={() => setShowSectors(!showSectors)}>Secteurs</button>
          {showSectors && ( // Affichage des secteurs selon showSectors
            <div className="sectors-dropdown">
              <div className="sectors-grid">
                <Link to="/sante" className="sector-item">Santé</Link>
                <Link to="/secteurs/informatique" className="sector-item">Informatique et technologies connexes</Link>
                <Link to="/secteurs/gestion" className="sector-item">Gestion et services</Link>
                <Link to="/secteurs/securite" className="sector-item">Sécurité, sûreté et risques</Link>
                <Link to="/secteurs/transport" className="sector-item">Transport</Link>
                <Link to="/secteurs/energie" className="sector-item">Énergie</Link>
                <Link to="/secteurs/diversite" className="sector-item">Diversité et inclusion</Link>
                <Link to="/secteurs/durabilite" className="sector-item">Durabilité environnementale</Link>
                <Link to="/secteurs/agriculture" className="sector-item">Alimentation et agriculture</Link>
                <Link to="/secteurs/materiaux" className="sector-item">Matériaux</Link>
                <Link to="/secteurs/construction" className="sector-item">Bâtiment et construction</Link>
                <Link to="/secteurs/ingenierie" className="sector-item">Ingénierie</Link>
              </div>
            </div>
          )}
        </div>

        
        <Link to="/veillereg" className='na'>Veille</Link>
        <Link to="/contact" className='na'>Contact</Link>
      </div>
      
      <div className="navbar-right">
        <FaSearch className="search-icon" onClick={() => setShowSearch(!showSearch)} />
        <input
          type="text"
          placeholder="Rechercher..."
          className={`search-input ${showSearch ? "show" : ""}`}
          autoFocus={showSearch}
        />
        <button className="access-button">
          <img src={evolu} className="evolu" alt='evolu'/>
          <Link to="/signin">Accès Veille</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
