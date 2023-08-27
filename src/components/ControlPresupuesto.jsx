import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles }  from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [porcentaje, setPorcentaje] = useState(10)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)


    useEffect(() => {
        const totalGastado = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0)
        const totalDisponible = presupuesto - totalGastado

        // calcular % gastado
        const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto * 100).toFixed(2)

        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje) 
        }, 1000);
    }, [gastos])

    const formatCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Estas seguro de resetear la app?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
            return
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 85 ? '#d92027' : '#3B82F6',
                        trailColor: '#f5f5f5',
                        textColor: '#3B82F6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}                    
                />
            </div>
            <div>
                <div className="contenido-presupuesto">
                    <button className='reset-app' type='button' onClick={handleResetApp}>
                        Resetear App
                    </button>
                    <p>
                        <span>Presupuesto: </span>{formatCantidad(presupuesto)}
                    </p>
                    <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                        <span>Disponible: </span>{formatCantidad(disponible)}
                    </p>
                    <p>
                        <span>Gastado: </span>{formatCantidad(gastado)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ControlPresupuesto
