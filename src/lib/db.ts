import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare const globalThis: {
    prismaGlobal: ReturnType<typeof createPrismaClient>
} & typeof global

const createPrismaClient = () => {
    return new PrismaClient().$extends(withAccelerate())
}

const db = globalThis.prismaGlobal ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db

export { db }
