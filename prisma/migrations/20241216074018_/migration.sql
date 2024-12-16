/*
  Warnings:

  - You are about to alter the column `create_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `create_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `update_time` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Post_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
