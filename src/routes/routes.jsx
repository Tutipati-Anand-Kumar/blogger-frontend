import { createBrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import CreateArticle from "../components/CreateArticle";
import Profile from "../components/Profile";
import About from "../components/About";
import Notification from "../components/Notification";


const routes = createBrowserRouter([
  {
    path:'/',
    element:<PrivateRoute><Home></Home></PrivateRoute>
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-article",
    element: 
    <PrivateRoute>
      <CreateArticle />
    </PrivateRoute>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/notifications",
    element:<Notification/>
  }

]);

export default routes;
