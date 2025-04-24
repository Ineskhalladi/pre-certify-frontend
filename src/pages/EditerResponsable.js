import React, { useState} from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";


const EditerResponsable = () => {

  
  return (
    <>
      <NavBar2 />
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Responsable</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaUserPlus className="icon-res" />
    <h2>Ajouter responsable </h2>
  </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="form-ajout-responsable">
  <div className="form-row">
    <div className="form-col">
      <label>Prénom</label>
      <input type="text" className="input-res" placeholder="Entrer le prénom " />
    </div>
    <div className="form-col">
      <label>Nom</label>
      <input type="text" className="input-res" placeholder="Entrer le nom" />
    </div>
  </div>

  <div className="form-row">
    <div className="form-col">
      <label>E-mail</label>
      <input type="email" className="input-res" placeholder="Entrer l'email " />
    </div>
    <div className="form-col">
      <label>Téléphone</label>
      <input type="text" className="input-res" placeholder="Entrer le numéro de phone" />
    </div>
  </div>

  <div className="form-row">
    <div className="form-col-full">
      <label>Services</label>
      <select className="input-res-select">
        <option>--Choisir un service--</option>
        <option>Service IT</option>
        <option>Qualité</option>
        <option>Production</option>
      </select>
    </div>
  </div>

  <div className="form-row form-row-bottom">
    <div className="form-col">
      <label>Associer ce compte à un compte utilisateur</label>
      <select className="input-res">
        <option>-- Choisir compte user--</option>
        <option>user1@exemple.com</option>
        <option>user2@exemple.com</option>
      </select>
    </div>

    <div className="form-col">
      <label>Donner accès à modifier les actions d'un responsable</label>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  </div>
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

export default EditerResponsable ;
