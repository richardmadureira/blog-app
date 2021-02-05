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

export async function savePost(postData){
    const headers = new Headers();
    headers.set('Content-Type', "application/json");
    const response = await fetch('http://localhost:3333/posts', { method: 'post', body: JSON.stringify(postData), headers: headers});
    return response.json();
}

export async function updatePost(id, postData){
    const response = await fetch(`http://localhost:3333/posts/${id}`, { method: 'put', body: JSON.stringify(postData)});
    return response.json();

}