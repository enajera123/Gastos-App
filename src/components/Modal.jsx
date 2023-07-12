import React, { useState } from "react";
import { useEffect } from "react";
import cerrarModal from "./../img/cerrar.svg";
import Mensaje from "./Mensaje";

function Modal({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id,setId] = useState("")
  const [fecha,setFecha] = useState("")

  useEffect(() => {
    if (gastoEditar.id) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [gastoEditar]);
  function cerrarModalHandle() {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
      setGastoEditar({});
    }, 500);
    
  }
  function handleSubmit(e) {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
    cerrarModalHandle();
  }
  return (
    <div className="modal">
      <img
        className="cerrar-modal"
        src={cerrarModal}
        alt="cerrarModal"
        onClick={cerrarModalHandle}
      />

      <form
        className={`formulario ${animarModal ? "animar" : ""}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.id?"Editando Gasto":"Nuevo Gasto"}</legend>
        {mensaje && <Mensaje mensaje={mensaje} tipo="error" />}
        <div className="campo">
          <label htmlFor="nombreGasto">Nombre Gasto</label>
          <input
            type="text"
            id="nombreGasto"
            placeholder="Añade el Nombre de Gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidadGasto">Cantidad</label>
          <input
            type="number"
            id="cantidadGasto"
            placeholder="Añade la Cantidad del Gasto: ej. 300"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="filtrarGasto">Filtrar Gastos</label>
          <select
            id="filtrarGasto"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {" "}
            <option disabled value="">
              -- Seleccione --
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.id?"Editar Gasto":"Añadir Gasto"} />
      </form>
    </div>
  );
}

export default Modal;
