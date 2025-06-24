import { useState, useEffect } from "react";
import NewOrdem from "../NewOrdem";

function NovaOrdemPage() {
  const [empresas, setEmpresas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/empresas").then((r) => r.json()),
      fetch("http://localhost:8080/tecnicos").then((r) => r.json()),
    ])
      .then(([empresasData, tecnicosData]) => {
        setEmpresas(empresasData || []);
        setTecnicos(tecnicosData || []);
      })
      .catch((err) => {
        console.error(err);
        setEmpresas([]);
        setTecnicos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return <NewOrdem empresas={empresas} tecnicos={tecnicos} />;
}

export default NovaOrdemPage;
