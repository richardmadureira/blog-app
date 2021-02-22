import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Post } from './Post';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Post, post => post.categories)
    posts: Post[];
}