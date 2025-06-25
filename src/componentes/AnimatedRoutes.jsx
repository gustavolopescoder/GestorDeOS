import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./dashboard";
import Ordens from "./PageOrdem/ordens";
import Tecnicos from "./tecnicos";
import Empresas from "./empresas";
import OrdemDetalhe from "./PageOrdem/OrdemDetalhe";
import NewOrdem from "./NewOrdem";

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

function AnimatedRoutes({ ordens, empresas, tecnicos, adicionarOrdem }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Dashboard ordens={ordens} />
            </motion.div>
          }
        />
        <Route
          path="/ordens"
          element={
            <motion.div {...pageTransition}>
              <Ordens ordens={ordens} empresas={empresas} tecnicos={tecnicos} />
            </motion.div>
          }
        />
        <Route
          path="/tecnicos"
          element={
            <motion.div {...pageTransition}>
              <Tecnicos />
            </motion.div>
          }
        />
        <Route
          path="/empresas"
          element={
            <motion.div {...pageTransition}>
              <Empresas empresas={empresas} />
            </motion.div>
          }
        />
        <Route
          path="/ordens/:id"
          element={
            <motion.div {...pageTransition}>
              <OrdemDetalhe />
            </motion.div>
          }
        />
        <Route
          path="/newOrdem"
          element={
            <motion.div {...pageTransition}>
              <NewOrdem
                adicionarOrdem={adicionarOrdem}
                empresas={empresas}
                tecnicos={tecnicos}
              />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
