import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
