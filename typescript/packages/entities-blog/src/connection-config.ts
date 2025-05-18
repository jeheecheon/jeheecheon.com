import dotenv from "dotenv";
import { dirname, join } from "path";
import type { DataSourceOptions, NamingStrategyInterface } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { fileURLToPath } from "url";

dotenv.config();

export const __dirname = dirname(fileURLToPath(import.meta.url));

export class CustomNamingStrategy
  extends SnakeNamingStrategy
  implements NamingStrategyInterface {}

export const dataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  namingStrategy: new CustomNamingStrategy(),
  entities: [join(__dirname, "**/*.entity.js")],
  synchronize: false,
} satisfies DataSourceOptions;
