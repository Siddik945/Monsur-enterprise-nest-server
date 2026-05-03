/*
  Warnings:

  - You are about to drop the column `rent_price_per_cft` on the `product_details` table. All the data in the column will be lost.
  - Added the required column `rentCost` to the `product_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_details"
RENAME COLUMN "rent_price_per_cft" TO "rent_cost";
