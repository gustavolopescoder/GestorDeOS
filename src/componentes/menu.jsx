import { NavLink } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const MenuLateral = () => {
  const baseClass =
    "block p-1 rounded-md hover:bg-blue-100 hover:text-blue-800  transition-all duration-200";
  const activeClass = "bg-blue-200 text-blue-800";

  return (
    <div
      id="menuLateral"
      className="flex fixed h-screen flex-col rounded-md bg-white w-64"
    >
      <div id="header" className="border p-3 flex items-center gap-3">
        <CgNotes className="bg-gradient-to-r from-red-600 to-red-500 text-[40px] p-1 rounded-md" />

        <h1 className="font-bold">OS NovoNivel</h1>
      </div>
      <nav className="p-2 space-y-3 flex flex-col">
        <h1>Navegação</h1>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex items-center gap-2 p-1">
            <RiDashboardHorizontalLine />

            <h1 className="font-medium">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink
          to="/empresas"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex items-center gap-2 p-1">
            <HiOutlineBuildingOffice2 />

            <h1 className="font-medium">Empresas</h1>
          </div>
        </NavLink>
        <NavLink
          to="/tecnicos"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex items-center gap-2 p-1">
            <BsPeople />

            <h1 className="font-medium">Técnicos</h1>
          </div>
        </NavLink>
        <NavLink
          to="/ordens"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex items-center gap-2 p-1">
            <CgNotes />

            <h1 className="font-medium">Ordens de Serviço</h1>
          </div>
        </NavLink>
        <NavLink
          to="/newOrdem"
          end
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex items-center gap-2 p-1">
            <FaPlus />

            <h1 className="font-medium">Nova Ordem</h1>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default MenuLateral;
