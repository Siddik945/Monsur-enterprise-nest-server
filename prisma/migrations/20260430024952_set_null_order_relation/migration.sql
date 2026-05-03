-- DropForeignKey
ALTER TABLE "product_details" DROP CONSTRAINT "product_details_order_id_fkey";

-- AlterTable
ALTER TABLE "product_details" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
