import { arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase/config'

interface DatosVivienda {
    nombre: string
    direccion: string
}

function generarCodigoInvitacion(): string {
    const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let codigo = ''
    for (let i = 0; i < 6; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    return codigo
}

export async function crearVivienda(datos: DatosVivienda, userId: string): Promise<string> {
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