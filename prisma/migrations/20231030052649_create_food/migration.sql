-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ORGANIC', 'GENETICALLY_MODIFIED', 'INORGANIC');

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ORGANIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
