import { MigrationInterface, QueryRunner } from "typeorm";

export class New1682560041839 implements MigrationInterface {
    name = 'New1682560041839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "roomId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_rooms_rooms" ("usersId" uuid NOT NULL, "roomsId" uuid NOT NULL, CONSTRAINT "PK_70f0b3aef34e4e66970a4957278" PRIMARY KEY ("usersId", "roomsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be046c829cc9f45adfe322e75e" ON "users_rooms_rooms" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_df57dc27d23e464abaa467017a" ON "users_rooms_rooms" ("roomsId") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_rooms_rooms" ADD CONSTRAINT "FK_be046c829cc9f45adfe322e75e7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_rooms_rooms" ADD CONSTRAINT "FK_df57dc27d23e464abaa467017a7" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_rooms_rooms" DROP CONSTRAINT "FK_df57dc27d23e464abaa467017a7"`);
        await queryRunner.query(`ALTER TABLE "users_rooms_rooms" DROP CONSTRAINT "FK_be046c829cc9f45adfe322e75e7"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df57dc27d23e464abaa467017a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be046c829cc9f45adfe322e75e"`);
        await queryRunner.query(`DROP TABLE "users_rooms_rooms"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
