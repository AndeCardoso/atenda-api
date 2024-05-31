/*
  Warnings:

  - Added the required column `opened_at` to the `serviceOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serviceOrders" ADD COLUMN     "opened_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "signatureUrl" TEXT,
ADD COLUMN     "totalValue" DECIMAL(65,30);
