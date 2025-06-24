import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewOrdem({ empresas = [], tecnicos = [] }) {
  const hoje = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const [empresaId, setEmpresaId] = useState("");
  const [tecnicoId, setTecnicoId] = useState("");
  const [ordens, setOrdens] = useState([]);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [solicitado, setSolicitado] = useState("");
  const [prestado, setPrestado] = useState("");
  const [local, setLocal] = useState("");
  const [dataCriacao, setDataCriacao] = useState(hoje);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !empresaId ||
      !tecnicoId ||
      !horaInicio ||
      !horaFim ||
      !dataInicio ||
      !dataFim ||
      !solicitado ||
      !prestado ||
      !local
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaOrdem = {
      empresa_id: Number(empresaId),
      tecnico_id: Number(tecnicoId),
      hora_inicio: horaInicio,
      hora_fim: horaFim,
      data_inicio: dataInicio,
      data_fim: dataFim,
      solicitado,
      prestado,
      local,
      data_criacao: dataCriacao,
    };

    console.log("Nova ordem enviada:", novaOrdem);
    fetch("http://localhost:8080/ordens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaOrdem),
    })
      .then(async (res) => {
        if (!res.ok) {
          // tenta ler o corpo da resposta para mostrar o erro detalhado
          let errorMsg = "Erro ao criar ordem";
          try {
            const data = await res.json();
            if (data.message) errorMsg = data.message;
            else errorMsg = JSON.stringify(data);
          } catch {
            try {
              errorMsg = await res.text();
            } catch {}
          }
          throw new Error(errorMsg);
        }
        return res.json();
      })
      .then(() => {
        alert("Ordem criada com sucesso!");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 px-4 py-6 w-full overflow-y-auto">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6">Nova Ordem de Serviço</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-6"
        >
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Informações Básicas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Número da OS</label>
                <p className="w-full bg-gray-200 rounded p-2 border">
                  {ordens.length + 4}
                </p>
              </div>
              <div>
                <label>Empresa</label>
                <select
                  value={empresaId}
                  onChange={(e) => setEmpresaId(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Selecione a empresa</option>
                  {empresas.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Técnico Responsável</label>
                <select
                  value={tecnicoId}
                  onChange={(e) => setTecnicoId(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Selecione o técnico</option>
                  {tecnicos.map((tec) => (
                    <option key={tec.id} value={tec.id}>
                      {tec.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Remoto / Local</label>
                <select
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Selecione...</option>
                  <option value="remoto">Remoto</option>
                  <option value="local">Local</option>
                </select>
              </div>
            </div>
          </div>

          {/* Datas e horários */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Datas e Horários
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Data de Início</label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label>Data de Término</label>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label>Horário de Entrada</label>
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label>Horário de Saída</label>
                <input
                  type="time"
                  value={horaFim}
                  onChange={(e) => setHoraFim(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label>Data do Chamado</label>
                <input
                  type="date"
                  value={dataCriacao}
                  onChange={(e) => setDataCriacao(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* Descrição dos Serviços */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Descrição dos Serviços
            </h2>
            <div>
              <label>Serviço Solicitado</label>
              <textarea
                value={solicitado}
                onChange={(e) => setSolicitado(e.target.value)}
                className="border p-2 rounded w-full"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label>Serviço Prestado</label>
              <textarea
                value={prestado}
                onChange={(e) => setPrestado(e.target.value)}
                className="border p-2 rounded w-full"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Botão */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Criar Ordem de Serviço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewOrdem;
