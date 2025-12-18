/*
  Warnings:

  - You are about to drop the column `rules` on the `Competition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Competition" DROP COLUMN "rules";

-- CreateTable
CREATE TABLE "public"."Rules" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "competition_id" TEXT NOT NULL,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Rules" ADD CONSTRAINT "Rules_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "public"."Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
