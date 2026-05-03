/*
  Warnings:

  - You are about to drop the column `rent_cost` on the `product_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_details" DROP COLUMN "rent_cost",
ADD COLUMN     "rentCost" DOUBLE PRECISION;
