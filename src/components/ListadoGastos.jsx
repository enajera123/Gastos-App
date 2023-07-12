import React from "react";
import Gasto from "./Gasto";

function ListadoGastos({
  setGastoEditar,
  eliminarGasto,
  gastosFiltrados,
  gastos,
  filtro,
}) {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Listado de Gastos"
              : "No Hay En Esta Categoria"}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>
            {gastos.length ? "Listado de Gastos" : "No Hay Gastos Disponibles"}
          </h2>
          {gastos.map((gasto) => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ListadoGastos;
