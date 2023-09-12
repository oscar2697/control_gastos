import { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, editar, setEditar}) => {
    const [mensaje, setMnesaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(editar).length > 0){
            setNombre(editar.nombre)
            setCantidad(editar.cantidad)
            setCategoria(editar.categoria)
            setId(editar.id)
            setFecha(editar.fecha)
        }
    }, [])
    

    const ocultarModal = () => {
        setAnimarModal(false)
        setEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if([nombre, cantidad, categoria].includes('')){
            setMnesaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMnesaje('')
            }, 3000);
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    } 
    
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt='cerrarmodal' onClick={ocultarModal}/>
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar' }`}>
                <legend>{editar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor='nombre'>Tipo de Gasto</label>
                    <input 
                        id='nombre' 
                        type='text' 
                        placeholder='Agrega tu gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input 
                        id='cantidad' 
                        type='number' 
                        placeholder='Agrega la cantidad: ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                        />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoría</label>
                    <select 
                        id='categoria' 
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        >
                        <option value=''>--Selecciona la Categoría--</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='Salud'>Salud</option>
                        <option value='suscipciones'>Suscripciones</option>
                    </select>
                </div>
                <input type='submit' value={editar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}/>
            </form>
        </div>
    )
}

export default Modal
