import { useState } from 'react'
import { buscarViviendaPorCodigo, unirseAVivienda } from '../services/dwellingService'

/**
 * ------------------------------------------------------------------------
 * esta parte es un demo hasta que el login (HU-02) esté conectado correctamente 
 * ------------------------------------------------------------------------
 */

const USER_ID_TEMPORAL = 'usuario-prueba'

function UnirseViviendaForm() {
    const [codigo, setCodigo] = useState('')
    const [error, setError] = useState('')
    const [mensajeExito, setMensajeExito] = useState('')
    const [buscando, setBuscando] = useState(false)

    /**
   * ------------------------------------------------------------------------
   * Valida, busca y si existe une al usuario a la vivienda que marc
   * ------------------------------------------------------------------------
   */
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMensajeExito('')

    if (codigo.trim() === '') {
        setError('Ingresa un código de invitación.')
        return
    }

    try {
        setBuscando(true)

        const vivienda = await buscarViviendaPorCodigo(codigo.trim().toUpperCase())

        if (!vivienda) {
        setError('El código ingresado no corresponde a ninguna vivienda.')
        return
        }

        await unirseAVivienda(vivienda.id, USER_ID_TEMPORAL)
        setMensajeExito(`Te uniste a la vivienda "${vivienda.nombre}".`)
    } catch (err) {
        setError('Ocurrió un error al intentar unirte. Intenta de nuevo.')
        console.error(err)
    } finally {
        setBuscando(false)
    }
    }

    return (
    <section id="unirse-vivienda">
        <h2>Unirme a una vivienda</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código de invitación</label>
        <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej: MZSQ7J"
            disabled={buscando}
        />
        <button type="submit" disabled={buscando}>
            {buscando ? 'Uniéndome...' : 'Unirme'}
        </button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
    </section>
    )
}

export default UnirseViviendaForm