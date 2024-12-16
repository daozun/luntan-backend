/*
  Warnings:

  - You are about to alter the column `create_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `create_time` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `delete_flag` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `update_time` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `user` MODIFY `create_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `update_time` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();
