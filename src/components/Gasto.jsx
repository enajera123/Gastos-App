import React from "react";
import {
  LeadingActions,
  TrailingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from "../helpers";
import iconoAhorro from "../img/icono_ahorro.svg";
import iconoCasa from "../img/icono_casa.svg";
import iconoComida from "../img/icono_comida.svg";
import iconoGastos from "../img/icono_gastos.svg";
import iconoOcio from "../img/icono_ocio.svg";
import iconoSalud from "../img/icono_salud.svg";
import iconoSuscripciones from "../img/icono_suscripciones.svg";

function Gasto({ gasto }) {
  const { categoria, nombre, cantidad, fecha } = gasto;
  const iconoDiccionario = {
    ahorro: iconoAhorro,
    casa: iconoCasa,
    comida: iconoComida,
    gastos: iconoGastos,
    ocio: iconoOcio,
    suscripciones: iconoSuscripciones,
    salud: iconoSalud,
  };
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.log("Editando..")}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => console.log("Eliminando..")}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconoDiccionario[categoria]} alt={categoria} />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default Gasto;
