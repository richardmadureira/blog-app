import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
    return (
        <>
            <h1>Post</h1>
            <div className="card">
                <div className="class-body">
                    <div className="class-title">{postData.title}</div>
                    <div className="class-subtitle">{postData.author}</div>
                    <div className="card-text">{postData.summary}</div>
                    <div className="card-text">{postData.content}</div>
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const paths = await getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        },
        revalidate: 10
    }
}