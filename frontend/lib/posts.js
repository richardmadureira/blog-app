import remark from 'remark';
import html from 'remark-html';

const URL_API = 'http://192.168.100.43:3333';

export async function getSortedPostsData() {
    const response = await fetch(`${URL_API}/posts/pesquisa`, { method: 'POST' });
    const allPostsData = await response.json();
    const posts = allPostsData.map(({ id, title, publishDate }) => {
        return { id, title, publishDate };
    });
    return posts;
}

export async function getAllPostIds() {
    const response = await fetch(`${URL_API}/posts/post-ids/all`);
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
    const response = await fetch(`${URL_API}/posts/${id}`);
    const postData =  await response.json();
    const processContent = await remark().use(html).process(postData.content);
    const contentHtml = processContent.toString();
    postData.content = contentHtml;
    return postData;
}

export async function savePost(postData){
    const headers = new Headers();
    headers.set('Content-Type', "application/json");
    const response = await fetch(`${URL_API}/posts`, { method: 'post', body: JSON.stringify(postData), headers: headers});
    return response.json();
}

export async function updatePost(id, postData){
    const response = await fetch(`${URL_API}/posts/${id}`, { method: 'put', body: JSON.stringify(postData)});
    return response.json();
}