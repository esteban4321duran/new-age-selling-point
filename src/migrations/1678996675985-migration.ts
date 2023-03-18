import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1678996675985 implements MigrationInterface {
    name = 'migration1678996675985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "itemDescriptionId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity", "itemDescriptionId")
            SELECT "id",
                "quantity",
                "itemDescriptionId"
            FROM "sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "sale_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_sale_item"
                RENAME TO "sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "item_details" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "price" integer NOT NULL,
                "description" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity")
            SELECT "id",
                "quantity"
            FROM "sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "sale_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_sale_item"
                RENAME TO "sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "descriptionId" integer NOT NULL,
                "saleId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity")
            SELECT "id",
                "quantity"
            FROM "sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "sale_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_sale_item"
                RENAME TO "sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "descriptionId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_1e341ebee232fc195ad559528dd" FOREIGN KEY ("descriptionId") REFERENCES "item_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity", "descriptionId", "saleId")
            SELECT "id",
                "quantity",
                "descriptionId",
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
                "descriptionId" integer NOT NULL,
                "saleId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity", "descriptionId", "saleId")
            SELECT "id",
                "quantity",
                "descriptionId",
                "saleId"
            FROM "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_sale_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "sale_item"
                RENAME TO "temporary_sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity")
            SELECT "id",
                "quantity"
            FROM "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_sale_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "sale_item"
                RENAME TO "temporary_sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "itemDescriptionId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity")
            SELECT "id",
                "quantity"
            FROM "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "item_details"
        `);
        await queryRunner.query(`
            ALTER TABLE "sale_item"
                RENAME TO "temporary_sale_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "itemDescriptionId" integer NOT NULL,
                CONSTRAINT "FK_b16a3dbd8f968bf7994673aa41b" FOREIGN KEY ("itemDescriptionId") REFERENCES "item_description" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity", "itemDescriptionId")
            SELECT "id",
                "quantity",
                "itemDescriptionId"
            FROM "temporary_sale_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_sale_item"
        `);
    }

}
