/*
  Warnings:

  - You are about to drop the column `image_url` on the `CompetitionRegistration` table. All the data in the column will be lost.
  - Added the required column `follow_proof_url` to the `CompetitionRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_url` to the `CompetitionRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follow_proof_url` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_url` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CompetitionRegistration" DROP COLUMN "image_url",
ADD COLUMN     "follow_proof_url" TEXT NOT NULL,
ADD COLUMN     "profile_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TeamMember" ADD COLUMN     "follow_proof_url" TEXT NOT NULL,
ADD COLUMN     "profile_url" TEXT NOT NULL;
