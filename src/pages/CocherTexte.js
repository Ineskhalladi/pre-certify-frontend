import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdRefresh } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import "../pages/CocherTexte.css";

const CocherTexte = () => {
  const [textes, setTextes] = useState([]);
  const [checkedTextes, setCheckedTextes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/alltexte")
      .then((res) => setTextes(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des textes :", err)
      );
  }, []);

  const toggleCheck = (id) => {
    setCheckedTextes((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Textes</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <BsFileText className="icon-res" />
            <h2>Liste des textes </h2>
          </div>
        </div>
        <div className="line-horiz-compte"></div>

        <div className="list-container-te">
          {textes.map((t) => (
            <div key={t._id} className={`texte-card ${checkedTextes.includes(t._id) ? "checked" : ""}`}>
            <label className="custom-checkbox">
  <input
    type="checkbox"
    checked={checkedTextes.includes(t._id)}
    onChange={() => toggleCheck(t._id)}
  />
  <span className="checkmark"></span>
  <span className="ref">{t.reference}</span> | <span className="content-te">{t.texte}</span>
</label>

            </div>
          ))}
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default CocherTexte;
