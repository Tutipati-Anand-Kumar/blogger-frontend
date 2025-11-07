import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
