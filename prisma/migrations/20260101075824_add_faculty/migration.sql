-- CreateEnum
CREATE TYPE "public"."Faculty" AS ENUM ('SBM', 'SCI', 'SOT', 'SIFT', 'SOM', 'SOP', 'SOC');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "faculty" "public"."Faculty";
