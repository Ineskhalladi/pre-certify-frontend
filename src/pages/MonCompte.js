import React, { useState} from "react";
import "../pages/MonCompte.css";
import { FaSyncAlt, FaUser, FaSave } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";

const MonCompte = () => {

  
  return (
    <>
   
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Compte utilisateur</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaUser className="icon-search" />
    <h2>Mon Compte</h2>
  </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="form-compte">
    <label>Raison sociale</label>
    <input type="text" className="input-compte" placeholder="Name" disabled />

    <label>Responsable abonnement</label>
    <input type="text" className="input-compte" placeholder="Entrer le responsable abonnement" />

    <label>Responsable veille</label>
    <input type="text" className="input-compte" placeholder="Entrer le responsable veille" />

    <label>Adresse e-mail</label>
    <input type="email" className="input-compte" placeholder="Entrer l'email " />

    <label>Téléphone</label>
    <input type="text" className="input-compte" placeholder="Entrer numéro de phone " />

    <label>FAX</label>
    <input type="text" className="input-compte" placeholder="Entrer numéro de fax " />

    <label>Secteurs</label>
    <select className="input-compte-select">
    <option value="">-- Choisir un secteur --</option>
                <option value="Sante">Santé</option>
                <option value="Informatique">Informatique et technologies connexes</option>
                <option value="gestion">Gestion et services</option>
                <option value="securite">Sécurité et risque</option>
                <option value="transport">Transport</option>
                <option value="energie">Énergie</option>
                <option value="diversite">Diversité et inclusion</option>
                <option value="durabilite">Durabilité environnementale</option>
                <option value="alimentation">Alimentation et agriculture</option>
                <option value="materiels">Matériels</option>
                <option value="batiment">Bâtiment et construction</option>
                <option value="ingenierie">Ingénierie</option>
    </select>

    <label>Nouveau mot de passe</label>
    <input type="email" className="input-compte"  placeholder="Entrer le mot de passe "  />

    <label>Confirmer le mot de passe</label>
    <input type="email" className="input-compte"  placeholder="Confirmer le mot de passe"/>

    <label>Domaine</label>
    <select className="input-compte-select">
      <option value="">-- Sélectionner le domaine --</option>
    </select>
  </div>


<div className="button-group">
    <button className="btn-search"><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
  </div>

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default MonCompte;
