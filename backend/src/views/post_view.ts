import { Post } from '../models/Post';
import images_view from './images_view';

export default {
    render(post: Post) {
        return post ? {
            id: post.id,
            title: post.title,
            author: post.author,
            summary: post.summary,
            content: post.content,
            publishDate: post.publishDate,
            lastUpdate: post.lastUpdate,
            images: images_view.renderMany(post.images)
        } : null;
    },

    renderMany(posts: Post[]) {
        return posts ? posts.map(post => this.render(post)) : [];
    },

    renderId(post: Post) {
        return post ? post.id : null;
    },

    renderManyIds(posts: Post[]) {
        return posts ? posts.map(p => this.renderId(p)) : [];
    }
}