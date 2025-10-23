/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `CompetitionRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `CompetitionRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."CompetitionRegistration" DROP COLUMN "imagePublicId",
DROP COLUMN "imageUrl";
