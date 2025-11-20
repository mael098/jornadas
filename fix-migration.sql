-- Este script marca la migración fallida como exitosa y aplica los cambios necesarios
-- Ejecuta esto directamente en tu base de datos de Prisma Postgres

-- 1. Marcar la migración anterior como completada (si existe el registro)
DELETE FROM "_prisma_migrations" WHERE migration_name = '20250120000000_update_to_single_day_schema';

-- 2. Aplicar los cambios del esquema (ejecuta solo si aún no se aplicaron)

-- Eliminar constraints de foreign keys antiguos (si existen)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Registro_talleres_taller_horario1_id_fkey') THEN
        ALTER TABLE "Registro_talleres" DROP CONSTRAINT "Registro_talleres_taller_horario1_id_fkey";
    END IF;
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Registro_talleres_taller_horario2_id_fkey') THEN
        ALTER TABLE "Registro_talleres" DROP CONSTRAINT "Registro_talleres_taller_horario2_id_fkey";
    END IF;
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Registro_talleres_taller_horario3_id_fkey') THEN
        ALTER TABLE "Registro_talleres" DROP CONSTRAINT "Registro_talleres_taller_horario3_id_fkey";
    END IF;
END $$;

-- Eliminar tabla Registro_viernes (si existe)
DROP TABLE IF EXISTS "Registro_viernes" CASCADE;

-- Eliminar enums (si existen)
DROP TYPE IF EXISTS "Dia" CASCADE;
DROP TYPE IF EXISTS "Horario" CASCADE;

-- Modificar tabla Registro_talleres
ALTER TABLE "Registro_talleres" DROP COLUMN IF EXISTS "taller_horario1_id";
ALTER TABLE "Registro_talleres" DROP COLUMN IF EXISTS "taller_horario2_id";
ALTER TABLE "Registro_talleres" DROP COLUMN IF EXISTS "taller_horario3_id";

-- Agregar nueva columna si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Registro_talleres' AND column_name = 'taller_id') THEN
        ALTER TABLE "Registro_talleres" ADD COLUMN "taller_id" INTEGER;
    END IF;
END $$;

-- Modificar tabla Talleres
ALTER TABLE "Talleres" DROP COLUMN IF EXISTS "dia";

-- Cambiar tipo de columna horario
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Talleres' AND column_name = 'horario' AND data_type != 'text') THEN
        ALTER TABLE "Talleres" DROP COLUMN "horario";
        ALTER TABLE "Talleres" ADD COLUMN "horario" TEXT NOT NULL DEFAULT '11:30 AM - 1:30 PM';
    END IF;
END $$;

-- Crear índice único si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'Registro_talleres_usuario_nc_key') THEN
        CREATE UNIQUE INDEX "Registro_talleres_usuario_nc_key" ON "Registro_talleres"("usuario_nc");
    END IF;
END $$;

-- Agregar foreign key si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Registro_talleres_taller_id_fkey') THEN
        ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_taller_id_fkey" 
        FOREIGN KEY ("taller_id") REFERENCES "Talleres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- 3. Registrar la migración como completada
INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
VALUES (
    gen_random_uuid()::text,
    'migration_checksum_here',
    NOW(),
    '20250120000000_update_to_single_day_schema',
    NULL,
    NULL,
    NOW(),
    1
) ON CONFLICT DO NOTHING;
