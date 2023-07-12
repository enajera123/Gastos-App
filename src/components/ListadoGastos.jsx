import React from "react";
import Gasto from "./Gasto";

function ListadoGastos({ gastos }) {
  return (
    <div className="listado-gastos contenedor">
      <h2>
        {gastos.length ? "Listado de Gastos" : "No Hay Gastos Disponibles"}
      </h2>
      {gastos.map((gasto) => (
        <Gasto
          gasto={gasto}
          key={gasto.id}
        />
      ))}
    </div>
  );
}

export default ListadoGastos;
