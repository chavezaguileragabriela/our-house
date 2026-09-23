import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

/**-------------------------------------------------------------------------------------------------------
 * Guarda o actualiza el ingreso mensual de un usuario dentro de su vivienda.
 *----------------------------------------------------------------------------------------------------------*/
export async function guardarIngresoMensual(
    userId: string,
    ingresoMensual: number
): Promise<void> {
    if (isNaN(ingresoMensual) || ingresoMensual <= 0) {
    throw new Error('El ingreso mensual debe ser un número mayor a cero.')
    }

    const userRef = doc(db, 'users', userId)

    await setDoc(
    userRef,
    { ingresoMensual },
    { merge: true } 
    )
}

/**-----------------------------------------------------------------------------------------------------------------------
 * Consulta el ingreso mensual actual de un usuario.
 *--------------------------------------------------------------------------------------------------------------------*/
export async function obtenerIngresoMensual(
    userId: string
): Promise<number | null> {
    const userRef = doc(db, 'users', userId)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) return null

    const data = snapshot.data()
    return data.ingresoMensual ?? null
}