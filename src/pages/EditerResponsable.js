import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditerResponsable = () => {
  const location = useLocation();
  const [prenom, setPrenom] = useState(location.state?.prenom || "");
  const [nom, setNom] = useState(location.state?.nom || "");
  const [emailRes, setEmailRes] = useState(location.state?.emailRes || "");
  const [telephone, setTelephone] = useState(location.state?.telephone || "");
  const [accesModif, setAccesModif] = useState(location.state?.accesModif || false);
  const [userEmail, setUserEmail] = useState(location.state?.userEmail || "");
  const [services, setServices] = useState(location.state?.services || []); // Services initiaux
  const [selectedService, setSelectedService] = useState(location.state?.service || ""); // Service sélectionné
  const navigate = useNavigate();
  const id = location.state?._id;
  
  const enregistrerResponsable = async () => {
    try {
      if (id) {
        // Si on modifie un responsable existant
        console.log('Mise à jour de responsable:', { prenom, nom, emailRes, telephone, selectedService, accesModif });
        const response = await axios.put(`http://localhost:5000/api/auth/updateres/${id}`, {
          prenom,
          nom,
          emailRes,
          telephone,
          service: selectedService,
          accesModif
        });
        console.log('Réponse de la mise à jour:', response.data);
      } else {
        // Si on ajoute un nouveau responsable
        const response = await axios.post("http://localhost:5000/api/auth/ajoutres", {
          prenom,
          nom,
          emailRes,
          telephone,
          service: selectedService,
          accesModif
        });
        console.log('Réponse de l\'ajout:', response.data);
      }
      navigate("/mesresponsables"); // Redirection vers la page MesResponsables
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);


  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/allservice");
      setServices(res.data);
    } catch (err) {
      console.error("Erreur fetch services :", err);
    }
  };


  return (
    <>
      <NavBar2 />
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
              <label>Prénom</label>
              <input
                type="text"
                className="input-res"
                placeholder="Entrer le prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div className="form-col">
              <label>Nom</label>
              <input
                type="text"
                className="input-res"
                placeholder="Entrer le nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>E-mail</label>
              <input
                type="email"
                className="input-res"
                placeholder="Entrer l'email"
                value={emailRes}
                onChange={(e) => setEmailRes(e.target.value)}
              />
            </div>
            <div className="form-col">
              <label>Téléphone</label>
              <input
                type="text"
                className="input-res"
                placeholder="Entrer le numéro de téléphone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col-full">
              <label>Services</label>
              <select
                className="input-res-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">-- Choisir un service --</option>
                {services.map((service) => (
                  <option key={service._id} value={service.nom}>
                    {service.nom}
                  </option>
                ))}
              </select>
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
                  checked={accesModif}
                  onChange={(e) => setAccesModif(e.target.checked)}
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
          <button className="btn-cancel">
            <FaSyncAlt /> Annuler
          </button>
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default EditerResponsable;
