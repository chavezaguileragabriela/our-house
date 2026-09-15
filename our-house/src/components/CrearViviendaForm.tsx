import { useState } from 'react'
import { crearVivienda } from '../services/dwellingService'


const USER_ID_TEMPORAL = 'usuario-prueba'

function CrearViviendaForm() {
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [error, setError] = useState('')
    const [mensajeExito, setMensajeExito] = useState('')
    const [guardando, setGuardando] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMensajeExito('')

    if (nombre.trim() === '') {
        setError('El nombre de la vivienda es obligatorio.')
        return
    }

    if (direccion.trim() === '') {
        setError('La dirección de la vivienda es obligatoria.')
        return
    }

    try {
        setGuardando(true)
        const codigo = await crearVivienda(
        { nombre, direccion },
        USER_ID_TEMPORAL
        )
        setMensajeExito(
        `Vivienda "${nombre}" creada. Código de invitación: ${codigo}`
        )
    } catch (err) {
        setError('Ocurrió un error al crear la vivienda. Intenta de nuevo.')
        console.error(err)
    } finally {
        setGuardando(false)
    }
    }

    return (
    <section id="crear-vivienda">
        <h2>Crear vivienda</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre de la vivienda</label>
        <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Casa Los Robles"
            disabled={guardando}
        />

        <label htmlFor="direccion">Dirección</label>
        <input
            id="direccion"
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ej: Calle 10 # 5-20"
            disabled={guardando}
        />

        <button type="submit" disabled={guardando}>
            {guardando ? 'Creando...' : 'Crear vivienda'}
        </button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
    </section>
    )
}

export default CrearViviendaForm