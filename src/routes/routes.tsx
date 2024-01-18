import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AdminRoutes } from "./admin.routes";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: AdminRoutes,
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: AdminRoutes,
  },
  {
    path: "/student",
    element: <App></App>,
    children: AdminRoutes,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default route;
