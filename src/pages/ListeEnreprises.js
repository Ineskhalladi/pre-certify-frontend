import React, { useState, useEffect } from "react";
import "../pages/Veille.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";

const ListeEntreprises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entreprises, setEntreprises] = useState([]);
  const navigate = useNavigate();

  // 📦 Fetch entreprises vérifiées
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/entreprises")
      .then((res) => {
        setEntreprises(res.data);
      })
      .catch((err) => {
        console.error("Erreur fetch entreprises :", err);
      });
  }, []);

  // 🔍 Filtrage
  const filteredEntreprises = entreprises.filter((ent) =>
    ent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ent.nif?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ent.sector?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Liste des entreprises</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des entreprises acceptées</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>

        <div className="content-res">
          <div className="search-label-group">
            <label htmlFor="searchInput" className="label-recherche">Recherche :</label>
            <input
              type="text"
              id="searchInput"
              className="search-res"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="responsables-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>NIF</th>
              <th>Secteur</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntreprises.map((entreprise, index) => (
              <tr key={index}>
                <td>{entreprise.name}</td>
                <td>{entreprise.email}</td>
                <td>{entreprise.nif}</td>
                <td>{entreprise.sector}</td>
                <td>
                  <div className="action-icones">
                    <BiEdit title="Modifier" />
                    <BiTrash title="Supprimer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <ul className="pagination">
            <li className="btn-item">Précédent</li>
            <li className="btn-item active">1</li>
            <li className="btn-item">Suivant</li>
            <li className="btn-item">Fin</li>
          </ul>
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default ListeEntreprises;
