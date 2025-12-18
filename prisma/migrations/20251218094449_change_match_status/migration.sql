/*
  Warnings:

  - You are about to drop the column `matsh_status` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "matsh_status",
ADD COLUMN     "match_status" "public"."CompetitionMatchStatus" NOT NULL DEFAULT 'UPCOMMING';
