import Link from 'next/link';

export default function Post({ post }) {
    return (
        <div>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                <div className="card m-1" role="button">
                    <div className="card-body">
                        <div className="card-title text-primary">{post.title}</div>
                        <div className="card-subtitle">{post.publishDate}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}