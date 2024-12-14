import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Banner from "./components/Banner.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProjectFormPage from "./pages/ProjectFormPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import PledgePage from "./pages/PledgePage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import "./styles.css";

const AppLayout = () => {
  return (
    <div className="app-container">
      <Banner />
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "project/:id", element: <ProjectPage /> },
      { path: "users", element: <SignUpPage /> },
      { path: "newproject", element: <ProjectFormPage /> },
      { path: "pledge", element: <PledgePage />}
    ],
  },
]);      

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />      
    </AuthProvider>
  </React.StrictMode>
);