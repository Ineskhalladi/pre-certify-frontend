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
          >
<button className="naa" onMouseDown={() => setShowSectors(true)}>Secteurs</button>
{showSectors && ( // Affichage des secteurs selon showSectors
            <div className="sectors-dropdown">
              <div className="sectors-grid">
                <Link to="/sante" className="sector-item" onClick={() => setShowSectors(false)}>Santé</Link>
                <Link to="/infor"className="sector-item" onClick={() => setShowSectors(false)}>Informatique et technologies connexes</Link>
                <Link to="/gestion" className="sector-item" onClick={() => setShowSectors(false)}>Gestion et services</Link>
                <Link to="/securite" className="sector-item" onClick={() => setShowSectors(false)}>Sécurité, sûreté et risques</Link>
                <Link to="/transport" className="sector-item" onClick={() => setShowSectors(false)}>Transport</Link>
                <Link to="/energie" className="sector-item" onClick={() => setShowSectors(false)}>Énergie</Link>
                <Link to="/diversite" className="sector-item" onClick={() => setShowSectors(false)}>Diversité et inclusion</Link>
                <Link to="/durabilite" className="sector-item" onClick={() => setShowSectors(false)}>Durabilité environnementale</Link>
                <Link to="/alimentation" className="sector-item" onClick={() => setShowSectors(false)}>Alimentation et agriculture</Link>
                <Link to="/materiaux" className="sector-item" onClick={() => setShowSectors(false)}>Matériaux</Link>
                <Link to="/batiment" className="sector-item" onClick={() => setShowSectors(false)}>Bâtiment et construction</Link>
                <Link to="/ingenierie" className="sector-item" onClick={() => setShowSectors(false)}>Ingénierie</Link>
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
          <Link to="/signin" className="access-button">
          <img src={evolu} className="evolu" alt='evolu'/>
        Accès Veille
        </Link>
    
      </div>
    </nav>
  );
};

export default Navbar;
