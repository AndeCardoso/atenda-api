/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companies_document_key" ON "companies"("document");
