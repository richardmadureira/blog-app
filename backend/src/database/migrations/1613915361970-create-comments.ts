import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createComments1613915361970 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'comments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                }, {
                    name: 'content',
                    type: 'varchar'
                }, {
                    name: 'created_at',
                    type: 'timestamp'
                }, {
                    name: 'updated_at',
                    type: 'timestamp'
                }, {
                    name: 'post_id',
                    type: 'varchar'
                }, {
                    name: 'father_comment_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'CommentPostFK',
                    columnNames: ["post_id"],
                    referencedTableName: 'posts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }, {
                    name: 'CommentFatherCommentFK',
                    columnNames: ["father_comment_id"],
                    referencedTableName: 'comments',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments');
    }

}
