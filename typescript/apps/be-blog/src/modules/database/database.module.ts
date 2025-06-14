import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "@packages/entities-blog/connection-config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...dataSourceOptions,
        ssl: configService.get<boolean>("DATABASE_SSL", false, {
          infer: true,
        })
          ? { rejectUnauthorized: false }
          : undefined,
        logging: configService.get<boolean>("DATABASE_LOGGING", false, {
          infer: true,
        }),
      }),
    }),
  ],
})
export class DatabaseModule {}
