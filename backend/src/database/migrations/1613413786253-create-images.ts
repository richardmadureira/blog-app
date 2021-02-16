import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1613413786253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'hash',
                    type: 'varchar'
                },
                {
                    name: 'post_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImagePost',
                    columnNames: ["post_id"],
                    referencedTableName: 'posts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}
