import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1678731494058 implements MigrationInterface {
    name = 'migration1678731494058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sessions" (
                "id" varchar(44) PRIMARY KEY NOT NULL,
                "user_id" integer,
                "content" text NOT NULL,
                "flash" text NOT NULL,
                "updated_at" integer NOT NULL,
                "created_at" integer NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "sessions"
        `);
    }

}
