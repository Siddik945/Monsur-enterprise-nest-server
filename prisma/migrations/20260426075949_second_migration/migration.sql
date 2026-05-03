/*
  Warnings:

  - You are about to drop the column `contract` on the `company` table. All the data in the column will be lost.
  - Added the required column `contact` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "contract",
ADD COLUMN     "contact" VARCHAR(255) NOT NULL;
