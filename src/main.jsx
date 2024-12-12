import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProjectFormPage from "./pages/ProjectFormPage.jsx";

import NavBar from "./components/NavBar.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import PledgePage from "./pages/PledgePage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import "./styles.css";



const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/project/:id", element: <ProjectPage /> },
          { path: "/users", element: <SignUpPage /> },
          { path: "/projects", element: <ProjectPage /> },
          { path: "/newproject", element: <ProjectFormPage /> },
          { path: "/pledge", element: <PledgePage />}
      ],
  },
]);      
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* Here we wrap our app in the router provider so they render */}
    <AuthProvider>
    <RouterProvider router={router} />      
    </AuthProvider>
  </React.StrictMode>
);