import React from "react";
import { useState } from "react";
import Mensaje from "./Mensaje";

function NuevoPresupuesto({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) {
  const [mensaje, setMensaje] = useState("");
  function handlePresupuesto(e) {
    e.preventDefault();
    if (presupuesto <= 0) {
      setMensaje("Tu presupuesto debe ser mayor a 0 ");
      setIsValidPresupuesto(false);
      return;
    }
    setIsValidPresupuesto(true);
  }
  return (
    <div className="contenedor-presupuesto sombra contenedor">
      <form onSubmit={handlePresupuesto} action="" className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            value={presupuesto}
            onChange={(e) => {
              setPresupuesto(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="Añadir" className="" />
        {mensaje != "" ? <Mensaje tipo={"error"} mensaje={mensaje} /> : ""}
      </form>
    </div>
  );
}

export default NuevoPresupuesto;
