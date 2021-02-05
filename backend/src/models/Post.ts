import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    author: String;
    @Column()
    title: String;
    @Column()
    summary: String;
    @Column()
    content: String;
    @CreateDateColumn({ name: 'publish_date', update: false})
    publishDate: Date;
    @UpdateDateColumn({ name: 'last_update', update: true})
    lastUpdate: Date;
}