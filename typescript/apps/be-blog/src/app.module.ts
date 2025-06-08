import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "@packages/entities-blog/account/account.entity";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { Post } from "@packages/entities-blog/post/post.entity";
import { Role } from "@packages/entities-blog/role/role.entity";
import { join } from "path";
import { CommentModule } from "./modules/comment/comment.module.js";
import { DatabaseModule } from "./modules/database/database.module.js";
import { PostModule } from "./modules/post/post.module.js";
import { configs } from "./utils/config.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false,
      graphiql: true,
      introspection: configs.NODE_ENV !== "production",
      buildSchemaOptions: {
        dateScalarMode: "timestamp",
      },
      formatError: (error) => {
        console.log(error);
        return error;
      },
    }),
    TypeOrmModule.forFeature([Account, Role, Comment, Post]),
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
