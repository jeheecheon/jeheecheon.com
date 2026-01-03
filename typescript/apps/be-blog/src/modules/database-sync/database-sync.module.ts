import { Module } from "@nestjs/common";
import { DatabaseSyncService } from "./database-sync.service.js";

@Module({
  providers: [DatabaseSyncService],
  exports: [DatabaseSyncService],
})
export class DatabaseSyncModule {}
