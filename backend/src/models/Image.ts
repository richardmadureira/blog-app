import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Post } from './Post';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    path: string;
    @Column()
    hash: string;
    @ManyToOne(type => Post, post => post.images)
    @JoinColumn({ name: 'post_id' })
    post: Post;
}