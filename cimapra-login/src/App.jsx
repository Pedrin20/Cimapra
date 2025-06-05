import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  // Verifica o localStorage quando o componente é montado
  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    setUsuarioLogado(!!usuario); // Converte para booleano
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/home"
        element={usuarioLogado ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;