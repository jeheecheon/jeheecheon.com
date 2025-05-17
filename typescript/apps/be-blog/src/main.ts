import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { configs } from "./utils/config.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(configs.PORT);

  Logger.log(`Server is running on port ${configs.PORT}`);
}
bootstrap();
