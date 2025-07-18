import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

const MenuLateral = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const baseClass =
    "block p-1 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all duration-200";
  const activeClass = "bg-blue-200 text-blue-800";

  const links = (
    <>
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
    </>
  );

  return (
    <>
      {/* Menu Lateral Desktop */}
      <div
        id="menuLateral"
        className="hidden sm:flex fixed h-screen flex-col rounded-md bg-white shadow"
      >
        <div id="header" className="border p-3 flex items-center gap-3 w-64">
          <img src="./public/ChamaNaOS.png" className="w-12" />

          <h1 className="font-bold">ChamaNaOS</h1>
        </div>
        <nav className="p-2 space-y-3 flex flex-col">
          <h1>Navegação</h1>
          {links}
        </nav>
      </div>

      {/* Botão Mobile */}
      <div className="sm:hidden p-3 bg-white shadow flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="./public/ChamaNaOS.png" className="w-12" />
        </div>
        <button onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? (
            <HiOutlineX className="text-3xl" />
          ) : (
            <HiOutlineMenu className="text-3xl" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-white shadow p-4 space-y-2 border-b z-50 absolute top-16 left-0 right-0"
          >
            <nav className="flex flex-col gap-2">{links}</nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuLateral;
