-- CreateEnum
CREATE TYPE "public"."CompetitionMatchType" AS ENUM ('QUARTERFINAL', 'SEMIFINALS', 'FINALS');

-- AlterTable
ALTER TABLE "public"."Match" ADD COLUMN     "match_type" "public"."CompetitionMatchType" NOT NULL DEFAULT 'QUARTERFINAL';
