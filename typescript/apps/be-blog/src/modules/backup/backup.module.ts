import { Module } from "@nestjs/common";
import { DatabaseBackupService } from "./backup.service.js";

@Module({
  providers: [DatabaseBackupService],
  exports: [DatabaseBackupService],
})
export class DatabaseBackupModule {}
