import { Image } from "../models/Image";

export default {
    render(image: Image) {
        return image ? {
            id: image.id,
            url: `${process.env.URL_BACKEND}/uploads/${image.path}`,
        } : null;
    },

    renderMany(images: Image[]) {
        return images ? images.map(image => this.render(image)) : [];
    }
}