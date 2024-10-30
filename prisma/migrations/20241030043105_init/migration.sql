-- CreateTable
CREATE TABLE "Registro_talleres" (
    "id" SERIAL NOT NULL,
    "taller_horario1" TEXT NOT NULL,
    "taller_horario2" TEXT NOT NULL,
    "taller_horario3" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Registro_talleres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "apellidos" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero_control" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro_videojuegos" (
    "id" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videojuego_seleccionado" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Registro_videojuegos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro_viernes" (
    "id" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taller" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Registro_viernes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numero_control_key" ON "Usuario"("numero_control");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_videojuegos" ADD CONSTRAINT "Registro_videojuegos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro_viernes" ADD CONSTRAINT "Registro_viernes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
