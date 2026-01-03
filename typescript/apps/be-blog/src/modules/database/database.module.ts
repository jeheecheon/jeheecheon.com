import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "@packages/entities-blog/connection-config";
import { restore } from "../database-sync/database-sync.utils.js";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await restore();

        return {
          ...dataSourceOptions,
          logging: configService.get<boolean>("DATABASE_LOGGING", false, {
            infer: true,
          }),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
