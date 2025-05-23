import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus, FaFolderOpen, FaPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";

const Action = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  // Charger les actions au démarrage
  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/actionall");
      setActions(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des actions :", err);
    }
  };

  const deleteAction = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette action ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteaction/${id}`);
      setActions(actions.filter((action) => action._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const filteredActions = actions.filter((a) =>
    a.action?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Actions</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir" onClick={fetchActions}><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des actions</h2>
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

          <button className="add-res" onClick={() => navigate("/ajoutaction")}>
            <FaPlus />
          </button>
        </div>

        <table className="responsables-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Action</th>
              <th>Responsable</th>
              <th>Échéance</th>
              <th>Validation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((act, index) => (
              <tr key={act._id}>
                <td>{index + 1}</td>
                <td>{act.action}</td>
                <td>{act.responsable?.name}</td>
                <td>{new Date(act.echeance).toLocaleDateString()}</td>
                <td>Non Validée</td>
                <td>
                  <div className="action-icones">
                    <BiEdit onClick={() => navigate(`/editaction/${act._id}`)} />
                    <BiTrash onClick={() => deleteAction(act._id)} />
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

export default Action;
