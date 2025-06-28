import { MigrationInterface, QueryRunner } from "typeorm";

export class Baseline1751132223624 implements MigrationInterface {
  name = "Baseline1751132223624";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "liked_comment" ("comment_id" uuid NOT NULL, "account_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c4fbdb142f4ca4bbffa6dd9d46e" PRIMARY KEY ("comment_id", "account_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" character varying(30) NOT NULL, "parent_category_id" character varying(30), "is_bottom_level" boolean NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hashtag" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, CONSTRAINT "UQ_347fec870eafea7b26c8a73bac1" UNIQUE ("name"), CONSTRAINT "PK_cb36eb8af8412bfa978f1165d78" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "content" text NOT NULL, "uploaded_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "edited_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "cover" character varying(256), "is_public" boolean NOT NULL DEFAULT false, "category_id" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parent_comment_id" uuid, "account_id" uuid NOT NULL, "post_id" uuid NOT NULL, "content" text NOT NULL, "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "external_login_provider" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, CONSTRAINT "UQ_425e9f2d5870c16132632512d2a" UNIQUE ("name"), CONSTRAINT "PK_5455aed8f30f5038ff7dccd3ccb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "external_authentication" ("provider_id" integer NOT NULL, "account_id_from_provider" character varying(256) NOT NULL, "account_id" uuid NOT NULL, CONSTRAINT "PK_26262fd4d205e1d2a5a9d83a36f" PRIMARY KEY ("provider_id", "account_id_from_provider"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(254) NOT NULL, "normalized_email" character varying(254) NOT NULL, "is_email_confirmed" boolean NOT NULL, "avatar" character varying(256), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd103055ee8be5be00c54ee9daf" UNIQUE ("normalized_email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "liked_post" ("post_id" uuid NOT NULL, "account_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0e92b6bd2673c540f82ee1c61bc" PRIMARY KEY ("post_id", "account_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_hashtag" ("hashtag_id" integer NOT NULL, "post_id" uuid NOT NULL, CONSTRAINT "PK_7bd46977fb3fcf634147df2554c" PRIMARY KEY ("hashtag_id", "post_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_44fad00dc75a7ebb2cad8d0bcb" ON "post_hashtag" ("hashtag_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a855b00dfa76d3dd76a554a0e7" ON "post_hashtag" ("post_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "account_role" ("account_id" uuid NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_769a92b0cf8acea684503433aa1" PRIMARY KEY ("account_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a9f1af0ee8fab2683a16e8df7" ON "account_role" ("account_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8fc1d56b9c10594179b5d0762f" ON "account_role" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_comment" ADD CONSTRAINT "FK_10bd7c54e3e71bef471a81ad972" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_comment" ADD CONSTRAINT "FK_c809b3cfc0a606eb64656311711" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_d6db2bf1b938f69d2ebac5a9de8" FOREIGN KEY ("parent_category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_388636ba602c312da6026dc9dbc" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_b70ef66b68f33bd318e6485e23d" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_ac69bddf8202b7c0752d9dc8f32" FOREIGN KEY ("parent_comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "external_authentication" ADD CONSTRAINT "FK_bfe336bb7348f84069774dd8f6d" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "external_authentication" ADD CONSTRAINT "FK_d5f28bc508e17013a3be924648f" FOREIGN KEY ("provider_id") REFERENCES "external_login_provider"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_post" ADD CONSTRAINT "FK_a02f09bcc9530a4e8c03cc9a995" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_post" ADD CONSTRAINT "FK_e5d1a5eb90faf85fb12c747d548" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_44fad00dc75a7ebb2cad8d0bcb1" FOREIGN KEY ("hashtag_id") REFERENCES "hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_a855b00dfa76d3dd76a554a0e7d" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_role" ADD CONSTRAINT "FK_9a9f1af0ee8fab2683a16e8df7e" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_role" ADD CONSTRAINT "FK_8fc1d56b9c10594179b5d0762f6" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_role" DROP CONSTRAINT "FK_8fc1d56b9c10594179b5d0762f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_role" DROP CONSTRAINT "FK_9a9f1af0ee8fab2683a16e8df7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_a855b00dfa76d3dd76a554a0e7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_44fad00dc75a7ebb2cad8d0bcb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_post" DROP CONSTRAINT "FK_e5d1a5eb90faf85fb12c747d548"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_post" DROP CONSTRAINT "FK_a02f09bcc9530a4e8c03cc9a995"`,
    );
    await queryRunner.query(
      `ALTER TABLE "external_authentication" DROP CONSTRAINT "FK_d5f28bc508e17013a3be924648f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "external_authentication" DROP CONSTRAINT "FK_bfe336bb7348f84069774dd8f6d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_ac69bddf8202b7c0752d9dc8f32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_b70ef66b68f33bd318e6485e23d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_388636ba602c312da6026dc9dbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_d6db2bf1b938f69d2ebac5a9de8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_comment" DROP CONSTRAINT "FK_c809b3cfc0a606eb64656311711"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liked_comment" DROP CONSTRAINT "FK_10bd7c54e3e71bef471a81ad972"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8fc1d56b9c10594179b5d0762f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9a9f1af0ee8fab2683a16e8df7"`,
    );
    await queryRunner.query(`DROP TABLE "account_role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a855b00dfa76d3dd76a554a0e7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_44fad00dc75a7ebb2cad8d0bcb"`,
    );
    await queryRunner.query(`DROP TABLE "post_hashtag"`);
    await queryRunner.query(`DROP TABLE "liked_post"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "external_authentication"`);
    await queryRunner.query(`DROP TABLE "external_login_provider"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "hashtag"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "liked_comment"`);
  }
}
