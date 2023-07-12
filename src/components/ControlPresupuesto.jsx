import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ControlPresupuesto({
  presupuesto,
  setPresupuesto,
  setGastos,
  setIsValidPresupuesto,
  gastos,
}) {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const total = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    setGastado(total);
  }, [gastos]);

  useEffect(() => {
    setDisponible(presupuesto - gastado);
  }, [gastado]);
  useEffect(() => {
    setTimeout(() => {
      setPorcentaje(((disponible * 100) / presupuesto).toFixed(2));
    }, 1000);
  }, [disponible]);

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
      <div>
        <CircularProgressbar
          value={disponible < 0 ? 100 : porcentaje}
          text={disponible < 0 ? `100% Gastado` : `${porcentaje}% Disponible`}
          styles={buildStyles({
            textColor: disponible >= 0 ? "#5b9bf5" : "red",
            pathColor: disponible >= 0 ? "#5b9bf5" : "red",
          })}
        />
      </div>
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
        <p className={disponible < 0 ? "contenido-presupuesto negativo" : ""}>
          <span>Disponible: </span>
          {transformarDinero.format(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {transformarDinero.format(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;
