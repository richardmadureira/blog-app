export function getWhereArgs(post: any) {
    let whereArgs: any = {};
    if (post.title) {
        whereArgs.title = post.title;
    }
    if (post.author) {
        whereArgs.author = post.author;
    }
    if (post.summary) {
        whereArgs.summary = post.summary;
    }
    if (post.content) {
        whereArgs.content = post.content;
    }
    if (post.publishDate) {
        whereArgs.publishDate = post.publishDate;
    }
    if (post.lastUpdate) {
        whereArgs.lastUpdate = post.lastUpdate;
    }
    return whereArgs;
};