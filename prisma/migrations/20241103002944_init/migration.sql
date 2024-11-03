/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `Registro_talleres` table. All the data in the column will be lost.
  - You are about to drop the `Registro_videojuegos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registro_viernes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuario_nc` to the `Registro_talleres` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registro_talleres" DROP CONSTRAINT "Registro_talleres_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Registro_videojuegos" DROP CONSTRAINT "Registro_videojuegos_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Registro_viernes" DROP CONSTRAINT "Registro_viernes_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Registro_talleres" DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_nc" TEXT NOT NULL;

-- DropTable
DROP TABLE "Registro_videojuegos";

-- DropTable
DROP TABLE "Registro_viernes";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Usuarios" (
    "apellidos" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nc" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("nc")
);

-- CreateTable
CREATE TABLE "RegistroVideojuegos" (
    "id" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videojuego_seleccionado" TEXT NOT NULL,
    "usuario_nc" TEXT NOT NULL,

    CONSTRAINT "RegistroVideojuegos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroViernes" (
    "id" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taller" TEXT NOT NULL,
    "usuario_nc" TEXT NOT NULL,

    CONSTRAINT "RegistroViernes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- AddForeignKey
ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_usuario_nc_fkey" FOREIGN KEY ("usuario_nc") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroVideojuegos" ADD CONSTRAINT "RegistroVideojuegos_usuario_nc_fkey" FOREIGN KEY ("usuario_nc") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroViernes" ADD CONSTRAINT "RegistroViernes_usuario_nc_fkey" FOREIGN KEY ("usuario_nc") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;
