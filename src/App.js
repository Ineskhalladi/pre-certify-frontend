import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Forget from "./components/Forget";
import ResetPwd from "./components/ResetPwd";
import ContactUs from "./pages/ContactUs";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2.js";
import NavBar3 from "./components/NavBar3.js";
import NavBar4 from "./components/NavBar4.js";
import NavBar5 from "./components/NavBar5.js";

import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard"; 
import BaseGenerale from "./pages/BaseGenerale";
import Home from "./pages/Home";
import EmailVerification from "./components/EmailVerification";
import VeilleReg from "./pages/VeilleReg";
import Normes from "./pages/Normes";
import TexteInfo from "./pages/TexteInfo";
import TexteApp from "./pages/TexteApp";
import ConformeV from "./pages/ConformeV";
import PlanActionV from "./pages/PlanActionV";
import MonCompte from "./pages/MonCompte";
import AjouterResponsable from "./pages/AjouterResponsable";
import AjouterService from "./pages/AjouterService";
import MesResponsables from "./pages/MesResponsables";
import MesServices from "./pages/MesServices";
import MesUtilisateurs from "./pages/MesUtilisateurs";
import MesExigences from "./pages/MesExigences";
import ConformeE from "./pages/ConformeE";
import PlanActionE from "./pages/PlanActionE";
import Monitoring from "./pages/Monitoring";
import StatistiquesV from "./pages/StatistiquesV";
import EditerService from "./pages/EditerService";
import EditerResponsable from "./pages/EditerResponsable";
import StatistiquesE from "./pages/StatistiquesE";
import Textes from "./pages/Textes.js";
import AjouteTexte from "./pages/AjouteTexte.js";
import EditTexte from "./pages/EditTexte.js";
import Auditeur from "./pages/Auditeur.js";
import AjouteAuditeur from "./pages/AjoutAuditeur.js";
import EditAuditeur from "./pages/EditAuditeur.js";
import ListeDesDemandes from "./pages/ListeDesDemandes.js";
import ListeEntreprises from "./pages/ListeEnreprises.js";
import DashboardS from "./pages/DashboardS.js"; 
import CocherTexte from "./pages/CocherTexte.js"
import Certificate from "./pages/Certificate.js"
import ChoixEntr from "./components/ChoixEntr.js"
import Sante from "./pages/Sante.js"
import Infor from "./pages/Infor.js"
import Gestion from "./pages/Gestion.js";
import Securité from "./pages/Securité.js";
import Message from "./pages/Message.js";
import Transport from "./pages/Transport.js";
import Energie from "./pages/Energie.js";
import Diversite from "./pages/Diversite.js";
import Durabilite from "./pages/Durabilite.js";
import Alimentation from "./pages/Alimentation.js";
import Materiaux from "./pages/Materiaux.js";
import Batiment from "./pages/Batiment.js";
import Ingenierie from "./pages/Ingenierie.js";
import DashboardEn from "./pages/DashboardEn.js";
import TexteAppEn from "./pages/TexteAppEn.js";
import ConformeEn from "./pages/ConformeEn.js";
import PlanActionEn from "./pages/PlanActionEn.js";
import StatistiquesEn from "./pages/StatistiquesEn.js";
import Action from "./pages/Action.js";
import AjoutAction from "./pages/AjoutAction.js";
import EditAction from "./pages/EditAction.js";
import PlanActionR from "./pages/PlanActionR.js";
import DashboardR from "./pages/DashboardR.js";
import TexteAppRes from "./pages/TexteAppRes.js";
import ConformeR from "./pages/ConformeR.js";
import StatistiquesR from "./pages/StatistiquesR.js";
import MonitoringEn from "./pages/MonitoringEn.js";
import MonitoringR from "./pages/MonitoringR.js";

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  // Pages auth
  const isAuthPage = ["/signin", "/signup", "/forget", "/resetpwd","/choixentr"].includes(path) || path.startsWith("/verify");

  // Pages تظهر فيهم Navbar3 فقط
  const isNavbar3Page = path.startsWith("/editetexte/") || 
  ["/textes",  "/ajoutetexte","/auditeur"
  ,"/ajouteauditeur","/editauditeur/:id","/listedesdemandes","/listeentreprises"
  ,"/dashboards","/message"].includes(path);

 // Pages تظهر فيهم Navbar4 فقط
 const isNavbar4Page = path.startsWith("/editerresponsable") || 
 ["/textesE", "/mesresponsables", "/ajouterresponsable","/cochertexte",
  "/dashboardEn","/texteappEn","/conformeEn","/planactionEn","/statistiquesEn","/monitoringEn"].includes(path);

 // Pages تظهر فيهم Navbar5 فقط
 const isNavbar5Page = path.startsWith("/editerservice/") || 
 ["/messervices", "/ajouterservice","/planactionr","/dashboardR", 
"/texteappR","/conformeR","/statistiquesR","/monitoringR" ].includes(path);

  // Pages يظهر فيهم Navbar + Footer فقط
  const isNavbarFooterPage = ["/home","/normes", "/","/veillereg", "/contact","/certificate","/sante"
    ,"/infor","/gestion","/securite","/transport","/energie","/diversite","/durabilite","/alimentation",
"/materiaux","/batiment","/ingenierie"].includes(path);

  // Pages يظهر فيهم Navbar2 فقط
  const isNavbar2Page = !isAuthPage && !isNavbar3Page && !isNavbarFooterPage && !isNavbar4Page && !isNavbar5Page ;

  return (
    <>
      {/* Navbar3 */}
      {isNavbar3Page && <NavBar3 />}

       {/* Navbar4 */}
       {isNavbar4Page && <NavBar4 />}

       {/* Navbar5 */}
       {isNavbar5Page && <NavBar5 />}

      {/* Navbar + Footer */}
      {isNavbarFooterPage && <NavBar />}
      {isNavbar2Page && <NavBar2 />}

      <Routes>
        {/* Routes ici comme dans ton code */}
        <Route path="/home" element={<Home />} />
        <Route path="/normes" element={<Normes />} />
        <Route path="/veillereg" element={<VeilleReg />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:token" element={<EmailVerification />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/resetpwd" element={<ResetPwd />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/basegenerale" element={<BaseGenerale />} />
        <Route path="/texteinfo" element={<TexteInfo />} />
        <Route path="/texteapp" element={<TexteApp />} />
        <Route path="/conformev" element={<ConformeV />} />
        <Route path="/planactionv" element={<PlanActionV />} />
        <Route path="/moncompte" element={<MonCompte />} />
        <Route path="/ajouterresponsable" element={<AjouterResponsable />} />
        <Route path="/ajouterservice" element={<AjouterService />} />
        <Route path="/mesresponsables" element={<MesResponsables />} />
        <Route path="/messervices" element={<MesServices />} />
        <Route path="/mesutilisateurs" element={<MesUtilisateurs />} />
        <Route path="/mesexigences" element={<MesExigences />} />
        <Route path="/conformee" element={<ConformeE />} />
        <Route path="/planactione" element={<PlanActionE />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/statistiquesv" element={<StatistiquesV />} />
        <Route path="/editerservice/:id" element={<EditerService />} />
        <Route path="/editerresponsable/:id" element={<EditerResponsable />} />
        <Route path="/statistiquese" element={<StatistiquesE />} />
        <Route path="/textes" element={<Textes />} />
        <Route path="/ajoutetexte" element={<AjouteTexte />} />
        <Route path="/editetexte/:id" element={<EditTexte />} />
        <Route path="/" element={<Home />} />
        <Route path="/auditeur" element={<Auditeur />} />
        <Route path="/ajouteauditeur" element={<AjouteAuditeur />} />
        <Route path="/editauditeur/:id" element={<EditAuditeur/>} />
        <Route path="/listedesdemandes" element={<ListeDesDemandes/>} />
        <Route path="/listeentreprises" element={<ListeEntreprises/>} />
        <Route path="/dashboards" element={<DashboardS />} />
        <Route path="/message" element={<Message />} />
        <Route path="/cochertexte" element={<CocherTexte />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/choixentr" element={<ChoixEntr />} />
        <Route path="/sante" element={<Sante />} />
        <Route path="/infor" element={<Infor />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/securite" element={<Securité />} />
        <Route path="/transport" element={<Transport/>} />
        <Route path="/energie" element={<Energie/>} />
        <Route path="/diversite" element={<Diversite/>} />
        <Route path="/durabilite" element={<Durabilite/>} />
        <Route path="/alimentation" element={<Alimentation/>} />
        <Route path="/materiaux" element={<Materiaux/>} />
        <Route path="/batiment" element={<Batiment/>} />
        <Route path="/ingenierie" element={<Ingenierie/>} />
        <Route path="/dashboardEn" element={<DashboardEn />} />
        <Route path="/texteappEn" element={<TexteAppEn />} />
        <Route path="/conformeEn" element={<ConformeEn />} />
        <Route path="/planactionEn" element={<PlanActionEn />} />
        <Route path="/statistiquesEn" element={<StatistiquesEn />} />
        <Route path="/action" element={<Action />} />
        <Route path="/ajoutaction" element={<AjoutAction />} />
        <Route path="/editaction/:id" element={<EditAction/>} />
        <Route path="/planactionR" element={<PlanActionR />} />
        <Route path="/dashboardR" element={<DashboardR />} />
        <Route path="/texteappR" element={<TexteAppRes />} />
        <Route path="/conformeR" element={<ConformeR />} />
        <Route path="/statistiquesR" element={<StatistiquesR />} />
        <Route path="/monitoringEn" element={<MonitoringEn />} />
        <Route path="/monitoringR" element={<MonitoringR />} />

    
      </Routes>

      {/* Footer uniquement pour les pages où il y a NavBar classique */}
      {isNavbarFooterPage && <Footer />}
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
