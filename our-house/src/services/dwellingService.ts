import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * ------------------------------------------------------------------------
 * Busca si existe una vivienda con esen codigo 
 * ------------------------------------------------------------------------
 */
export async function buscarViviendaPorCodigo(codigo: string) {
    const viviendasRef = collection(db, 'dwellings')
    const busqueda = query(viviendasRef, where('codigoInvitacion', '==', codigo))
    const resultado = await getDocs(busqueda)

    if (resultado.empty) return null

    const vivienda = resultado.docs[0]
    return { id: vivienda.id, nombre: vivienda.data().nombre }
}


export async function unirseAVivienda(viviendaId: string, userId: string) {
    const viviendaRef = doc(db, 'dwellings', viviendaId)

    await updateDoc(viviendaRef, {
    integrantes: arrayUnion(userId),
    })
}