export async function getSortedPostsData() {
    const response = await fetch('http://localhost:3333/posts/pesquisa', { method: 'POST' });
    const allPostsData = await response.json();
    const posts = allPostsData.map(({ id, title, publishDate }) => {
        return { id, title, publishDate };
    });
    return posts;
}

export async function getAllPostIds() {
    const response = await fetch('http://localhost:3333/posts/post-ids/all');
    const allPostIds = await response.json();
    return allPostIds.map(id => {
        return {
            params: {
                id: id
            }
        }
    });
}

export async function getPostData(id) {
    const response = await fetch(`http://localhost:3333/posts/${id}`);
    return await response.json();
}