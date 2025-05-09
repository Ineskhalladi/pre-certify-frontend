import React, { useState, useEffect } from "react";
import "../pages/Veille.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";

const Auditeur = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [auditeurs, setAuditeurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/allaudit") // Remplace cette URL si besoin
      .then((res) => {
        const auditeursFiltrés = res.data.filter((user) => user.role === "auditeur");
        setAuditeurs(auditeursFiltrés);
        console.log(auditeursFiltrés);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des auditeurs :", err)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet auditeur ?");
    if (!confirmation) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteaudit/${id}`);
      setAuditeurs((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  const filteredAuditeurs = auditeurs.filter(
    (a) =>
      a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.entreprisesAssignees?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Auditeur</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des auditeurs</h2>
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

          <button className="add-res" onClick={() => navigate("/ajouteauditeur")}>
            <FaPlus />
          </button>
        </div>

        <table className="responsables-table">
          <thead>
            <tr>
              <th>Nom et Prénom</th>
              <th>Email</th>
              <th>Entreprise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAuditeurs.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>
  {a.entreprisesAssignees?.map((entreprise, index) => (
    <div key={index}>
      {entreprise.name} - {entreprise.rnu}
    </div>
  ))}
</td>                <td>
                  <div className="action-icones">
                    <BiEdit onClick={() => navigate(`/editauditeur/${a._id}`)} />
                    <BiTrash onClick={() => handleDelete(a._id)} />
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

export default Auditeur;
