import "./app.css";
import MenuLateral from "./componentes/menu";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AnimatedRoutes from "./componentes/AnimatedRoutes"; // novo arquivo

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
      <MenuLateral />
      <div className="sm:ml-64 h-screen overflow-y-auto bg-slate-50 p-4 transition-all duration-300">
        <AnimatedRoutes
          ordens={ordens}
          empresas={empresas}
          tecnicos={tecnicos}
          adicionarOrdem={adicionarOrdem}
        />
      </div>
    </Router>
  );
}

export default App;
