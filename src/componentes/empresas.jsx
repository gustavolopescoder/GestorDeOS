import { useState, useEffect } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [nomeNovaEmpresa, setNomeNovaEmpresa] = useState("");
  const [cnpjNovaEmpresa, setCnpjNovaEmpresa] = useState("");
  const [enderecoNovaEmpresa, setEnderecoNovaEmpresa] = useState("");
  const [modoAdicionar, setModoAdicionar] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/empresas")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar empresas");
        return res.json();
      })
      .then((data) => {
        const ordenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEmpresas(ordenadas);
        setCarregando(false);
      })
      .catch((err) => {
        alert(err.message);
        setCarregando(false);
      });
  }, []);

  const abrirAdicionar = () => {
    setNomeNovaEmpresa("");
    setCnpjNovaEmpresa("");
    setEnderecoNovaEmpresa("");
    setModoAdicionar(true);
  };

  const adicionarEmpresa = () => {
    if (!nomeNovaEmpresa.trim()) {
      return alert("Nome e CNPJ são obrigatórios");
    }

    fetch("http://localhost:8080/empresas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeNovaEmpresa,
        cnpj: cnpjNovaEmpresa,
        endereco: enderecoNovaEmpresa,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao adicionar empresa");
        return res.json();
      })
      .then((nova) => {
        setEmpresas((prev) =>
          [...prev, nova].sort((a, b) => a.nome.localeCompare(b.nome))
        );
        alert("Empresa adicionada com sucesso!");
        setModoAdicionar(false);
      })
      .catch((err) => alert(err.message));
  };

  const excluirEmpresa = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta empresa?")) return;

    fetch(`http://localhost:8080/empresas/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setEmpresas((prev) => prev.filter((e) => e.id !== id));
          alert("Empresa excluída com sucesso!");
        } else if (res.status === 404) {
          alert("Empresa não encontrada.");
        } else {
          throw new Error("Erro ao excluir empresa");
        }
      })
      .catch((err) => alert(err.message));
  };

  if (carregando) return <p>Carregando empresas...</p>;

  return (
    <div className="bg-slate-50 w-full h-full p-4 space-y-6">
      <div id="header" className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HiOutlineBuildingOffice2 className="text-5xl text-blue-700" />
          <h1 className="font-bold text-xl">Empresas</h1>
        </div>
        <button
          onClick={abrirAdicionar}
          className="bg-gradient-to-r from-blue-500 to-blue-600  shadow p-2 rounded-md font-medium text-white transform hover:scale-105 transition duration-300"
        >
          Adicionar Empresa
        </button>
      </div>

      {modoAdicionar && (
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="text-lg font-semibold">Nova Empresa</h2>
          <input
            type="text"
            value={nomeNovaEmpresa}
            onChange={(e) => setNomeNovaEmpresa(e.target.value)}
            placeholder="Nome da empresa"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={cnpjNovaEmpresa}
            onChange={(e) => setCnpjNovaEmpresa(e.target.value)}
            placeholder="CNPJ da empresa"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={enderecoNovaEmpresa}
            onChange={(e) => setEnderecoNovaEmpresa(e.target.value)}
            placeholder="Endereço da empresa"
            className="border p-2 rounded w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={adicionarEmpresa}
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

      <div className="bg-white p-4 rounded shadow">
        <ul className="space-y-1">
          {empresas.map((empresa) => (
            <li
              key={empresa.id}
              className="border-b p-2 flex items-center justify-between"
            >
              <div className="flex gap-3 border p-4 rounded-md w-full justify-between">
                <div className="flex items-center gap-3">
                  <HiOutlineBuildingOffice2 className="text-3xl text-blue-800" />
                  <div>
                    <h1 className="font-medium text-xl">{empresa.nome}</h1>
                    <p className="flex items-center gap-1 text-gray-500">
                      <CiLocationOn />
                      {empresa.endereco}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => excluirEmpresa(empresa.id)}
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

export default Empresas;
