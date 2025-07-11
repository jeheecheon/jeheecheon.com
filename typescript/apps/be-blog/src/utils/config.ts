import { registerAs } from "@nestjs/config";
import { OAuthConfig } from "@packages/common/types/oauth";
import { ensure } from "@packages/common/utils/assert";
import dotenv from "dotenv";

dotenv.config();

export const configs = {
  PORT: Number(process.env.PORT || 4001),
  BLOG_URL: process.env.BLOG_URL ?? "http://localhost:4000",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  BASE_DOMAIN: process.env.BASE_DOMAIN ?? "localhost",
  SESSION_SECRET: ensure(
    process.env.SESSION_SECRET,
    "SESSION_SECRET is required",
  ),

  OAUTH_GOOGLE_CLIENT_ID: ensure(
    process.env.OAUTH_GOOGLE_CLIENT_ID,
    "OAUTH_GOOGLE_CLIENT_ID is required",
  ),
  OAUTH_GOOGLE_CLIENT_SECRET: ensure(
    process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    "OAUTH_GOOGLE_CLIENT_SECRET is required",
  ),
  OAUTH_GOOGLE_CALLBACK_URL:
    process.env.OAUTH_GOOGLE_CALLBACK_URL ??
    "http://localhost:4001/auth/google/callback",

  AWS_ACCESS_KEY_ID: ensure(
    process.env.AWS_ACCESS_KEY_ID,
    "AWS_ACCESS_KEY_ID is required",
  ),
  AWS_SECRET_ACCESS_KEY: ensure(
    process.env.AWS_SECRET_ACCESS_KEY,
    "AWS_SECRET_ACCESS_KEY is required",
  ),
  AWS_REGION: ensure(process.env.AWS_REGION, "AWS_REGION is required"),
  AWS_S3_BUCKET: ensure(process.env.AWS_S3_BUCKET, "AWS_S3_BUCKET is required"),
};

export const oauthConfig = registerAs<OAuthConfig>("oauth", () => ({
  google: {
    CLIENT_ID: configs.OAUTH_GOOGLE_CLIENT_ID,
    CLIENT_SECRET: configs.OAUTH_GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: configs.OAUTH_GOOGLE_CALLBACK_URL,
  },
}));
