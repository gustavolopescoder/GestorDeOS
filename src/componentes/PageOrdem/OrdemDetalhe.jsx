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
    <div className="flex flex-col bg-white rounded-md w-full h-full p-4 space-y-3">
      <div id="header" className="flex items-center justify-center relative">
        <h1 className="text-2xl">Detalhes da Ordem #{ordemDetalhe.id}</h1>
        <button
          onClick={() => navigate("/ordens")}
          className="absolute right-0 font-bold"
        >
          X
        </button>
      </div>
      <div className="flex font-medium space-y-2 bg-slate-50 p-4 rounded-md flex-wrap gap-3">
        <p className="w-full">Empresa: {ordemDetalhe.empresa_nome}</p>
        <p className="w-full">Técnico: {ordemDetalhe.tecnico_nome}</p>
        <p>
          Data de Criação:{" "}
          {new Date(ordemDetalhe.data_criacao).toLocaleDateString("pt-BR")}
        </p>

        <p>
          Data de Início:{" "}
          {new Date(ordemDetalhe.data_inicio).toLocaleDateString("pt-BR")}
        </p>
        <p>
          Data de Fim:{" "}
          {new Date(ordemDetalhe.data_fim).toLocaleDateString("pt-BR")}
        </p>
        <p>Hora de Início: {ordemDetalhe.hora_inicio}</p>
        <p className="w-full">Hora de Fim: {ordemDetalhe.hora_fim}</p>
        <p>Tempo de Serviço: {duracao}</p>
        <p>Local: {ordemDetalhe.local}</p>
        <p className="w-full">Serviço Solicitado: {ordemDetalhe.solicitado}</p>
        <p className="w-full">Serviço Prestado: {ordemDetalhe.prestado}</p>
      </div>{" "}
    </div>
  );
}

export default OrdemDetalhe;
