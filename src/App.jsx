import "./app.css";
import Dashboard from "./componentes/dashboard";
import MenuLateral from "./componentes/menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ordens from "./componentes/PageOrdem/ordens";
import Tecnicos from "./componentes/tecnicos";
import Empresas from "./componentes/empresas";
import OrdemDetalhe from "./componentes/PageOrdem/OrdemDetalhe";
import React, { useEffect, useState } from "react";
import NewOrdem from "./componentes/NewOrdem";

function App() {
  const [empresas, setEmpresas] = useState([]);
  const [ordens, setOrdens] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tecnicos")
      .then((res) => res.json())
      .then(setTecnicos)
      .catch((err) => console.error("Erro ao buscar técnicos:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/ordens")
      .then((res) => res.json())
      .then(setOrdens)
      .catch((err) => console.error("Erro ao buscar ordens:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/empresas")
      .then((res) => res.json())
      .then(setEmpresas)
      .catch((err) => console.error("Erro ao buscar empresas:", err));
  }, []);

  const adicionarOrdem = (novaOrdem) => {
    fetch("http://localhost:8080/ordens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaOrdem),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao criar ordem");
        return res.json();
      })
      .then((ordemCriada) => {
        setOrdens([...ordens, ordemCriada]);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Router>
      {/* Menu fixo à esquerda */}
      <MenuLateral />

      {/* Área principal com scroll e margem lateral */}
      <div className="ml-64 h-screen overflow-y-auto bg-slate-50 p-4">
        <Routes>
          <Route path="/" element={<Dashboard ordens={ordens} />} />
          <Route
            path="/ordens"
            element={
              <Ordens ordens={ordens} empresas={empresas} tecnicos={tecnicos} />
            }
          />
          <Route path="/tecnicos" element={<Tecnicos />} />
          <Route path="/empresas" element={<Empresas empresas={empresas} />} />
          <Route path="/ordens/:id" element={<OrdemDetalhe />} />
          <Route
            path="/newOrdem"
            element={
              <NewOrdem
                adicionarOrdem={adicionarOrdem}
                empresas={empresas}
                tecnicos={tecnicos}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
