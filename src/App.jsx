/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import { generarId } from './helpers'
import ListadoGasto from './components/ListadoGasto'
import Filtros from './components/Filtros'

function App() {
  const [gastos, setGastos] = useState([...(JSON.parse(localStorage.getItem("gastos")) ?? []),]);
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] =useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [editar, setEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(editar).length > 0 ){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
      }
  }, [editar])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true)
    setEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastoActualizado = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizado)
      setEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id =>{
    const gastoActualizado = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastoActualizado)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
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
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ListadoGasto 
                gastos={gastos} 
                setEditar={setEditar} 
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
                />
            </main>
            <div className='nuevo-gasto'>
              <img src={IconoNuevoGasto} alt="nuevo gasto" onClick={handleNuevoGasto}/>
            </div>
          </>
          
        )}

        {modal && <Modal 
          setModal={setModal} 
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editar={editar}
          setEditar={setEditar}
          />}
    </div>
  )
}

export default App
