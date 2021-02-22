import { Comment } from "../entities/Comment";
import post_view from "./post_view";

export default {
    render(comment: Comment): any {
        return comment ? {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            fatherComment: comment.fatherComment,
            post: post_view.renderId(comment.post),
            comments: this.renderManyIds(comment.comments)
        } : null;
    },

    renderId(comment: Comment): any {
        return comment ? { id: comment.id } : null;
    },

    renderMany(comments: Comment[]): any[] {
        return comments ? comments.map(comment => this.render(comment)) : [];
    },

    renderManyIds(comments: Comment[]): any[] {
        return comments ? comments.map(comment => this.renderId(comment)) : [];
    }
}