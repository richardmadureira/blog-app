export function getWherePostArgs(post: any) {
    let whereArgs: any = {};
    if (post.title) {
        whereArgs.title = post.title;
    }
    if (post.author) {
        whereArgs.author = post.author;
    }
    if (post.excerpt) {
        whereArgs.excerpt = post.excerpt;
    }
    if (post.content) {
        whereArgs.content = post.content;
    }
    if (post.viewsCount) {
        whereArgs.viewsCount = post.viewsCount;
    }
    if (post.publishDate) {
        whereArgs.publishDate = post.publishDate;
    }
    if (post.createAt) {
        whereArgs.createAt = post.createAt;
    }
    if (post.lastUpdate) {
        whereArgs.updatedAt = post.updatedAt;
    }
    return whereArgs;
};

export function getWhereCategoryArgs(category: any) {
    let whereArgs: any = {};
    if (category.id) {
        whereArgs.id = category.id;
        return whereArgs;
    } else {
        if (category.name) {
            whereArgs.name = category.name;
        }
    }
    return whereArgs;
};