/*
  Warnings:

  - A unique constraint covering the columns `[client_id,user_id]` on the table `scopes_jwt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `scopes_jwt` MODIFY `token_id` VARCHAR(3000) NOT NULL,
    MODIFY `client_id` VARCHAR(3000) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `scopes-client_user` ON `scopes_jwt`(`client_id`, `user_id`);
