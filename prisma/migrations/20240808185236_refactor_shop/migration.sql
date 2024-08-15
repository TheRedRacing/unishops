/*
  Warnings:

  - You are about to drop the column `stripePublic` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the `ShopFAQ` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Made the column `stripeSecret` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ShopFAQ" DROP CONSTRAINT "ShopFAQ_shopId_fkey";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "stripePublic",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Draft',
ALTER COLUMN "stripeSecret" SET NOT NULL;

-- DropTable
DROP TABLE "ShopFAQ";
