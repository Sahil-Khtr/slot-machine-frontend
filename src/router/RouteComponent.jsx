import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/home/Home";

// Define your routes
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
];

// export const excludeRoutes = [
//   {
//     path: "/profile",
//     element: <ProfilePage />,
//   },
//   {
//     path: "/settings",
//     element: <SettingsPage />,
//   },
// ];

// Map routes to Route components
const list = routes.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));

// const exList = excludeRoutes.map((route, index) => (
//   <Route key={index} path={route.path} element={route.element} />
// ));

// Render the Routes component with the mapped Route components
const RouteComponent = () => (
  <>
    <Routes>{list}</Routes>
    {/* <Routes>{exList}</Routes> */}
  </>
);

export default RouteComponent;
