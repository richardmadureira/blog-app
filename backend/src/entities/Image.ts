import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'
import { Post } from './Post';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string;

    @Column()
    hash: string;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', update: true })
    updatedAt: Date;

    @ManyToOne(() => Post, post => post.images)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post;
}