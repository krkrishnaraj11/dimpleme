import Index from "./pages/Index.js";
import Profile from "./pages/Profile.js";
import Group from "./pages/Group.js";
import {Login} from "./pages/login";

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/group",
    name: "Group",
    icon: "ni ni-badge text-red",
    component: Group,
    layout: "/admin"
  },
  {
    path: "/survey",
    name: "Survey",
    icon: "ni ni-bullet-list-67 text-green",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth" 
  }
];

export default routes