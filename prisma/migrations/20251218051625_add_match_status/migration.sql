-- CreateEnum
CREATE TYPE "public"."CompetitionMatchStatus" AS ENUM ('UPCOMMING', 'ONGOING', 'COMPLETED');

-- AlterTable
ALTER TABLE "public"."Match" ADD COLUMN     "matsh_status" "public"."CompetitionMatchStatus" NOT NULL DEFAULT 'UPCOMMING';
