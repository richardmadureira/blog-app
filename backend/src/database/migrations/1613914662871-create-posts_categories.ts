import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPostCategories1613914662871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'posts_categories',
            columns: [
                {
                    name: 'post_id',
                    type: 'varchar',
                    isPrimary: true,
                }, {
                    name: 'category_id',
                    type: 'varchar',
                    isPrimary: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'PostCategoriesPostFK',
                    columnNames: ["post_id"],
                    referencedTableName: 'posts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'PostCategoriesCategoryFK',
                    columnNames: ["category_id"],
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts_categories');
    }

}
