import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Image } from './Image';
import { Comment } from './Comment';
import { Category } from './Category';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    excerpt: string;

    @Column()
    content: string;

    @Column({ name: "views_count" })
    viewsCount: number;

    @Column({ name: 'publish_date' })
    publishDate: Date;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', update: true })
    updatedAt: Date;

    @OneToMany(() => Image, image => image.post, { cascade: ['insert', 'update', 'remove'] },)
    @JoinColumn({ name: 'post_id' })
    images: Image[];

    @Column({ name: 'cover_image'})
    coverImage: string;

    @OneToMany(() => Comment, comment => comment.post, { cascade: ['insert', 'update', 'remove'] },)
    @JoinColumn({ name: 'post_id' })
    comments: Comment[];

    @ManyToMany(() => Category, category => category.posts)
    @JoinTable({
        name: 'posts_categories',
        joinColumn: { name: "post_id", referencedColumnName: 'id' },
        inverseJoinColumn: { name: "category_id", referencedColumnName: 'id' }
    })
    categories: Category[];
}