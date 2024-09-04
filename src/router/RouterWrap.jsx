import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import BasicLayout from "../views/auth/layout/BasicLayout";
import MainLayout from "../views/layout/MainLayout";
import RouteComponent from "./RouteComponent";

const RouterWrap = () => {
  const routesForNotAuthenticatedOnly = [
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "*",
          element: <BasicLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },

            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      element: <PublicRoute />,
      children: [
        {
          path: "*",
          element: <MainLayout />,
          children: [<RouteComponent />],
        },
      ],
    },
  ];

  const routes = createBrowserRouter([
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
  ]);

  return <RouterProvider router={routes} />;
};

export default RouterWrap;
