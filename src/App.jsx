import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers/generarId'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'

function App() {

  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem('gastos')) || []
  )

  const [gastosFiltrados, setGastosFiltrados] = useState(
    JSON.parse(localStorage.getItem('gastosFiltrados')) || []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presuepuesto')) || 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')


  useEffect(() => {
    if(Object.keys(gastoEditar).length === 0) return
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 400)
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presuepuesto', presupuesto || 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuesLs = Number(localStorage.getItem('presuepuesto')) || 0;
    
    if(presupuesLs > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(g => g.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 400)
  }


  const guardarGasto = (gasto) => {
    if(!gasto.id){
      gasto.id = generarId();
      gasto.fecha = Date.now() 
      setGastos([...gastos, gasto])
    }else{
      const gastosActualizados = gastos.map(g => g.id === gasto.id ? gasto : g)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 400)
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(g => g.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar': ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      /> 
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="nuevo gasto" onClick={handleNuevoGasto}/>
          </div>
        </>
      )}

      {modal && (
        <Modal 
          setModal={setModal} 
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  )
}

export default App
