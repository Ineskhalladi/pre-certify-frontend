import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AjouteAction = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("");
  const [date, setDate] = useState("");
  const [responsables, setResponsables] = useState([]);
  const [selectedResponsable, setSelectedResponsable] = useState("");

useEffect(() => {
  const fetchTextes = async () => {
    try {
      console.log("📥 Début récupération des textes");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("❌ Aucun token trouvé");

      const decoded = jwtDecode(token);
      const userId = decoded.id;
      console.log("✅ ID utilisateur :", userId);

      const entrepriseData = JSON.parse(localStorage.getItem("entrepriseToken"));
      const identre = entrepriseData.identre;
      console.log("🏢 ID entreprise :", identre);

      // 👉 Appel API pour récupérer tous les responsables
      const response = await axios.get("http://localhost:5000/api/auth/allres");

      // 🔍 filtrage responsables selon identre
      const responsablesFiltres = response.data.filter((res) => {
        return (
          res.createdByEntr &&
          res.createdByEntr.length > 0 &&
          res.createdByEntr[0].identre === identre
        );
      });

      setResponsables(responsablesFiltres);
      console.log("📦 Responsables filtrés :", responsablesFiltres);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des responsables :", error);
    }
  };

  fetchTextes();
}, []);

const handleSubmit = async () => {
  if (!action || !date || !selectedResponsable) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/api/auth/action", {
      action,
      echeance: date,
      responsable: selectedResponsable,
    });

    if (response.status === 201) {
      alert("✅ Action enregistrée avec succès !");
      navigate("/action"); // Redirection vers la page des actions
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement de l'action :", error);
    alert("Erreur lors de l'enregistrement !");
  }
};

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Actions</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaUserPlus className="icon-res" />
            <h2>Ajouter action</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>
        <div className="form-compte">
          <label>Action</label>
          <textarea
            className="input-compte"
            placeholder="Ajouter action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />

          <label>Responsable</label>
       <select
  className="input-compte-select"
  value={selectedResponsable}
  onChange={(e) => setSelectedResponsable(e.target.value)}
>
  <option value="">--Choisir un responsable--</option>
  {responsables.map((res) => (
    <option key={res._id} value={res._id}>
      {res.name}
    </option>
  ))}
</select>


          <label>Échéance</label>
          <input
            type="date"
            className="input-compte"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="button-group">
         <button className="btn-search" onClick={handleSubmit}>
            <FaSave /> Enregistrer
              </button>

          <button className="btn-cancel" onClick={() => navigate("/action")}>
            <FaSyncAlt /> Annuler
          </button>
        </div>
      </div>

      <p className="footer-base">
        Copyright © 2025 PreCertify. Tous les droits réservés.
      </p>
    </>
  );
};

export default AjouteAction;
