import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "@packages/entities-blog/account/account.entity";
import { oauthConfig } from "../../utils/config.js";
import { AccountModule } from "../account/account.module.js";
import { ExternalAuthenticationModule } from "../external-authentication/external-authentication.module.js";
import { GoogleStrategy } from "../passport/google.strategy.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
  imports: [
    ConfigModule.forFeature(oauthConfig),
    PassportModule,
    TypeOrmModule.forFeature([Account]),
    AccountModule,
    ExternalAuthenticationModule,
  ],
  providers: [AuthService, GoogleStrategy, ConfigService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
