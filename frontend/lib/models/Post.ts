import Category from "./Category";

export default interface Post {
    id: string;
    coverImage: string;
    title: string;
    author: string;
    excerpt: string;
    publishDate: Date;
    lastUpdate: Date;
    content: string;
    viewsCount: number;
    commentsCount: number;
    categories: Category[];
}