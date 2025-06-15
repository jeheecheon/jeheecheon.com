import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WEEK } from "@packages/common/utils/time";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { AppModule } from "./app.module.js";
import { configs } from "./utils/config.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: configs.BLOG_URL,
    credentials: true,
  });
  app.use(
    cookieSession({
      name: "blog-session",
      secret: configs.SESSION_SECRET,
      maxAge: WEEK,
      secure: configs.NODE_ENV === "production",
      httpOnly: true,
    }),
  );
  app.use(cookieParser());

  await app.listen(configs.PORT);

  Logger.log(`Server is running on port ${configs.PORT}`);
}
bootstrap();
