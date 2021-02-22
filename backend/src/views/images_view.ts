import { Image } from "../entities/Image";

export default {
    render(image: Image): any {
        return image ? {
            id: image.id,
            url: `${process.env.URL_BACKEND}/uploads/${image.path}`,
            hash: image.hash,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt
        } : null;
    },

    renderId(image: Image): any {
        return image ? { id: image.id } : null;
    },

    renderMany(images: Image[]): any[] {
        return images ? images.map(image => this.render(image)) : [];
    },

    renderManyIds(images: Image[]): any[] {
        return images ? images.map(image => this.renderId(image)) : [];
    }
}