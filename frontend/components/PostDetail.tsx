import PostProps from "../lib/interfaces/PostProps";
import Author from "./Author";
import Pagination from "./Pagination";

export default function PostDetail({ post }: PostProps) {
    
    return (
        <div className="container mx-auto flex flex-wrap py-6">
            <section className="mx-auto w-full md:w-2/3 flex flex-col items-center px-3">
            <article className="w-full flex flex-col shadow my-4">
                    <img className="cursor-pointer hover:opacity-75" src={post.coverImage} style={{ width: '100%', height: '50%' }} alt={post.coverImage} />
                    <div className="bg-white flex w-full flex-col justify-start p-6">
                        <div className="text-blue-700 text-sm font-bold uppercase pb-4">{post.categories.map(c => c.name).join(", ")}</div>
                        <div className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</div>
                        <p className="text-sm pb-8">By <a href="#" className="font-semibold hover:text-gray-800">{post.author}</a>, Published on {post.publishDate}</p>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </article>
                <Pagination previousPost={{ id: 'db13f11a-898e-4047-84cb-fa335cb6a2a7', title: 'Com criar uma aplicação next' }} nextPost={{ id: '4f2dcf32-1e37-4077-b603-eb78133908c3', title: 'Como criar uma aplicação node' }} />
                <Author />
            </section>
        </div>
    );
}