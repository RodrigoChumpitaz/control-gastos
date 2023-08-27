import { useEffect, useState } from 'react'
import { categories } from '../utils/getCategories'

const Filtros = ({ filtro, setFiltro }) => {

    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar gastos</label>
                    <select
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                    >
                        <option value="">-- Todas las Categorias --</option>
                        { categories.map((data, index) => {
                            return <option key={index} value={data.value}>{data.category}</option>
                        }) }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros
