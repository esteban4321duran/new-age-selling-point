import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1679094750659 implements MigrationInterface {
  name = 'migration1679094750659'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "temporary_sales" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "dateTime" datetime NOT NULL,
                "finished" boolean NOT NULL DEFAULT (0)
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_sales"("id", "dateTime")
            SELECT "id",
                "dateTime"
            FROM "sales"
        `);
    await queryRunner.query(`
            DROP TABLE "sales"
        `);
    await queryRunner.query(`
            ALTER TABLE "temporary_sales"
                RENAME TO "sales"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "sales"
                RENAME TO "temporary_sales"
        `);
    await queryRunner.query(`
            CREATE TABLE "sales" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "dateTime" datetime NOT NULL
            )
        `);
    await queryRunner.query(`
            INSERT INTO "sales"("id", "dateTime")
            SELECT "id",
                "dateTime"
            FROM "temporary_sales"
        `);
    await queryRunner.query(`
            DROP TABLE "temporary_sales"
        `);
  }

}
