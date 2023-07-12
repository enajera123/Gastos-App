import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtro from "./components/Filtro";
import Modal from "./components/Modal";
import imagenGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem("presupuesto") ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem("gastos")??"")??[]);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  const [cambiaCategoria, setCambiaCategoria] = useState(false);

  useEffect(() => {
    if (gastoEditar.id) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);
  useEffect(() => {
    if (filtro) {
      const lista = gastos.filter((gasto) => gasto.categoria === filtro);
      setGastosFiltrados(lista);
      return;
    }
    setGastosFiltrados(gastos);
  }, [filtro]);
  useEffect(() => {
    if (cambiaCategoria) {
      setFiltro("");
    }
  }, [cambiaCategoria]);
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto);
  }, [presupuesto]);
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);
  useEffect(() => {
    if (presupuesto > 0) {
      setIsValidPresupuesto(true);
    }
    
  }, []);
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
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              gastosFiltrados={gastosFiltrados}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              setModal={setModal}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
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
          setCambiaCategoria={setCambiaCategoria}
        />
      )}
    </div>
  );
}

export default App;
