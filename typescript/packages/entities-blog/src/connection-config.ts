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
  type: "better-sqlite3",
  database: process.env.DATABASE_PATH || "data/blog.sqlite",
  namingStrategy: new CustomNamingStrategy(),
  entities: [join(__dirname, "**/*.entity.js")],
  migrations: [join(__dirname, "migrations/*.js")],
  synchronize: false,
} satisfies DataSourceOptions;
