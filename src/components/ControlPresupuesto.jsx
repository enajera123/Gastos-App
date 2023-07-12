import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function ControlPresupuesto({
  presupuesto,
  setPresupuesto,
  setGastos,
  setIsValidPresupuesto,
  gastos,
}) {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const total = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    setGastado(total);
  }, [gastos]);

  useEffect(() => {
    setDisponible(presupuesto - gastado);
  }, [gastado]);

  const transformarDinero = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
  });
  function resetAppHandle() {
    const response = confirm("Estas seguro que deseas resetear la app?");
    if (response) {
      setPresupuesto(0);
      setGastos([]);
      setIsValidPresupuesto(false);
    }
  }

  return (
    <div className="contenedor dos-columnas contenedor-presupuesto sombra">
      <div>Grafica aqui</div>
      <div className="contenido-presupuesto">
        <input
          type="submit"
          value="Resetear app"
          className="reset-app "
          onClick={resetAppHandle}
        />
        <p>
          <span>Presupuesto: </span>
          {transformarDinero.format(presupuesto)}
        </p>
        <p>
          <span>Gastado: </span>
          {transformarDinero.format(gastado)}
        </p>
        <p>
          <span>Disponible: </span>
          {transformarDinero.format(disponible)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;
