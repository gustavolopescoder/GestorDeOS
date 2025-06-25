import { useState, useEffect } from "react";
import { FaPhoneAlt, FaUserCircle, FaEdit, FaUserSlash } from "react-icons/fa";
import { LuUser } from "react-icons/lu";

function Tecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [nomeNovoTecnico, setNomeNovoTecnico] = useState("");
  const [telefoneNovoTecnico, setTelefoneNovoTecnico] = useState("");
  const [modoAdicionar, setModoAdicionar] = useState(false);
  const [carregando, setCarregando] = useState(true);

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
        ativo: true,
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

  const desativarTecnico = (id) => {
    if (!window.confirm("Deseja desativar este técnico?")) return;

    fetch(`http://localhost:8080/tecnicos/${id}/desativar`, {
      method: "PATCH",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao desativar técnico");
        setTecnicos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ativo: false } : t))
        );
      })
      .catch((err) => alert(err.message));
  };

  // Funções para os botões de ação
  const onEditar = (id) => {
    alert(`Editar técnico ${id} (implemente a lógica)`);
  };

  const onDesativar = (id) => {
    // Alterna entre ativar e desativar para exemplo
    const tecnico = tecnicos.find((t) => t.id === id);
    if (!tecnico) return;
    if (tecnico.ativo) {
      desativarTecnico(id);
    } else {
      // Aqui você poderia implementar uma ativação
      if (!window.confirm("Deseja ativar este técnico?")) return;

      fetch(`http://localhost:8080/tecnicos/${id}/ativar`, {
        method: "PATCH",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao ativar técnico");
          setTecnicos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ativo: true } : t))
          );
        })
        .catch((err) => alert(err.message));
    }
  };

  if (carregando) return <p>Carregando técnicos...</p>;

  return (
    <div className="bg-slate-50 w-full h-full p-4 space-y-6 rounded">
      <div id="header" className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <LuUser className="text-blue-600 text-5xl" />
          <h1 className="font-bold text-xl">Técnicos</h1>
        </div>

        <button
          onClick={abrirAdicionar}
          className="bg-gradient-to-r from-blue-500 to-blue-600 shadow p-2 rounded-md font-medium text-white transform hover:scale-105 transition duration-300"
        >
          + Novo Técnico
        </button>
      </div>

      {modoAdicionar && (
        <div className="bg-white p-4 rounded shadow space-y-3 max-w-md mx-auto">
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
          <div className="flex gap-2 justify-end">
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

      <div className="bg-white p-4 rounded shadow w-full">
        <ul className="flex flex-wrap gap-6 justify-center">
          {tecnicos.map((tecnico) => (
            <li
              key={tecnico.id}
              className="w-full sm:w-[350px] md:w-[400px] border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {tecnico.avatarUrl ? (
                    <img
                      src={tecnico.avatarUrl}
                      alt={tecnico.nome}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {tecnico.nome}
                  </h3>
                  <div className="flex items-center text-gray-600 space-x-2 mt-1 truncate">
                    <FaPhoneAlt />
                    <span className="truncate">{tecnico.telefone || "—"}</span>
                  </div>
                  <div
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      tecnico.ativo
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tecnico.ativo ? "Ativo" : "Inativo"}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex sm:flex-col gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => onEditar(tecnico.id)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    title="Editar técnico"
                  >
                    <FaEdit />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => onDesativar(tecnico.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                    title={
                      tecnico.ativo ? "Desativar técnico" : "Ativar técnico"
                    }
                  >
                    <FaUserSlash />
                    <span>{tecnico.ativo ? "Desativar" : "Ativar"}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tecnicos;
