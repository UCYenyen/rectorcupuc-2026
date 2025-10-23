/*
  Warnings:

  - You are about to drop the column `rejection_reason` on the `CompetitionRegistration` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `CompetitionRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CompetitionRegistration" DROP COLUMN "rejection_reason",
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CompetitionRegistration" ADD CONSTRAINT "CompetitionRegistration_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
