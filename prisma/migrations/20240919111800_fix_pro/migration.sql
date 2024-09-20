/*
  Warnings:

  - You are about to drop the column `proAccount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "proAccount",
ADD COLUMN     "pro" BOOLEAN NOT NULL DEFAULT false;
