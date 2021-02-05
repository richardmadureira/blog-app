import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPost1612349621349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                }, {
                    name: 'title',
                    type: 'varchar',
                }, {
                    name: 'author',
                    type: 'varchar',
                }, {
                    name: 'summary',
                    type: 'varchar',
                }, {
                    name: 'content',
                    type: 'varchar',
                }, {
                    name: 'publish_date',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'current_timestamp',
                }, {
                    name: 'last_update',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'current_timestamp',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}
