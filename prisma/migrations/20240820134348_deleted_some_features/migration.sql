/*
  Warnings:

  - You are about to drop the column `client_id` on the `scopes_jwt` table. All the data in the column will be lost.
  - You are about to drop the `administrators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `administrators_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scope_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `administrators` DROP FOREIGN KEY `administrators_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `administrators_permissions` DROP FOREIGN KEY `administrators_permissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `administrators_permissions` DROP FOREIGN KEY `administrators_permissions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `permissions_roles` DROP FOREIGN KEY `permissions_roles_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `permissions_roles` DROP FOREIGN KEY `permissions_roles_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `scope_token` DROP FOREIGN KEY `scope_token_scope_id_fkey`;

-- AlterTable
ALTER TABLE `scopes_jwt` DROP COLUMN `client_id`;

-- DropTable
DROP TABLE `administrators`;

-- DropTable
DROP TABLE `administrators_permissions`;


-- DropTable
DROP TABLE `permissions_roles`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `scope_token`;
