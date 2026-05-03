/*
  Warnings:

  - Added the required column `challa_no` to the `product_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_details" ADD COLUMN "challa_no" VARCHAR(255) DEFAULT 'unknown';

-- CreateTable
CREATE TABLE "contract" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "company_id" INTEGER NOT NULL,
    "site_id" INTEGER NOT NULL,
    "product_categories_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_product_categories_id_fkey" FOREIGN KEY ("product_categories_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
