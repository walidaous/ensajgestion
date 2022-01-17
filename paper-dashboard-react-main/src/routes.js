/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";

import Bloc from "./views/Bloc";
import Salle from "./views/Salle";
import Creneau from "./views/Creneau";
import Occupation from "./views/Occupation";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/Occupation",
    name: "Occupation",
    icon: "nc-icon nc-tile-56",
    component: Occupation,
    layout: "/admin",
  },
  {
    path: "/Salle",
    name: "Salle",
    icon: "nc-icon nc-caps-small",
    component: Salle,
    layout: "/admin",
  },
  {
    path: "/Bloc",
    name: "bloc",
    icon: "nc-icon nc-bold",
    component: Bloc,
    layout: "/admin",
  },
  {
    path: "/creneau",
    name: "creneau",
    icon: "nc-icon nc-spaceship",
    component: Creneau,
    layout: "/admin",
  },

];
export default routes;
