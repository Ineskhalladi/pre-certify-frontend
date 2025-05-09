import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditerResponsable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?._id;

  const [nom, setNom] = useState(location.state?.name || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [telephone, setTelephone] = useState(location.state?.telephone || "");
   const [motDePasse, setMotDePasse]=useState(location.state?.password || "");
  const [accesActions, setAccesActions] = useState(location.state?.accesActions || false);
  const [userEmail, setUserEmail] = useState("");

  const enregistrerResponsable = async () => {
    try {
      if (!id) return; // sécurité
      console.log("ID à modifier:", id);

      const response = await axios.put(`http://localhost:5000/api/auth/updateres/${id}`, {
        nom,
        motDePasse,
        email,
        telephone,
        accesActions
      });
      console.log("Responsable mis à jour :", response.data);
      alert(" Modifier responsable  avec succès !");

      navigate("/mesresponsables");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

 

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Responsable</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaUserPlus className="icon-res" />
            <h2>Editer responsable</h2>
          </div>
        </div>
        <div className="line-horiz-compte"></div>
        <div className="form-ajout-responsable">
          <div className="form-row">
          <div className="form-col">
      <label>Nom et Prénom</label>
      <input type="text" className="input-res" placeholder="Entrer le nom et prenom "  value={nom}
          onChange={(e) => setNom(e.target.value)}/>
    </div>
    <div className="form-col">
      <label>E-mail</label>
      <input type="email" className="input-res" placeholder="Entrer l'email "  value={email}
          onChange={(e) => setEmail(e.target.value)}/>
    </div>
  </div>

  <div className="form-row">
    <div className="form-col">
      <label>Mot de passe</label>
      <input type="email" className="input-res" placeholder="Entrer password "  value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}/>
    </div>
    <div className="form-col">
      <label>Téléphone</label>
      <input type="text" className="input-res" placeholder="Entrer le numéro de phone"  value={telephone}
          onChange={(e) => setTelephone(e.target.value)}/>
    </div>
  </div>
        

          <div className="form-row form-row-bottom">
            <div className="form-col">
              <label>Associer ce compte à un compte utilisateur</label>
              <select className="input-res">
                <option>-- Choisir compte utilisateur --</option>
                <option>{userEmail}</option>
              </select>
            </div>

            <div className="form-col">
              <label>Donner accès à modifier les actions d'un responsable</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accesActions}
                  onChange={(e) => setAccesActions(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="button-group">
        <button className="btn-search" onClick={enregistrerResponsable}>
        <FaSave /> Enregistrer
          </button>
          <button className="btn-cancel" onClick={() => navigate("/mesresponsables")}>
            <FaSyncAlt /> Annuler
          </button>
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default EditerResponsable;
