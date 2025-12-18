/*
  Warnings:

  - You are about to drop the column `location` on the `Match` table. All the data in the column will be lost.
  - Added the required column `location` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Competition" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "location";
