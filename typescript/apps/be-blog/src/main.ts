import { NestFactory } from "@nestjs/core";
import { ensure } from "@packages/utils/assert";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ensure(4001, "PORT is not set"));
}
bootstrap();
