/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Connexionp from './connexion/Connexion.tsx'
import Dashbord from './dashbord/Dashbord.tsx'
import AjoutProduit from './ajoutproduit/AjoutProduit.tsx'
import './index.css'
import Commande from './commande/Commande.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Dashbord />
  </React.StrictMode>,
)
*/


 

import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App';
import Dashbord from './dashbord/Dashbord';
import ListeProduit from './produit/ListeProduit';
import ListeProduitAr from './produit/ListeProduitArchive';
import HistoCmd from './historiquecommande/HistoCmd';
import {ListeCaissier }from './caissier/ListeCaissier';
import ListeCaissierAr from './caissier/ListeCaissierArchive';
import Commande from './commande/Commande';
import {DetailCommande} from './detail_commande/detailCommande';
import AjoutProduit from './produit/AjoutProduit';
import Connexionp from './connexion/Connexion';
import AjoutCaissier from './caissier/AjoutCaissier';


/* Routeur pour la navigation entre les différents interfaces */
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    { role == 'Caissier' && <Route path="/dashbord" element={<Dashbord />}>
      
        <Route index element={<Commande  />} />
        <Route path="Dcommande" element={<DetailCommande />} />

     </Route> }

     { role == 'Administrateur' && <Route path="/dashbord" element={<Dashbord />}>
        <Route path="listeproduit" element={<ListeProduit />} />
        <Route path="listeproduitArchive" element={<ListeProduitAr />} />
        <Route index element={<HistoCmd />} />
        <Route path="listecaissier" element={<ListeCaissier />} />
        <Route path="listecaissierArchive" element={<ListeCaissierAr />} />
        <Route path="commande" element={<Commande />} />
        <Route path="Dcommande" element={<DetailCommande />} />
        <Route path="ajouterproduit" element={<AjoutProduit />} />
        <Route path="ajoutercaissier" element={<AjoutCaissier />} />
     </Route> }
      <Route index element={<Connexionp />} />
      <Route path="*" element={<div>Not found</div>} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)