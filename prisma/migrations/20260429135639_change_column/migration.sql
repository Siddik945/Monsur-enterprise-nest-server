/*
  Warnings:

  - Made the column `challa_no` on table `product_details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product_details" ALTER COLUMN "challa_no" SET NOT NULL,
ALTER COLUMN "challa_no" DROP DEFAULT;
