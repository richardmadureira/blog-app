import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Image } from './Image';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    author: string;
    @Column()
    title: string;
    @Column()
    summary: string;
    @Column()
    content: string;
    @CreateDateColumn({ name: 'publish_date', update: false })
    publishDate: Date;
    @UpdateDateColumn({ name: 'last_update', update: true })
    lastUpdate: Date;
    @OneToMany(() => Image, image => image.post, { cascade: ['insert', 'update', 'remove'] }, )
    @JoinColumn({ name: 'post_id' })
    images: Image[];
}