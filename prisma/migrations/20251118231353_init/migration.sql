-- CreateEnum
CREATE TYPE "Horario" AS ENUM ('HORARIO1', 'HORARIO2', 'HORARIO3');

-- CreateEnum
CREATE TYPE "Dia" AS ENUM ('JUEVES', 'VIERNES');

-- CreateTable
CREATE TABLE "Registro_talleres" (
    "id" SERIAL NOT NULL,
    "taller_horario1_id" INTEGER NOT NULL,
    "taller_horario2_id" INTEGER NOT NULL,
    "taller_horario3_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_nc" TEXT NOT NULL,

    CONSTRAINT "Registro_talleres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "apellidos" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nc" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("nc")
);

-- CreateTable
CREATE TABLE "Registro_videojuegos" (
    "id" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videojuego_seleccionado" TEXT NOT NULL,
    "usuario_nc" TEXT NOT NULL,

    CONSTRAINT "Registro_videojuegos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro_viernes" (
    "id" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taller_id" INTEGER NOT NULL,
    "usuario_nc" TEXT NOT NULL,

    CONSTRAINT "Registro_viernes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talleres" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tallerista" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "horario" "Horario" NOT NULL,
    "dia" "Dia" NOT NULL,

    CONSTRAINT "Talleres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Targetas" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "nc" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Targetas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- AddForeignKey
ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_taller_horario1_id_fkey" FOREIGN KEY ("taller_horario1_id") REFERENCES "Talleres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_taller_horario2_id_fkey" FOREIGN KEY ("taller_horario2_id") REFERENCES "Talleres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_taller_horario3_id_fkey" FOREIGN KEY ("taller_horario3_id") REFERENCES "Talleres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_usuario_nc_fkey" FOREIGN KEY ("usuario_nc") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_videojuegos" ADD CONSTRAINT "Registro_videojuegos_usuario_nc_fkey" FOREIGN KEY ("usuario_nc") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_viernes" ADD CONSTRAINT "Registro_viernes_taller_id_fkey" FOREIGN KEY ("taller_id") REFERENCES "Talleres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_viernes" ADD CONSTRAINT "Registro_viernes_usuario_nc_fkey" FOREIGN KEY ("usuario_nc") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Targetas" ADD CONSTRAINT "Targetas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;
