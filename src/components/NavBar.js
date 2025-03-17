import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../components/NavBar.css';
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import evolu from "../assets/iconesevoluation.png";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSectors, setShowSectors] = useState(false);

  const sectors = [
    { name: "Santé", path: "/secteurs/sante" },
    { name: "Informatique et technologies connexes", path: "/secteurs/informatique" },
    { name: "Gestion et services", path: "/secteurs/gestion" },
    { name: "Sécurité, sûreté et risques", path: "/secteurs/securite" },
    { name: "Transport", path: "/secteurs/transport" },
    { name: "Énergie", path: "/secteurs/energie" },
    { name: "Diversité et inclusion", path: "/secteurs/diversite" },
    { name: "Durabilité environnementale", path: "/secteurs/durabilite" },
    { name: "Alimentation et agriculture", path: "/secteurs/agriculture" },
    { name: "Matériaux", path: "/secteurs/materiaux" },
    { name: "Bâtiment et construction", path: "/secteurs/construction" },
    { name: "Ingénierie", path: "/secteurs/ingenierie" }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} className="logo" alt="PreCertify Logo" />
      </div>
      
      <div className="navbar-menu">
        <Link to="/home" className='na'>Home</Link>
        <Link to="/normes" className='na'>Normes</Link>
        
        <div className='dropdown'>
          <button className='naa' onClick={() => setShowSectors(!showSectors)}>Secteurs</button>
          {showSectors && (
            <div className='sectors-dropdown' onClick={(e) => e.stopPropagation()}>
              <div className='sectors-grid'>
                {sectors.map((sector, index) => (
                  <Link key={index} to={sector.path} className='sector-item' onClick={() => setShowSectors(false)}>
                    {sector.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Link to="/info" className='na'>Information et actualités</Link>
        <Link to="/veille" className='na'>Veille</Link>
        <Link to="/" className='na'>Contact</Link>
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
          <img src={evolu} className="evolu" />
          <Link to="/signin">Accès Veille</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
