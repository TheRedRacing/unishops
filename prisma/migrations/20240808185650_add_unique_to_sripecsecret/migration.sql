/*
  Warnings:

  - A unique constraint covering the columns `[stripeSecret]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shop_stripeSecret_key" ON "Shop"("stripeSecret");
