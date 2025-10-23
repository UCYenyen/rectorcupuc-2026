/*
  Warnings:

  - You are about to drop the column `registration_status` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `rejection_reason` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Team" DROP COLUMN "registration_status",
DROP COLUMN "rejection_reason";
