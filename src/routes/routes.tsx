import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPath } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { facultyPath } from "./faculty.routes";
import { studentPath } from "./student.routes";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: routeGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: routeGenerator(facultyPath),
  },
  {
    path: "/student",
    element: <App></App>,
    children: routeGenerator(studentPath),
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
