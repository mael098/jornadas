'use server'

import { db } from '@/lib/db'
import { Usuarios } from '@prisma/client'

export async function getUser(nc: string) {
    return await db.usuarios.findFirst({
        select: {
            apellidos: true,
            email: true,
            nombre: true,
            nc: true,
            semestre: true,
            telefono: true,
            verified: true,
            registro_talleres: true,
            Registro_videojuegos: true,
            Registro_viernes: true,
        },
        where: {
            nc: nc,
        },
    })
}

interface RegisterUserProps extends Omit<Usuarios, 'verified'> {
    verified?: boolean
}
export async function registerUser({
    apellidos,
    email,
    nc,
    nombre,
    semestre,
    telefono,
    verified = false,
}: RegisterUserProps) {
    try {
        return await db.usuarios.create({
            data: {
                apellidos,
                email,
                nc,
                nombre,
                semestre,
                telefono,
                verified,
            },
        })
    } catch (error) {
        // TODO: handle error
        console.log(error)
        return null
    }
}
