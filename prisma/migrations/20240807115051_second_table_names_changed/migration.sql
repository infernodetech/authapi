/*
  Warnings:

  - You are about to drop the `administratiorpermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `administrator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scope_jwt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AdministratiorPermissions` DROP FOREIGN KEY `AdministratiorPermissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `AdministratiorPermissions` DROP FOREIGN KEY `AdministratiorPermissions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Administrator` DROP FOREIGN KEY `Administrator_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `scope_jwt` DROP FOREIGN KEY `scope_jwt_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_scope_id_fkey`;

-- DropTable
DROP TABLE `AdministratiorPermissions`;

-- DropTable
DROP TABLE `Administrator`;

-- DropTable
DROP TABLE `Permission`;

-- DropTable
DROP TABLE `scope_jwt`;

-- DropTable
DROP TABLE `Token`;

-- CreateTable
CREATE TABLE `administrators` (
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `administrators_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `administrators_permissions` (
    `user_id` VARCHAR(191) NOT NULL,
    `permission_id` VARCHAR(191) NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scopes_jwt` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `client_id` TEXT NOT NULL,
    `token_id` TEXT NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jwt_token` (
    `id` VARCHAR(191) NOT NULL,
    `scope_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `administrators` ADD CONSTRAINT `administrators_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrators_permissions` ADD CONSTRAINT `administrators_permissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `administrators`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrators_permissions` ADD CONSTRAINT `administrators_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scopes_jwt` ADD CONSTRAINT `scopes_jwt_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jwt_token` ADD CONSTRAINT `jwt_token_scope_id_fkey` FOREIGN KEY (`scope_id`) REFERENCES `scopes_jwt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
