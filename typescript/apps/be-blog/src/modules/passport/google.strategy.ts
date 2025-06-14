import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthProviderType } from "@packages/common/types/auth";
import { Optional } from "@packages/common/types/misc";
import type { GoogleConfig } from "@packages/common/types/oauth";
import { Request } from "express";
import { Profile, Strategy } from "passport-google-oauth20";
import { z } from "zod";

export const googleOAuthUserSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  providerType: z.nativeEnum(AuthProviderType),
  providerId: z.string(),
  redirectUrl: z.string().optional(),
  profile: z.object({
    id: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    avatar: z.string().optional(),
  }),
});

export type GoogleOAuthUser = z.infer<typeof googleOAuthUserSchema>;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const googleConfig = configService.getOrThrow<GoogleConfig>("oauth.google");

    super({
      clientID: googleConfig.CLIENT_ID,
      callbackURL: googleConfig.CALLBACK_URL,
      clientSecret: googleConfig.CLIENT_SECRET,
      passReqToCallback: true,
      scope: ["email", "profile"],
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      accessToken,
      refreshToken,
      providerType: AuthProviderType.GOOGLE,
      providerId: profile.id,
      redirectUrl: req.query.state as Optional<string>,
      profile: {
        ...profile,
        email: profile.emails?.[0]?.value,
        emailVerified: profile.emails?.[0]?.verified,
        avatar: profile.photos?.[0]?.value,
      },
    };
  }
}
