import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCatetories1613914133216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                }, {
                    name: 'name',
                    type: 'varchar'
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('categories');
    }
}
