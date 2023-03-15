import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1678674364695 implements MigrationInterface {
    name = 'migration1678674364695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "userId" integer NOT NULL,
                "password" varchar NOT NULL,
                CONSTRAINT "UQ_d72ea127f30e21753c9e229891e" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sale" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "creationDatetime" datetime NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "item_description" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "description" varchar NOT NULL,
                "price" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "itemDescriptionId" integer NOT NULL,
                "saleId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "itemDescriptionId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_b16a3dbd8f968bf7994673aa41b" FOREIGN KEY ("itemDescriptionId") REFERENCES "item_description" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sale" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity", "itemDescriptionId", "saleId")
            SELECT "id",
                "quantity",
                "itemDescriptionId",
                "saleId"
            FROM "sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "sale_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_sale_item"
                RENAME TO "sale_item"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sale_item"
                RENAME TO "temporary_sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "itemDescriptionId" integer NOT NULL,
                "saleId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity", "itemDescriptionId", "saleId")
            SELECT "id",
                "quantity",
                "itemDescriptionId",
                "saleId"
            FROM "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "item_description"
        `);
        await queryRunner.query(`
            DROP TABLE "sale"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
