import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPosts1613912398244 implements MigrationInterface {

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
                    name: 'cover_image',
                    type: 'varchar',
                }, {
                    name: 'author',
                    type: 'varchar',
                }, {
                    name: 'excerpt',
                    type: 'varchar',
                }, {
                    name: 'content',
                    type: 'varchar',
                }, {
                    name: 'views_count',
                    type: 'bigint',
                    default: 0,
                }, {
                    name: 'publish_date',
                    type: 'timestamp',
                    isNullable: true
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'current_timestamp',
                }, {
                    name: 'updated_at',
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
