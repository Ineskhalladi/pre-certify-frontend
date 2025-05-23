import React, { useState, useEffect } from "react";
import "./ChoixEntr.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import entr from "../assets/entr.png";

const ChoixEntreprise = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [selectedEntrepriseId, setSelectedEntrepriseId] = useState("");
  const navigate = useNavigate();

  const emailAuditeur = JSON.parse(localStorage.getItem("user"))?.email;
  useEffect(() => {
    console.log("📥 Début du useEffect - emailAuditeur :", emailAuditeur);
  
    if (!emailAuditeur) {
      console.warn("⛔ Aucun email trouvé dans le localStorage.");
      return;
    }
  
    axios
      .get("http://localhost:5000/api/auth/allaudit")
      .then((res) => {
        console.log("📦 Données reçues depuis /allaudit :", res.data);
  
        const auditeur = res.data.find(
            (user) => user.email === emailAuditeur);
                  console.log("🔍 Auditeur trouvé :", auditeur);
  
                  if (auditeur && Array.isArray(auditeur.entreprisesAssignees)) {
                    setEntreprises(auditeur.entreprisesAssignees);
                    console.log("✅ Entreprises assignées :", auditeur.entreprisesAssignees);
                  } else {
                    console.warn("⚠️ Aucune entreprise assignée trouvée ou format invalide.");
                  }
                  
      })
      .catch((err) => {
        console.error("❌ Erreur lors de la récupération des auditeurs :", err);
      });
  }, [emailAuditeur]);
  

  const handleEntrer = () => {
    if (!selectedEntrepriseId) {
      alert("Veuillez sélectionner une entreprise.");
      return;
    }

    const selectedEntreprise = entreprises.find(
        (ent) => ent.rnu === selectedEntrepriseId
      );

    if (selectedEntreprise) {
      localStorage.setItem("entrepriseToken", JSON.stringify(selectedEntreprise));
      navigate("/dashboard");
    } else {
      alert("Entreprise sélectionnée invalide.");
    }
  };

  return (
    <div className="container">
      <div className="left-section44">
        <img src={entr} alt="entreprise" />
      </div>
      <div className="right-section4">
        <img src={logo} alt="Logo" className="logo" />
        <div className="container-sign">
          <div className="box1">
            <h2 className="title-forget1">Liste des Entreprises</h2>
            <p className="phrase1">Please select the company you want to audit.</p>

            <label className="label1">Entreprise</label>
            <select
              className="input-field55"
              value={selectedEntrepriseId}
              onChange={(e) => setSelectedEntrepriseId(e.target.value)}
            >
              <option value="">-- Choisir une entreprise --</option>
              {entreprises.map((ent) => (
                <option key={ent.rnu} value={ent.rnu}>
                {ent.name} - RNU: {ent.rnu}
              </option>
              ))}
            </select>

            <button className="send-code" onClick={handleEntrer}>
              Entrer
            </button>

            <Link to="/signin" className="back-link11">
            Back to <span className="lien-login">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoixEntreprise;
