/*
  Warnings:

  - Added the required column `userId` to the `Targetas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - Add column as nullable first
ALTER TABLE "Targetas" ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- Update existing rows to use nc value as userId
UPDATE "Targetas" SET "userId" = "nc" WHERE "userId" IS NULL;

-- Make column required
ALTER TABLE "Targetas" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Targetas" ADD CONSTRAINT "Targetas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuarios"("nc") ON DELETE RESTRICT ON UPDATE CASCADE;
