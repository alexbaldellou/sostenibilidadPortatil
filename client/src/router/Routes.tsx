import { Routes, Route } from "react-router-dom";
import App from "../App";
import { Dashboard } from "../components/dashboard/Dashboard";
const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
};

export default RoutesApp;
