import { formatDate } from "../helpers/generarId"
import IconAhorro from "../img/icono_ahorro.svg"
import IconCasa from "../img/icono_casa.svg"
import IconComida from "../img/icono_comida.svg"
import IconGastos from "../img/icono_gastos.svg"
import IconOcio from "../img/icono_ocio.svg"
import IconSalud from "../img/icono_salud.svg"
import IconSuscripciones from "../img/icono_suscripciones.svg"

const diccionarioIconos = {
    ahorro: IconAhorro,
    casa: IconCasa,
    comida: IconComida,
    gastos: IconGastos,
    ocio: IconOcio,
    salud: IconSalud,
    suscripciones: IconSuscripciones    
}

const Gasto = ({ gasto }) => {
    const { categoria, nombre, cantidad, fecha, id } = gasto
    return (
        <div className="gasto sombra">
            <div className="contenido-gasto">
                <img src={diccionarioIconos[categoria]} alt="" />
                <div className="descripcion-gasto">
                    <p className="categoria">{ categoria }</p>
                    <p className="nombre-gasto">{ nombre }</p>
                    <p className="fecha-gasto">
                        Agregado el: {''} 
                        <span>{formatDate(fecha)}</span>
                    </p>
                </div>
            </div>
            <p className="cantidad-gasto">${ cantidad }</p>
        </div>
    )
}

export default Gasto
