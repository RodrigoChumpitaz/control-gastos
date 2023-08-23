import { useState } from 'react'
import { categories } from '../utils/getCategories'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'


const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')

    const ocultarModal = () => {
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 400)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        guardarGasto({nombre, cantidad, categoria})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarModal} alt="cerrar modal" onClick={ocultarModal}/>
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar": "cerrar"}`}>
                <legend>Nuevo Gasto</legend>

                {mensaje && (
                    <Mensaje tipo="error" >{mensaje}</Mensaje>
                )}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto:</label>

                    <input 
                        id='nombre'
                        type="text" 
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad:</label>

                    <input 
                        id='cantidad'
                        type="number" 
                        placeholder='Añade la cantidad del gasto ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria:</label>

                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        { categories.map((data, index) => {
                            return <option key={index} value={data.value}>{data.category}</option>
                        }) }
                    </select>
                </div>
                <input type="submit" value="Añadir Gasto" />
            </form>
        </div>
    )
}

export default Modal
