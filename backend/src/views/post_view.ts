import { Post } from '../models/Post';

export default {
    render(post: Post) {
        return {
            id: post.id,
            title: post.title,
            author: post.author,
            summary: post.summary,
            content: post.content,
            publishDate: post.publishDate,
            lastUpdate: post.lastUpdate
        }
    },

    renderMany(posts: Post[]) {
        return posts.map(post => this.render(post));
    },

    renderId(post: Post){
        return post.id;
    },

    renderManyIds(posts: Post[]){
        return posts.map(p => this.renderId(p));
    }

}