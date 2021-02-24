import Link from 'next/link';
import CommentsCount from './CommentsCount';
import ViewsCount from './ViewsCount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons'
import PostCardProps from '../lib/interfaces/PostCardProps';

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="p-4 lg:w-1/3 md:w-1/2 sm:w-1/1">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img className="hover:opacity-75 lg:h-48 md:h-36 w-full object-cover object-center" src={post.coverImage} alt="blog" />
                <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-700 mb-1">{post.categories.map(c => c.name).join(", ")}</h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        <span className="text-left">{post.title}</span>
                        <span className="float-right text-right">
                            <Link href="/posts/edit/[id]" as={`/posts/edit/${post.id}`}><a title="Edit"><FontAwesomeIcon className={`text-indigo-500 text-sm inline-flex items-center md:mb-2 lg:mb-0`} icon={faPen}/></a></Link>
                        </span>
                    </h1>
                    <p className="leading-relaxed mb-3">{post.excerpt}</p>
                    <div className="flex items-center flex-wrap ">
                        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                            <a className={`text-indigo-600 hover:bg-blue-100  inline-flex items-center p-1 md:mb-2 lg:mb-0`} title="Continue Lendo"> Continue lendo...&nbsp;<FontAwesomeIcon icon={faArrowRight} /></a>
                        </Link>
                        <ViewsCount value={post.viewsCount} />
                        <CommentsCount value={post.commentsCount} />
                    </div>
                </div>
            </div>
        </div>
    );
}