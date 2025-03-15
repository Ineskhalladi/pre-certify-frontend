import React from 'react';
import { Link } from 'react-router-dom'; 
import '../components/NavBar.css';
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import evolu from "../assets/iconesevoluation.png"
import { useState } from "react";

const Navbar = () => {
const [showSearch, setShowSearch] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} className="logo" alt="PreCertify Logo" />
      </div>
      
      <div className="navbar-menu">
        <Link to="/home" className='na'>Home</Link>
        <Link to="/normes" className='na'>Normes</Link>
        <Link to="/secteurs" className='na'>Secteurs</Link>
        <Link to="/info" className='na'>Information et actualités</Link>
        <Link to="/" className='na'>Contact</Link>
        <Link to="/veille" className='na'>Veille</Link>
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
