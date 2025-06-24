import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";

function Tecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [nomeNovoTecnico, setNomeNovoTecnico] = useState("");
  const [telefoneNovoTecnico, setTelefoneNovoTecnico] = useState("");
  const [modoAdicionar, setModoAdicionar] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Busca técnicos no backend ao montar componente
  useEffect(() => {
    fetch("http://localhost:8080/tecnicos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar técnicos");
        return res.json();
      })
      .then((data) => {
        const ordenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setTecnicos(ordenados);
        setCarregando(false);
      })
      .catch((err) => {
        alert(err.message);
        setCarregando(false);
      });
  }, []);

  const abrirAdicionar = () => {
    setNomeNovoTecnico("");
    setTelefoneNovoTecnico("");
    setModoAdicionar(true);
  };

  const adicionarTecnico = () => {
    if (!nomeNovoTecnico.trim()) {
      return alert("Nome do técnico é obrigatório");
    }

    fetch("http://localhost:8080/tecnicos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeNovoTecnico,
        telefone: telefoneNovoTecnico,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao adicionar técnico");
        return res.json();
      })
      .then((novo) => {
        setTecnicos((prev) =>
          [...prev, novo].sort((a, b) => a.nome.localeCompare(b.nome))
        );
        alert("Técnico adicionado com sucesso!");
        setModoAdicionar(false);
      })
      .catch((err) => alert(err.message));
  };

  const excluirTecnico = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este técnico?")) return;

    fetch(`http://localhost:8080/tecnicos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setTecnicos((prev) => prev.filter((t) => t.id !== id));
          alert("Técnico excluído com sucesso!");
        } else if (res.status === 404) {
          alert("Técnico não encontrado.");
        } else {
          throw new Error("Erro ao excluir técnico");
        }
      })
      .catch((err) => alert(err.message));
  };

  if (carregando) return <p>Carregando técnicos...</p>;

  return (
    <div className="bg-slate-50 w-full h-full p-4 space-y-6">
      <div id="header" className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <LuUser className="text-blue-600 text-5xl" />
          <h1 className="font-bold text-xl">Técnicos</h1>
        </div>

        <button
          onClick={abrirAdicionar}
          className="bg-gradient-to-r from-blue-500 to-blue-600  shadow p-2 rounded-md font-medium text-white transform hover:scale-105 transition duration-300"
        >
          + Novo Técnico
        </button>
      </div>

      {modoAdicionar && (
        <div className="bg-white p-4 rounded shadow space-y-3 max-w-md">
          <h2 className="text-lg font-semibold">Novo Técnico</h2>
          <input
            type="text"
            value={nomeNovoTecnico}
            onChange={(e) => setNomeNovoTecnico(e.target.value)}
            placeholder="Nome do técnico"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={telefoneNovoTecnico}
            onChange={(e) => setTelefoneNovoTecnico(e.target.value)}
            placeholder="Telefone (opcional)"
            className="border p-2 rounded w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={adicionarTecnico}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
            <button
              onClick={() => setModoAdicionar(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow max-w-lg">
        <ul className="space-y-1">
          {tecnicos.map((tecnico) => (
            <li
              key={tecnico.id}
              className="border-b p-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 p-3 border justify-between w-full rounded-md shadow">
                <div className="flex gap-2 w-64 h-32 p-3">
                  <LuUser className="bg-blue-200 text-blue-700 p-2 text-5xl rounded-md" />

                  <div className="font-semibold flex flex-col items-center ">
                    <h1 className="text-xl">{tecnico.nome}</h1>

                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <FaPhoneAlt />
                      {tecnico.telefone}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => excluirTecnico(tecnico.id)}
                  className="text-red-600 font-medium hover:bg-red-400 p-1 rounded-md duration-300 hover:text-white text-sm"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tecnicos;
