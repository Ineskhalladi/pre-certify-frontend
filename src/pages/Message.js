import React, { useState, useEffect } from "react";
import "../pages/Veille.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
import { TiMessages } from "react-icons/ti";

const Message = () => {

    const [messages, setMessages] = useState([]);

    // Récupération des messages depuis le backend
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/allmsg"); // adapte URL
        setMessages(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des messages :", error);
      }
    };
  
    // Suppression d’un message
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/auth/deletemsg/${id}`);
        setMessages((prev) => prev.filter((msg) => msg._id !== id)); // mettre à jour l’état local
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    };
  
    useEffect(() => {
      fetchMessages();
    }, []);
  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Des Messages</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <TiMessages className="icon-res" />
            <h2>Liste des messages</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>

        <table className="responsables-table">
          <thead>
            <tr>
              <th>Name </th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.phone}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>
                  <div className="action-icones" onClick={() => handleDelete(msg._id)}>
                    <BiTrash />
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

export default Message;
