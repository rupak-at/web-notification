"use client";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/landingPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/dashboard";
import Hello from "./components/hello";
import MainLayout from "./components/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <LandingPage />}
        />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hello" element={<Hello />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
