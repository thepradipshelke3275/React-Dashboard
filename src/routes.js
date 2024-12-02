import React from "react";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import ForgotPassword from "views/examples/ForgotPassword";
import UpdatePassword from "views/examples/UpdatePassword";
import Login from "views/examples/Login.js";

const Users = React.lazy(() => import("./pages/users/Users"));
const Device = React.lazy(() => import("./pages/device/Device"));
const Location = React.lazy(() => import("./pages/location/Location"));
const Sensor = React.lazy(() => import("./pages/sensor/Sensor"));
const Alert = React.lazy(() => import("./pages/alert/Alert"));
const Logs = React.lazy(() => import("./pages/logs-page/Logs"));
const Report = React.lazy(() => import("./pages/report/Report"));
const Lead = React.lazy(() => import("./pages/lead/Lead"));


const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "ni ni-bullet-list-67 text-red",
    component: Location,
    layout: "/admin",
  },
  {
    path: "/device",
    name: "Device",
    icon: "ni ni-bullet-list-67 text-red",
    component: Device,
    layout: "/admin",
  },
  {
    path: "/sensor",
    name: "Sensor",
    icon: "ni ni-bullet-list-67 text-red",
    component: Sensor,
    layout: "/admin",
  },
  {
    path: "/alert",
    name: "Alert",
    icon: "ni ni-bullet-list-67 text-red",
    component: Alert,
    layout: "/admin",
  },
  {
    path: "/logs",
    name: "Log",
    icon: "ni ni-bullet-list-67 text-red",
    component: Logs,
    layout: "/admin",
  },
  {
    path: "/lead",
    name: "Lead",
    icon: "ni ni-bullet-list-67 text-red",
    component: Lead,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Report",
    icon: "ni ni-bullet-list-67 text-red",
    component: Report,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "/auth",
  },
  {
    path: "/update-password",
    name: "Update Password",
    icon: "ni ni-circle-08 text-pink",
    component: UpdatePassword,
    layout: "/auth",
  },
];
export default routes;
