import { registerAs } from "@nestjs/config";
import { OAuthConfig } from "@packages/common/types/oauth";
import { ensure } from "@packages/common/utils/assert";
import dotenv from "dotenv";

dotenv.config();

export const configs = {
  PORT: Number(process.env.PORT || 4001),
  BLOG_URL: process.env.BLOG_URL,
  NODE_ENV: process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,

  OAUTH_GOOGLE_CLIENT_ID: process.env.OAUTH_GOOGLE_CLIENT_ID,
  OAUTH_GOOGLE_CLIENT_SECRET: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
  OAUTH_GOOGLE_CALLBACK_URL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
};

export const oauthConfig = registerAs<OAuthConfig>("oauth", () => ({
  google: {
    CLIENT_ID: ensure(
      configs.OAUTH_GOOGLE_CLIENT_ID,
      "OAUTH_GOOGLE_CLIENT_ID is required",
    ),
    CLIENT_SECRET: ensure(
      configs.OAUTH_GOOGLE_CLIENT_SECRET,
      "GOOGLE_CLIENT_SECRET is required",
    ),
    CALLBACK_URL:
      configs.OAUTH_GOOGLE_CALLBACK_URL ||
      "http://localhost:4001/auth/google/callback",
  },
}));
