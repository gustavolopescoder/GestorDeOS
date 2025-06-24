import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";

function Ordens() {
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  // Os valores padrão têm que ser os mesmos dos <option value="...">
  const [empresaSelecionada, setEmpresaSelecionada] = useState("todas");
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState("todos");

  useEffect(() => {
    // Carregar empresas e técnicos
    fetch("http://localhost:8080/empresas")
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch((err) => console.error("Erro ao buscar empresas:", err));

    fetch("http://localhost:8080/tecnicos")
      .then((res) => res.json())
      .then((data) => setTecnicos(data))
      .catch((err) => console.error("Erro ao buscar técnicos:", err));
  }, []);

  useEffect(() => {
    // Monta URL com filtros, se houver
    let url = "http://localhost:8080/ordens";
    const params = [];

    if (empresaSelecionada && empresaSelecionada !== "todas") {
      params.push(`empresa_id=${empresaSelecionada}`);
    }

    if (tecnicoSelecionado && tecnicoSelecionado !== "todos") {
      params.push(`tecnico_id=${tecnicoSelecionado}`);
    }

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    console.log("Buscando ordens com URL:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrdens(data))
      .catch((err) => console.error("Erro ao buscar ordens:", err));
  }, [empresaSelecionada, tecnicoSelecionado]);

  return (
    <div className="p-4 bg-white rounded shadow max-w-5xl mx-auto">
      <div id="header" className="flex items-center gap-3 font-medium mb-4">
        <CgNotes className="text-5xl text-blue-700" />
        <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
      </div>

      <div
        id="filtros"
        className="flex flex-col gap-4 p-4 border w-full rounded-md shadow-xl"
      >
        <div id="headerFilter" className="flex items-center gap-3">
          <CiFilter className="text-3xl text-blue-700" />
          <h1>Filtros</h1>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Buscar por OS, Serviço ou Técnico (em breve)"
            className="border px-2 py-1 rounded w-1/2"
            disabled
          />
          <select
            onChange={(e) => setEmpresaSelecionada(e.target.value)}
            value={empresaSelecionada}
            className="border px-2 py-1 rounded"
          >
            <option value="todas">Todas as Empresas</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nome}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setTecnicoSelecionado(e.target.value)}
            value={tecnicoSelecionado}
            className="border px-2 py-1 rounded"
          >
            <option value="todos">Todos os Técnicos</option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.id}>
                {tecnico.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="shadow-xl p-4 mt-4 rounded-md border">
        {ordens.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">
            Nenhuma ordem de serviço encontrada.
          </p>
        ) : (
          <div>
            <table className="w-full border-collapse border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Data</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Técnico
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Empresa
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Horário
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Remoto / Local
                  </th>
                  <th className="border border-gray-300 p-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {ordens.map((ordem) => {
                  const dataCriacao = ordem.data_criacao
                    ? new Date(ordem.data_criacao).toLocaleDateString("pt-BR")
                    : "-";

                  return (
                    <tr key={ordem.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">
                        {dataCriacao}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {ordem.tecnico_nome ?? "Técnico não encontrado"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {ordem.empresa_nome ?? "Empresa não encontrada"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {ordem.hora_inicio ?? "-"} - {ordem.hora_fim ?? "-"}
                      </td>
                      <td className="border border-gray-300 p-2 capitalize">
                        {ordem.local ?? "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => navigate(`/ordens/${ordem.id}`)}
                          className="text-blue-600 underline"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ordens;
