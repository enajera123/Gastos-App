import React from "react";
import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

function Header({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  setGastos,
  gastos,
}) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {!isValidPresupuesto ? (
        <NuevoPresupuesto
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
        />
      ) : (
        <ControlPresupuesto
          gastos={gastos}
          presupuesto={presupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          setPresupuesto={setPresupuesto}
          setGastos={setGastos}
        />
      )}
    </header>
  );
}

export default Header;
