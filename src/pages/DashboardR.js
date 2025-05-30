import React, { useState, useEffect} from "react";
import "../pages/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import axios from "axios";
import {jwtDecode} from "jwt-decode";
const DashboardR = () => {
    const [checkedTextes, setCheckedTextes] = useState([]);
    const [textesNormaux, setTextesNormaux] = useState([]);
    const [textesExigence, setTextesExigence] = useState([]);
        const [checkedTextesAEX, setCheckedTextesAEX] = useState([]);

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
    
          const textesRes = await axios.get("http://localhost:5000/api/auth/alltexte");
          const allTextes = textesRes.data;
          console.log("📚 Tous les textes :", allTextes);
    
          // 📌 Tous les textes type normal (même s'ils ne sont pas cochés)
          const textesNormaux = allTextes.filter((t) => t.typeTexte?.toLowerCase() === "normal");
          console.log("📄 Tous les textes normaux :", textesNormaux);
          setTextesNormaux(textesNormaux);
    
          // ✅ Récupérer les textes cochés
          const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${identre}`);
          const texteIDs = textesCochesRes.data.textes || [];
          console.log("☑️ IDs des textes cochés :", texteIDs);
    
    
          // ✅ Filtrer les textes cochés avec type normal
          const textesFiltres = allTextes.filter(
            (texte) => 
              texte.typeTexte?.toLowerCase() === "normal" &&
              texteIDs.includes(texte._id)
          );
          
  
          console.log("✅ Textes cochés détaillés :", textesFiltres);
          
          // ✅ Récupérer les états des textes
          const textesApplicableRes = await axios.get(`http://localhost:5000/api/auth/etat/${identre}`);
          const textesApplicable = textesApplicableRes.data?.filter(etat => etat.etat === "APP") || [];
          console.log("📄 États des textes applicables :", textesApplicable);
  
          const textesApplicablesDetail = textesFiltres.filter((texte) =>
            textesApplicable.some((etat) => etat.texteId === texte._id)
          );
          
  // ✅ Récupérer la conformité pour chaque texte applicable
      console.log("📡 Envoi de la requête vers l'API avec identre et conformite :");
      const conformitesRes = await axios.get(`http://localhost:5000/api/auth/conforallv/${identre}`);
      const conformites = conformitesRes.data || [];
      console.log("🟢 Conformités récupérées :", conformites);
  
  
  // 🔁 Associer la conformité à chaque texte applicable
  const textesAvecConformite = textesApplicablesDetail.map((texte) => {
    const conformiteTexte = conformites.find(c => c.texteId._id?.toString() === texte._id?.toString());
    console.log("🔗 Conformité trouvée :", conformiteTexte);
    return {
      ...texte,
       etat: "APP", 
      conformite: conformiteTexte?.conformite || "Non défini",
    };
  });
  
  console.log("✅ Textes avec conformité associée :", textesAvecConformite);
  setCheckedTextes(textesAvecConformite)
  
     // 🟡 1. Filtrer les textes cochés et applicables de type exigence
      const textesExigenceApplicables = allTextes.filter(
       (texte) =>
        texte.typeTexte?.toLowerCase() === "exigence" &&
         texteIDs.includes(texte._id)
       );
            
      
      console.log("📌 Textes exigences applicables :", textesExigenceApplicables);
      
        
     // 🔹 7. Récupérer conformité des exigences
     const conformitesExRes = await axios.get(`http://localhost:5000/api/auth/confoalle/${identre}`);
     const conformitesEx = conformitesExRes.data || [];
  
   const textesExigenceAvecConformite = textesExigenceApplicables.map((texte) => {
    const conf = conformitesEx.find(c => c.texteId?.toString() === texte._id?.toString());
  
    return {
      ...texte,
      conformiteE: conf?.conformiteE || "Non défini",
       constat: conf?.constat || "",
    };
  });
  console.log("🔍 Textes avec conformitéExigences : ", textesExigenceAvecConformite);
  
     setTextesExigence(textesExigenceAvecConformite);

        } catch (err) {
          console.error("❌ Erreur :", err.message);
          alert("Erreur lors du chargement des textes");
        }
      };
    
      fetchTextes();
    }, []);

     const [data, setData] = useState([]);
const [exigences, setExigences] = useState([]);
const [selectedTexteId, setSelectedTexteId] = useState(null);
const [domaines, setDomaines] = useState([]);
const [natures, setNatures] = useState([]);
// جلب جميع البيانات الخاصة بمحتوى mesEx
useEffect(() => {
  const fetchMesEx = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allmesEx");
      const allData = response.data;

      // استخراج المجالات والنatures بدون تكرار
      const uniqueDomaines = [...new Set(allData.map((item) => item.domaine).filter(Boolean))];
      const uniqueNatures = [...new Set(allData.map((item) => item.nature).filter(Boolean))];

      setDomaines(uniqueDomaines);
      setNatures(uniqueNatures);
      setData(allData);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données", error);
    }
  };

  fetchMesEx();
}, []);

// جلب جميع المتطلبات الأخرى (autreEx)
useEffect(() => {
  const fetchExigences = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allautreEx");
      setExigences(response.data.data); // تأكد إلي `data` هو المفتاح الصحيح
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des exigences :", error);
    }
  };

  fetchExigences();
}, []);
 // 1. Pour les domaines
const [domainesParSecteur, setDomainesParSecteur] = useState({});
const fetchDomainesBySecteur = async (secteurId) => {
  if (domainesParSecteur[secteurId]) return;
  try {
    const res = await axios.get(`http://localhost:5000/api/auth/domaines/bySecteur/${secteurId}`);
    setDomainesParSecteur(prev => ({
      ...prev,
      [secteurId]: res.data,
    }));
  } catch (error) {
    console.error("Erreur chargement domaines du secteur :", error);
  }
};
const Comparedomaine = (domaineId, secteurId) => {
  const domaines = domainesParSecteur[secteurId];
  if (!domaines) {
    fetchDomainesBySecteur(secteurId);
    return "Chargement domaine...";
  }
  const domaine = domaines.find((d) => d._id === domaineId);
  return domaine ? domaine.nom : "Domaine inconnu";
};

//////////////////////


const calculerConformitesSansDoublon = () => {
  const conformites = { C: 0, NC: 0, AV: 0 };
  const idsComptes = new Set();

  // checkedTextes (textes normaux cochés)
  checkedTextes.forEach((texte) => {
    if (!idsComptes.has(texte._id)) {
      const conf = texte.conformite || "Non défini";
      if (conf === "C") conformites.C += 1;
      else if (conf === "NC") conformites.NC += 1;
      else if (conf === "AV") conformites.AV += 1;
      idsComptes.add(texte._id);
    }
  });

  // textesExigence (textes exigence cochés)
  textesExigence.forEach((texte) => {
    if (!idsComptes.has(texte._id)) {
      const conf = texte.conformiteE || "Non défini";
      if (conf === "C") conformites.C += 1;
      else if (conf === "NC") conformites.NC += 1;
      else if (conf === "AV") conformites.AV += 1;
      idsComptes.add(texte._id);
    }
  });

  // data (allmesEx)
  data.forEach((item) => {
    if (!idsComptes.has(item._id)) {
      if (item.conformite === "C") conformites.C += 1;
      else if (item.conformite === "NC") conformites.NC += 1;
      else if (item.conformite === "AV") conformites.AV += 1;
      idsComptes.add(item._id);
    }
  });

  // exigences (allautreEx)
  exigences.forEach((item) => {
    if (!idsComptes.has(item._id)) {
      if (item.statut === "C") conformites.C += 1;
      else if (item.statut === "NC") conformites.NC += 1;
      else if (item.statut === "AV") conformites.AV += 1;
      idsComptes.add(item._id);
    }
  });

  return conformites;
};


const conformites = calculerConformitesSansDoublon();

const pieData = [
  { name: "Conforme", value: conformites.C, color: "#5b8750" },
  { name: "Non conforme", value: conformites.NC, color: "#D9DEDA" },
  { name: "À vérifier", value: conformites.AV, color: "#d9a500" },
];

////////////////////

const totalTextesCoches = checkedTextes.length;

const colors = ["#5c7f4e", "#f7e095","#d09e00", "#203828" ,"#d8dbd8"
];


const TextesDomaine = () => {
  const counts = {};
  const domainesNames = {};

  checkedTextes.forEach((texte) => {
    const domaineId = texte.domaine;
    const secteurId = texte.secteur;

    if (domaineId) {
      counts[domaineId] = (counts[domaineId] || 0) + 1;

      // احفظ اسم الدومين باش ما تعاودش تنادي Comparedomaine
      if (!domainesNames[domaineId]) {
        domainesNames[domaineId] = Comparedomaine(domaineId, secteurId);
      }
    }
  });

  return Object.entries(counts).map(([domaineId, value], index) => ({
    name: domainesNames[domaineId] || "Inconnu",
    value,
    color: colors[index % colors.length],
  }));
};

const [TextesDomaineData, setTextesDomaineData] = useState([]);

useEffect(() => {
  setTextesDomaineData(TextesDomaine());
}, [checkedTextes]);

   const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions();
  }, []);

const fetchActions = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/actionall");
    const actions = response.data;
    setActions(actions);
  } catch (err) {
    console.error("Erreur lors du chargement des actions :", err);
  }
};
const [groupedBarData, setGroupedBarData] = useState({}); // domaineId => [{ name, value, fill }]
const [domainesNoms, setDomainesNoms] = useState({});     // domaineId => nom domaine


useEffect(() => {
  if (checkedTextes.length === 0 || actions.length === 0) return;

  const groupes = {};
  const nomsDomaines = {};

  checkedTextes.forEach((texte) => {
    const domaineId = texte.domaine;
    const secteurId = texte.secteur;

    if (!groupes[domaineId]) {
      groupes[domaineId] = {
        applicables: 0,
        conformes: 0,
        nonConformes: 0,
        aVerifier: 0,
        actionsNonValidees: 0,
      };
    }

    groupes[domaineId].applicables += 1;

    if (texte.conformite === "C") groupes[domaineId].conformes += 1;
    else if (texte.conformite === "NC") groupes[domaineId].nonConformes += 1;
    else if (texte.conformite === "AV") groupes[domaineId].aVerifier += 1;

    // 🏷️ Préparer le nom du domaine
    if (!nomsDomaines[domaineId]) {
      const nom = Comparedomaine(domaineId, secteurId);
      nomsDomaines[domaineId] = nom;
    }
  });

  // 🔍 ربط actions بال domaine متاع texteExigence
  actions.forEach((action) => {
    if (!action.validation && action.texteExigence) {
const texte = checkedTextes.find(t => t._id === action.texteExigence) ||
              textesExigence.find(t => t._id === action.texteExigence);
      if (texte && texte.domaine) {
        const domaineId = texte.domaine;
        if (groupes[domaineId]) {
          groupes[domaineId].actionsNonValidees += 1;
        } else {
          groupes[domaineId] = {
            applicables: 0,
            conformes: 0,
            nonConformes: 0,
            aVerifier: 0,
            actionsNonValidees: 1,
          };
        }
      }
    }
  });

  // 📊 تجهيز البيانات لعرضها
  const chartDataParDomaine = {};

  for (const domaineId in groupes) {
    chartDataParDomaine[domaineId] = [
      { name: "Textes applicables", value: groupes[domaineId].applicables, fill: "#2e4731" },
      { name: "Textes conformes", value: groupes[domaineId].conformes, fill: "#56c16f" },
      { name: "Textes non conformes", value: groupes[domaineId].nonConformes, fill: "#d9a500" },
      { name: "Textes à vérifier", value: groupes[domaineId].aVerifier, fill: "#f7e393" },
      { name: "Actions non validées", value: groupes[domaineId].actionsNonValidees, fill: "#FFF761" },
    ];
  }

  setGroupedBarData(chartDataParDomaine);
  setDomainesNoms(nomsDomaines);
}, [checkedTextes, actions]);


   
  return (
    <>
      <div className="dashboard-charts-wrapper">
      <div className="first-line">
    <div className="domaines-box">
  <h2 className="domaines-title">Domaine acquis</h2>
  <div className="domaines-list">
    {Array.isArray(checkedTextes) &&
      [...new Set(checkedTextes.map((texte) =>
        Comparedomaine(texte.domaine, texte.secteur)
      ))].map((nom, index) => (
        <div key={index} className="domaine-item">{nom || "---"}</div>
      ))
    }
  </div>
  <div className="autres-domaines">+ Autres domaines</div>
</div>


  <div className="pie-chart-container2">
    <div className="pie-chart-title">Textes</div>
    <div className="pie-chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={TextesDomaineData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={45}
            dataKey="value"
            labelLine={false}
          >
            {TextesDomaineData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: "#000", fontSize: 14 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="centered-text">{totalTextesCoches}</div>
    </div>
  </div>

  <div className="pie-chart-container">
    <div className="pie-chart-title">Conformité générale</div>
    <div className="pie-chart-wrapper2">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="40%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: "#000", fontSize: 18, marginLeft: 10 }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

<div className="second-line">
{Object.entries(groupedBarData).map(([domaineId, data]) => (
  <div key={domaineId} className="bar-chart-container">
    <div className="bar-chart-title">{domainesNoms[domaineId] || "Statistiques"}</div>
    <div className="bar-chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" interval={0} angle={-25} textAnchor="end" tick={{ fill: "#000", fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" barSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
))}

        </div>
      </div>
      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>

    </>
  );
};

export default DashboardR;
