/*
  Warnings:

  - A unique constraint covering the columns `[NIM]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "NIM" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_NIM_key" ON "public"."User"("NIM");
