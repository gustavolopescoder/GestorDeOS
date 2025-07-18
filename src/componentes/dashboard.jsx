import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GoAlertFill, GoClockFill } from "react-icons/go";

function Dashboard() {
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState([]);
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();

  useEffect(() => {
    fetch("http://localhost:8080/ordens")
      .then((res) => res.json())
      .then((data) => setOrdens(data))
      .catch((err) => console.error("Erro ao buscar ordens:", err));
  }, []);

  const abrirNovaOS = () => navigate("/newordem");

  const chamadosMesAtual = ordens.filter((c) => {
    const dataChamado = new Date(c.data_criacao);
    return (
      dataChamado.getMonth() === mesAtual &&
      dataChamado.getFullYear() === anoAtual
    );
  });

  const contagemEmpresas = {};
  chamadosMesAtual.forEach((c) => {
    const empresa = c.empresa_nome ?? "Desconhecida";
    contagemEmpresas[empresa] = (contagemEmpresas[empresa] || 0) + 1;
  });

  const ranking = Object.entries(contagemEmpresas)
    .map(([empresa, total]) => ({ empresa, total }))
    .sort((a, b) => b.total - a.total);

  const ordensRecentes = [...ordens]
    .sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao))
    .slice(0, 5);

  return (
    <div className="w-full h-full p-2 space-y-6 rounded">
      <div id="header" className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-medium text-3xl">Dashboard</h1>
        </div>
        <button
          onClick={abrirNovaOS}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-md font-medium text-white transform hover:shadow-lg hover:shadow-blue-500/50 transition duration-300"
        >
          Abrir OS
        </button>
      </div>

      {/* Ranking por empresa */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GoAlertFill className="text-red-600" />
          Empresas com mais chamados no mês de{" "}
          {dataAtual.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        {ranking.length === 0 ? (
          <p className="text-gray-500">Nenhum chamado registrado este mês.</p>
        ) : (
          <ul className="space-y-3">
            {ranking.map(({ empresa, total }, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-3 py-2 rounded-md ${
                  index === 0
                    ? "bg-red-100 font-semibold"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span>{empresa}</span>
                <span className="text-blue-700 font-bold">
                  {total} chamado(s)
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ordens recentes */}
      <div className="bg-white shadow-2xl p-4 rounded-md">
        <div className="flex items-center gap-2 mb-4">
          <GoClockFill className="text-blue-600" />
          <h1 className="text-xl font-bold">Ordens Recentes</h1>
        </div>

        {ordensRecentes.length === 0 ? (
          <p className="text-gray-500">Nenhuma ordem registrada.</p>
        ) : (
          <ul className="space-y-2">
            {ordensRecentes.slice(0, 3).map((ordem) => (
              <li
                key={ordem.id}
                className="border-b pb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{ordem.empresa_nome}</p>
                  <p className="text-sm text-gray-500">
                    {ordem.tecnico_nome} -{" "}
                    {new Date(ordem.data_criacao).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/ordens/${ordem.id}`)}
                  className="text-blue-600 text-sm"
                >
                  Ver
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
