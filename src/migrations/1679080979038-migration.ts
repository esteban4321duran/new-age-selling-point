import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1679080979038 implements MigrationInterface {
    name = 'migration1679080979038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "descriptionId" integer NOT NULL,
                "saleId" integer NOT NULL,
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
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "detailsId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity", "detailsId", "saleId")
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
        await queryRunner.query(`
            CREATE TABLE "temporary_sale_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "quantity" integer NOT NULL,
                "detailsId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_031a89110bd99e14718b93e4e90" FOREIGN KEY ("detailsId") REFERENCES "item_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_sale_item"("id", "quantity", "detailsId", "saleId")
            SELECT "id",
                "quantity",
                "detailsId",
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
                "detailsId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity", "detailsId", "saleId")
            SELECT "id",
                "quantity",
                "detailsId",
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
                "quantity" integer NOT NULL,
                "descriptionId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "sale_item"("id", "quantity", "descriptionId", "saleId")
            SELECT "id",
                "quantity",
                "detailsId",
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
                "quantity" integer NOT NULL,
                "descriptionId" integer NOT NULL,
                "saleId" integer NOT NULL,
                CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_1e341ebee232fc195ad559528dd" FOREIGN KEY ("descriptionId") REFERENCES "item_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
    }

}
