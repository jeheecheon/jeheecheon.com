import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { assert } from "@packages/common/utils/assert";
import type { Request, Response } from "express";
import { AccountService } from "../account/account.service.js";
import { ExternalAuthenticationProviderId } from "../external-authentication/external-authentication.constants.js";
import { ExternalAuthenticationService } from "../external-authentication/external-authentication.service.js";
import { AdminSessionAuthGuard } from "../guards/admin-session-auth.guard.js";
import { GoogleAuthGuard } from "../guards/google.guard.js";
import { googleOAuthUserSchema } from "../passport/google.strategy.js";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
    private readonly externalAuthenticationService: ExternalAuthenticationService,
  ) {}

  @Get("/is-admin")
  @UseGuards(AdminSessionAuthGuard)
  @HttpCode(HttpStatus.OK)
  async isAdmin() {
    return {
      isAdmin: true,
    };
  }

  @Get("/signout")
  async signout(@Res() res: Response) {
    res.clearCookie("blog-session");
    res.redirect(this.configService.getOrThrow("BLOG_URL"));
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async redirectToGoogle() {}

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async processGoogleCallback(@Req() req: Request, @Res() res: Response) {
    const { success, data: user } = await googleOAuthUserSchema.safeParseAsync(
      req.user,
    );
    assert(success, new UnauthorizedException());

    await this.accountService.upsertAccount(
      {
        email: user.profile.email,
      },
      {
        email: user.profile.email,
        avatar: user.profile.avatar,
        isEmailConfirmed: user.profile.emailVerified,
      },
    );

    const account = await this.accountService.getAccountOrThrow(
      {
        email: user.profile.email,
      },
      {
        relations: {
          roles: true,
        },
      },
    );

    await this.externalAuthenticationService.upsertExternalAuthentication(
      {
        accountIdFromProvider: user.profile.id,
      },
      {
        providerId: ExternalAuthenticationProviderId.GOOGLE,
        accountIdFromProvider: user.profile.id,
        accountId: account.id,
      },
    );

    req.session = { account };

    return res.redirect(
      user.redirectUrl ?? this.configService.getOrThrow("BLOG_URL"),
    );
  }
}
