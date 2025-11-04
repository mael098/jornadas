-- CreateTable
CREATE TABLE "Targetas" (
    "id" SERIAL NOT NULL,
    "nc" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Targetas_pkey" PRIMARY KEY ("id")
);
