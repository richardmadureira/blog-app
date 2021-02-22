import { Post } from '../entities/Post';
import images_view from './images_view';
import comments_view from './comments_view';
import categories_view from './categories_view';

export default {
    render(post: Post): any {
        return post ? {
            id: post.id,
            title: post.title,
            author: post.author,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: `${process.env.URL_BACKEND}/uploads/${post.coverImage}`,
            viewsCount: post.viewsCount,
            categories: categories_view.renderMany(post.categories),
            publishDate: post.publishDate,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            images: images_view.renderMany(post.images),
            comments: comments_view.renderMany(post.comments)
        } : null;
    },
    
    renderId(post: Post): any {
        return post ? post.id : null;
    },

    renderMany(posts: Post[]): any[] {
        return posts ? posts.map(post => this.render(post)) : [];
    },

    renderManyIds(posts: Post[]): any[] {
        return posts ? posts.map(p => this.renderId(p)) : [];
    }
}