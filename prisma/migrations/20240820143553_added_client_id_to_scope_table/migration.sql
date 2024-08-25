/*
  Warnings:

  - Added the required column `client_id` to the `scopes_jwt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scopes_jwt` ADD COLUMN `client_id` TEXT NOT NULL;
