/*
  Warnings:

  - You are about to drop the column `item_name` on the `product_details` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price_per_cft` on the `product_details` table. All the data in the column will be lost.
  - Added the required column `categories_id` to the `product_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `product_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_id` to the `product_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_id` to the `product_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `product_details` table without a default value. This is not possible if the table is not empty.
  - Made the column `order_id` on table `product_details` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_details" DROP CONSTRAINT "product_details_order_id_fkey";

-- AlterTable
ALTER TABLE "product_details" DROP COLUMN "item_name",
DROP COLUMN "selling_price_per_cft",
ADD COLUMN     "categories_id" INTEGER NOT NULL,
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD COLUMN     "contract_id" INTEGER NOT NULL,
ADD COLUMN     "site_id" INTEGER NOT NULL,
ADD COLUMN     "status" VARCHAR(100) NOT NULL,
ALTER COLUMN "order_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
