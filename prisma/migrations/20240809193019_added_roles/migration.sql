/*
  Warnings:

  - You are about to drop the `jwt_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `jwt_token` DROP FOREIGN KEY `jwt_token_scope_id_fkey`;

-- DropTable
DROP TABLE `jwt_token`;

-- CreateTable
CREATE TABLE `Permission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions_roles` (
    `permission_id` VARCHAR(191) NOT NULL,
    `role_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scope_token` (
    `id` VARCHAR(191) NOT NULL,
    `scope_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissions_roles` ADD CONSTRAINT `permissions_roles_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissions_roles` ADD CONSTRAINT `permissions_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scope_token` ADD CONSTRAINT `scope_token_scope_id_fkey` FOREIGN KEY (`scope_id`) REFERENCES `scopes_jwt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
