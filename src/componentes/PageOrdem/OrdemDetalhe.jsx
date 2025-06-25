import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function OrdemDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ordemDetalhe, setOrdemDetalhe] = useState(null);

  // Calcula a duração entre dois horários no formato "HH:MM:SS"
  const calcularDuracao = (horaInicio, horaFim) => {
    const [h1, m1, s1] = horaInicio.split(":").map(Number);
    const [h2, m2, s2] = horaFim.split(":").map(Number);

    const inicioSegundos = h1 * 3600 + m1 * 60 + s1;
    const fimSegundos = h2 * 3600 + m2 * 60 + s2;

    const diffSegundos = fimSegundos - inicioSegundos;
    if (diffSegundos < 0) return "Horário inválido";

    const horas = Math.floor(diffSegundos / 3600);
    const minutos = Math.floor((diffSegundos % 3600) / 60);

    return `${horas}h ${minutos}min`;
  };

  function formatarDataISO(isoString) {
    const data = new Date(isoString);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    fetch(`http://localhost:8080/ordens/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ordem não encontrada");
        return res.json();
      })
      .then(setOrdemDetalhe)
      .catch((err) => {
        console.error("Erro ao buscar ordem:", err);
        navigate("/ordens");
      });
  }, [id, navigate]);

  if (!ordemDetalhe) return <p>Carregando...</p>;

  const duracao = calcularDuracao(
    ordemDetalhe.hora_inicio,
    ordemDetalhe.hora_fim
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8">
        {/* Header: Logo e Nome da Empresa */}
        <header className="flex items-center gap-4 border-b pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              Novo Nivel Informatica
            </h1>
            <p className="text-gray-600 text-sm">Ordem de Serviço Detalhada</p>
          </div>
        </header>

        {/* Corpo da Ordem */}
        <section className="space-y-4 text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Empresa:</span>
            <span>{ordemDetalhe.empresa_nome || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Técnico:</span>
            <span>{ordemDetalhe.tecnico_nome || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Data de Criação:</span>
            <span>{formatarDataISO(ordemDetalhe.data_criacao) || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Data de Início:</span>
            <span>{formatarDataISO(ordemDetalhe.data_inicio) || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Data de Fim:</span>
            <span>{formatarDataISO(ordemDetalhe.data_fim) || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Hora de Início:</span>
            <span>{ordemDetalhe.hora_inicio || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Hora de Fim:</span>
            <span>{ordemDetalhe.hora_fim || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tempo de Serviço:</span>
            <span>{duracao}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Local:</span>
            <span>{ordemDetalhe.local || "N/A"}</span>
          </div>
          <div>
            <p className="font-semibold mb-1">Serviço Solicitado:</p>
            <p className="bg-gray-100 p-3 rounded">
              {ordemDetalhe.solicitado || "N/A"}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">Serviço Prestado:</p>
            <p className="bg-gray-100 p-3 rounded">
              {ordemDetalhe.prestado || "N/A"}
            </p>
          </div>
        </section>

        {/* Rodapé - botão de voltar */}
        <footer className="mt-8 text-right">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Voltar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default OrdemDetalhe;
