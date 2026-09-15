import { useState } from 'react'
import { guardarIngresoMensual } from '../services/ingresoService'


const USER_ID_TEMPORAL = 'usuario-prueba'

function IngresoMensualForm() {
    const [ingreso, setIngreso] = useState('')
    const [error, setError] = useState('')
    const [mensajeExito, setMensajeExito] = useState('')
    const [guardando, setGuardando] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMensajeExito('')

    const valor = Number(ingreso)

    if (ingreso.trim() === '' || isNaN(valor)) {
        setError('Ingresa un valor numérico válido.')
        return
    }

    if (valor <= 0) {
        setError('El ingreso debe ser mayor a cero.')
        return
    }

    try {
        setGuardando(true)
        await guardarIngresoMensual(USER_ID_TEMPORAL, valor)
        setMensajeExito(`Ingreso mensual guardado: $${valor.toLocaleString()}`)
    } catch (err) {
        setError('Ocurrió un error al guardar el ingreso. Intenta de nuevo.')
        console.error(err)
    } finally {
        setGuardando(false)
    }
    }

    return (
    <section id="ingreso-mensual">
        <h2>Ingreso mensual</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="ingreso">Monto mensual (COP)</label>
        <input
            id="ingreso"
            type="number"
            min="0"
            step="1000"
            value={ingreso}
            onChange={(e) => setIngreso(e.target.value)}
            placeholder="Ej: 2500000"
            disabled={guardando}
        />
        <button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar ingreso'}
        </button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
    </section>
    )
}

export default IngresoMensualForm