import { useState } from "react";
import Header from "./components/Header";
import NuevoPresupuesto from "./components/NuevoPresupuesto";
import Filtro from "./components/Filtro";
import Modal from "./components/Modal";
import imagenGasto from "./img/nuevo-gasto.svg";
import { formatearFecha, generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  function handleModal() {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }
  function guardarGasto(nuevoGasto) {
    nuevoGasto.id = generarId();
    nuevoGasto.fecha = Date.now();
    setGastos([...gastos, nuevoGasto]);
  }
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtro />
            <ListadoGastos gastos={gastos} />
          </main>
          <div className="nuevo-gasto">
            <img src={imagenGasto} alt="Imagen gasto" onClick={handleModal} />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        />
      )}
    </div>
  );
}

export default App;
