-- CreateTable
CREATE TABLE "Registro_talleres" (
    "id" SERIAL NOT NULL,
    "taller_horario1" TEXT NOT NULL,
    "taller_horario2" TEXT NOT NULL,
    "taller_horario3" TEXT NOT NULL,
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
