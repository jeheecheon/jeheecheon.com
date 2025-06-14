import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExternalAuthentication } from "@packages/entities-blog/external-authentication/external-authentication.entity";
import { ExternalAuthenticationService } from "./external-authentication.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([ExternalAuthentication])],
  providers: [ExternalAuthenticationService],
  exports: [ExternalAuthenticationService],
})
export class ExternalAuthenticationModule {}
