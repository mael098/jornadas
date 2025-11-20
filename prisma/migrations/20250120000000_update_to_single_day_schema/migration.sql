-- DropForeignKey
ALTER TABLE "Registro_talleres" DROP CONSTRAINT IF EXISTS "Registro_talleres_taller_horario1_id_fkey";
ALTER TABLE "Registro_talleres" DROP CONSTRAINT IF EXISTS "Registro_talleres_taller_horario2_id_fkey";
ALTER TABLE "Registro_talleres" DROP CONSTRAINT IF EXISTS "Registro_talleres_taller_horario3_id_fkey";

-- DropTable
DROP TABLE IF EXISTS "Registro_viernes";

-- DropEnum
DROP TYPE IF EXISTS "Dia";
DROP TYPE IF EXISTS "Horario";

-- AlterTable: Remove old columns from Registro_talleres
ALTER TABLE "Registro_talleres" DROP COLUMN IF EXISTS "taller_horario1_id";
ALTER TABLE "Registro_talleres" DROP COLUMN IF EXISTS "taller_horario2_id";
ALTER TABLE "Registro_talleres" DROP COLUMN IF EXISTS "taller_horario3_id";

-- AlterTable: Add new column to Registro_talleres
ALTER TABLE "Registro_talleres" ADD COLUMN IF NOT EXISTS "taller_id" INTEGER;

-- AlterTable: Update Talleres table
ALTER TABLE "Talleres" DROP COLUMN IF EXISTS "dia";
ALTER TABLE "Talleres" DROP COLUMN IF EXISTS "horario";
ALTER TABLE "Talleres" ADD COLUMN IF NOT EXISTS "horario" TEXT NOT NULL DEFAULT '11:30 AM - 1:30 PM';

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Registro_talleres_usuario_nc_key" ON "Registro_talleres"("usuario_nc");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'Registro_talleres_taller_id_fkey'
    ) THEN
        ALTER TABLE "Registro_talleres" ADD CONSTRAINT "Registro_talleres_taller_id_fkey" 
        FOREIGN KEY ("taller_id") REFERENCES "Talleres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
