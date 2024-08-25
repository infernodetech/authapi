/*
  Warnings:

  - A unique constraint covering the columns `[client_id,token_id]` on the table `scopes_jwt` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `scopes_jwt_client_id_user_id_key` ON `scopes_jwt`;

-- CreateIndex
CREATE UNIQUE INDEX `scopes_jwt_client_id_token_id_key` ON `scopes_jwt`(`client_id`, `token_id`);
