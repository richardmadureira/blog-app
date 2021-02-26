import remark from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

import { URL_BACKEND } from "../../../lib/utils/constants";

export default async function obterPostsPeloId(req, res) {
    const { query : { id }, } = req;
    const response = await fetch(`${URL_BACKEND}/posts/${id}`);
    let post = await response.json();
    
    const matterResult = matter(post.content);
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

    post.content = contentHtml;
    return res.json(post);
}