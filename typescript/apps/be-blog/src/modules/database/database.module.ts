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
        logging: configService.get<boolean>("DATABASE_LOGGING", false, {
          infer: true,
        }),
      }),
    }),
  ],
})
export class DatabaseModule {}
