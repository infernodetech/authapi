/*
  Warnings:

  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
buALTER TABLE `administrators_permissions` DROP FOREIGN KEY `administrators_permissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `permissions_roles` DROP FOREIGN KEY `permissions_roles_role_id_fkey`;

-- DropTable
DROP TABLE `permissions`;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissions_roles` ADD CONSTRAINT `permissions_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrators_permissions` ADD CONSTRAINT `administrators_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
