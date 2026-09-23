import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * ------------------------------------------------------------------------
 * Genera un código único de invitación de 6 caracteres alfanuméricos.
 * ------------------------------------------------------------------------
 */
function generarCodigoInvitacion(): string {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // sin O, 0, I, 1 para evitar confusión
    let codigo = ''
    for (let i = 0; i < 6; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    return codigo
}

interface DatosVivienda {
    nombre: string
    direccion: string
}

/**
 * ------------------------------------------------------------------------
 * Crea una nueva vivienda en Firestore, generando su código único de invitación
 * y registrando al usuario creador como integrante y administrador.
 * ------------------------------------------------------------------------
 */
export async function crearVivienda(
    datos: DatosVivienda,
    userId: string
): Promise<string> {
    if (!datos.nombre.trim() || !datos.direccion.trim()) {
    throw new Error('El nombre y la dirección son obligatorios.')
    }

    const codigoInvitacion = generarCodigoInvitacion()
    const viviendaRef = doc(collection(db, 'dwellings'))

    await setDoc(viviendaRef, {
    nombre: datos.nombre,
    direccion: datos.direccion,
    codigoInvitacion,
    administradorId: userId,
    integrantes: [userId],
    creadoEn: new Date().toISOString(),
    })

    return codigoInvitacion
}