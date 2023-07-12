import { useState, useEffect } from "react";
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
  const [gastoEditar, setGastoEditar] = useState({});
  function handleModal() {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }
  function guardarGasto(nuevoGasto) {
    if (gastoEditar.id) {
      const gastosActualizados = gastos.map((gasto) =>
        gasto.id === gastoEditar.id ? nuevoGasto : gasto
      );
      setGastos(gastosActualizados);
      return;
    }
    nuevoGasto.id = generarId();
    nuevoGasto.fecha = Date.now();
    setGastos([...gastos, nuevoGasto]);
  }
  function eliminarGasto(id) {
    const respuesta = confirm("Seguro que desea eliminar este gasto?");
    if (respuesta) {
      const gastosActualizados = gastos.filter((gasto) => gasto.id != id);
      setGastos(gastosActualizados);
    }
  }
  useEffect(() => {
    if (gastoEditar.id) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);
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
            <ListadoGastos
              gastos={gastos}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              setModal={setModal}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={imagenGasto} alt="Imagen gasto" onClick={handleModal} />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          gastoEditar={gastoEditar}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
