/*
  Warnings:

  - Made the column `rentCost` on table `product_details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- set default
ALTER TABLE "product_details"
ALTER COLUMN "rentCost" SET DEFAULT 0;

-- update old null values
UPDATE "product_details"
SET "rentCost" = 0
WHERE "rentCost" IS NULL;

-- make it NOT NULL
ALTER TABLE "product_details"
ALTER COLUMN "rentCost" SET NOT NULL;
