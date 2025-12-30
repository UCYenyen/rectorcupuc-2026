-- AlterTable
ALTER TABLE "public"."TeamMember" ADD COLUMN     "join_request_status" "public"."RegistrationStatus" NOT NULL DEFAULT 'Pending';
