import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditTexte = () => {
  const navigate = useNavigate();
  const [secteurs, setSecteurs] = useState([]);
  const [secteur, setSecteur] = useState("");
  const [domaines, setDomaines] = useState([]);
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [sousThemes, setSousThemes] = useState([]);
  const [sousTheme, setSousTheme] = useState("");
  const [natures, setNatures] = useState([]);
  const [nature, setNature] = useState("");
  const [typeTexte, setTypeTexte] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [reference, setReference] = useState("");
  const [texte, setTexte] = useState("");

  // ▶ Récupérer les secteurs
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/secteurs")
      .then(res => setSecteurs(res.data))
      .catch(err => console.error("Erreur lors du chargement des secteurs :", err));
  }, []);

   // ▶ 1. useEffect لجلب الـ domaines حسب secteur
   useEffect(() => {
    if (secteur) {
      axios.get(`http://localhost:5000/api/auth/domaines/bySecteur/${secteur}`)
        .then(res => {
          setDomaines(res.data);
        })
        .catch(err => {
          console.error("Erreur lors du chargement des domaines :", err);
        });
    } else {
      setDomaines([]);
      setNatures([]);
      setSelectedDomaine("");
    }
  }, [secteur]);

  // ▶ 2. useEffect لاستخراج الـ natures حسب domaine المختار
  useEffect(() => {
    if (selectedDomaine) {
      const domaine = domaines.find((d) => d._id === selectedDomaine);
      if (domaine && domaine.nature) {
        setNatures(domaine.nature);
      } else {
        setNatures([]);
      }
    } else {
      setNatures([]);
    }
  }, [selectedDomaine, domaines]);

  // ▶ Récupérer les thèmes selon le domaine
  useEffect(() => {
    if (selectedDomaine) {
      axios.get(`http://localhost:5000/api/auth/themes/byDomaine/${selectedDomaine}`)
        .then(res => setThemes(res.data))
        .catch(err => console.error("Erreur chargement thèmes :", err));
    } else {
      setThemes([]);
    }
  }, [selectedDomaine]);

  // ▶ Récupérer les sous-thèmes selon le thème
  useEffect(() => {
    if (selectedTheme) {
      axios.get(`http://localhost:5000/api/auth/sousthemes/byTheme/${selectedTheme}`)
        .then(res => setSousThemes(res.data))
        .catch(err => console.error("Erreur chargement sous-thèmes :", err));
    } else {
      setSousThemes([]);
    }
  }, [selectedTheme]);

  // ▶ Récupérer les services
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/allservice")
      .then(res => setServices(res.data))
      .catch(err => console.error("Erreur chargement services :", err));
  }, []);
  
  const { id } = useParams(); // ID النص
  // جلب بيانات النص القديم
  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/alltexte/${id}`)
      .then(res => {
        const data = res.data;
        setSecteur(data.secteur);
        setSelectedDomaine(data.domaine);
        setSelectedTheme(data.theme);
        setSousTheme(data.sousTheme);
        setNature(data.nature);
        setSelectedService(data.service);
        setTexte(data.texte);
        setReference(data.reference);
        setTypeTexte(data.typeTexte);
      })
      .catch(err => console.error("Erreur chargement texte:", err));
  }, [id]);

  // ▶ Envoyer le formulaire
  const handleSave = async () => {
    try {
      const data = {
        secteur,
        domaine: selectedDomaine,
        theme: selectedTheme,
        sousTheme,
        nature,
        service: selectedService,
        texte,
        reference,
        typeTexte,
      };
  
      await axios.put(`http://localhost:5000/api/auth/updatetexte/${id}`, data);
      alert("Texte modifié avec succès !");
      navigate("/textes");
    } catch (err) {
      console.error("Erreur modification texte :", err);
      alert("Échec de la modification !");
    }
  };

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Texte</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaUserPlus className="icon-res" />
            <h2>Ajouter Texte</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>
        <div className="form-compte">

          <label>Secteur</label>
          <select className="input-compte-select" value={secteur} onChange={(e) => setSecteur(e.target.value)}>
            <option value="">-- Choisir un secteur --</option>
            {secteurs.map((s) => (
              <option key={s._id} value={s._id}>{s.nom}</option>
            ))}
          </select>

          <label>Domaine</label>
          <select className="input-compte-select" value={selectedDomaine} onChange={(e) => setSelectedDomaine(e.target.value)}>
            <option value="">-- Sélectionner le domaine --</option>
            {domaines.map((d) => (
              <option key={d._id} value={d._id}>{d.nom}</option>
            ))}
          </select>

          <label>Thème</label>
          <select className="input-compte-select" value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
            <option value="">-- Choisir un thème --</option>
            {themes.map((t) => (
              <option key={t._id} value={t._id}>{t.nom}</option>
            ))}
          </select>

          <label>Sous-thème</label>
          <select className="input-compte-select" value={sousTheme} onChange={(e) => setSousTheme(e.target.value)}>
            <option value="">-- Choisir un sous-thème --</option>
            {sousThemes.map((s) => (
              <option key={s._id} value={s._id}>{s.nom}</option>
            ))}
          </select>

          <label>Nature</label>
<select className="input-compte-select" value={nature} onChange={(e) => setNature(e.target.value)}>
  <option value="">-- Choisir une nature --</option>
  {natures.map((n, idx) => (
    <option key={idx} value={n}>{n}</option>
  ))}
</select>



          <label>Service</label>
          <select className="input-compte-select" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
            <option value="">-- Choisir un service --</option>
            {services.map((s) => (
              <option key={s._id} value={s.nom}>{s.nom}</option>
            ))}
          </select>

          <label>Texte</label>
          <textarea className="input-compte" placeholder="Ajouter le texte" value={texte} onChange={(e) => setTexte(e.target.value)} />

          <label>Référence</label>
          <input type="text" className="input-compte" placeholder="Entrer la référence" value={reference} onChange={(e) => setReference(e.target.value)} />

          <label>Type de Texte</label>
          <select className="input-compte-select" value={typeTexte} onChange={(e) => setTypeTexte(e.target.value)}>
            <option value="">-- Choisir un type --</option>
            <option value="Normal">Normal</option>
            <option value="Exigence">Exigence</option>
          </select>
        </div>

        <div className="button-group">
          <button className="btn-search" onClick={handleSave}><FaSave /> Enregistrer</button>
          <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default EditTexte;
