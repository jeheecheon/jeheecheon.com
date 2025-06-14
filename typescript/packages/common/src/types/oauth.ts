export type OAuthConfig = {
  google: GoogleConfig;
};

export type GoogleConfig = {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  CALLBACK_URL: string;
};
