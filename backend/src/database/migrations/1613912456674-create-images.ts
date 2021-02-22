import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class createImages1613912456674 implements MigrationInterface {

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
                }, {
                    name: 'path',
                    type: 'varchar'
                }, {
                    name: 'hash',
                    type: 'varchar'
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
                }, {
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
        }));
/*        await queryRunner.addColumn("posts", new TableColumn({
            name: 'cover_image_id',
            type: 'varchar',
            isNullable: true
        }));
        await queryRunner.createForeignKey("posts", new TableForeignKey({
            name: 'PostImageCoverImageFK',
            columnNames: ['cover_image_id'],
            referencedTableName: 'images',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }));
*/        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey("posts", "PostImageCoverImageFK")
        // await queryRunner.dropColumn("posts", "cover_image_id")
        await queryRunner.dropTable('images');
    }

}
