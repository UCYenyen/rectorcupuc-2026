/*
  Warnings:

  - The values [SEMIFINALS,FINALS] on the enum `CompetitionMatchType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CompetitionMatchType_new" AS ENUM ('QUARTERFINAL', 'SEMIFINAL', 'FINAL');
ALTER TABLE "public"."Match" ALTER COLUMN "match_type" DROP DEFAULT;
ALTER TABLE "public"."Match" ALTER COLUMN "match_type" TYPE "public"."CompetitionMatchType_new" USING ("match_type"::text::"public"."CompetitionMatchType_new");
ALTER TYPE "public"."CompetitionMatchType" RENAME TO "CompetitionMatchType_old";
ALTER TYPE "public"."CompetitionMatchType_new" RENAME TO "CompetitionMatchType";
DROP TYPE "public"."CompetitionMatchType_old";
ALTER TABLE "public"."Match" ALTER COLUMN "match_type" SET DEFAULT 'QUARTERFINAL';
COMMIT;
