import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPost1612349621349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
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
                    type: 'bigint'
                }, {
                    name: 'last_update',
                    type: 'bigint'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}
