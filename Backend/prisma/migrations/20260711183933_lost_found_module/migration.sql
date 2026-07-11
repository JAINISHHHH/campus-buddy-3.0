-- CreateEnum
CREATE TYPE "public"."LostFoundType" AS ENUM ('LOST', 'FOUND');

-- CreateTable
CREATE TABLE "public"."LostFound" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."LostFoundType" NOT NULL,
    "imageUrl" TEXT,
    "location" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LostFound_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."LostFound" ADD CONSTRAINT "LostFound_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
