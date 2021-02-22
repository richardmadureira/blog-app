import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Post } from './Post';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @CreateDateColumn({ name: 'created_at', update: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', update: true })
    updatedAt: Date;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post;

    @ManyToOne(() => Comment, comment => comment.fatherComment)
    @JoinColumn({ name: 'father_comment_id', referencedColumnName: 'id' })
    fatherComment: Comment;

    @OneToMany(() => Comment, comment => comment.comments)
    comments: Comment[];
}