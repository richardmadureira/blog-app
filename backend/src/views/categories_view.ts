import { Category } from "../entities/Category";
import post_view from "./post_view";

export default {
    render(category: Category): any {
        return category ? {
            id: category.id,
            name: category.name,
            postIds: post_view.renderManyIds(category.posts)
        } : null;
    },

    renderId(category: Category): any {
        return category ? {
            id: category.id
        } : null;
    },

    renderName(category: Category): any {
        return category ? {
            name: category.name
        } : null;
    },

    renderMany(categories: Category[]): any[] {
        return categories ? categories.map(category => this.render(category)) : [];
    },

    renderManyIds(categories: Category[]): any[] {
        return categories ? categories.map(category => this.renderId(category)) : [];
    },

    renderManyNames(categories: Category[]): any[] {
        return categories ? categories.map(category => this.renderName(category)) : [];
    }
}