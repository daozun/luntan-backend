/*
  Warnings:

  - You are about to alter the column `create_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `create_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `update_time` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();
