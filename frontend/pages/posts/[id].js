import { format } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { formatDate } from '../../lib/utils';
import Link from 'next/link';

export default function Post({ postData }) {

    const leftSubtitle = `Por ${postData.author}`;
    let rightSubtitle = `Publicado em ${formatDate(postData.publishDate)}`;
    if (postData.publishDate !== postData.lastUpdate) {
        rightSubtitle = rightSubtitle.concat(`, atualizado em ${formatDate(postData.lastUpdate)}`);
    }
    return (
        <Layout>
            <article className="container">
                <h2 className="text-primary">{postData.title}&nbsp;&nbsp;<Link href={`/posts/new-post/${postData.id}`}><FaEdit/></Link></h2>
                <div className="row text-muted">
                    <div className="col">
                        <div className="">{leftSubtitle}</div>
                    </div>
                    <div className="col fst-italic">
                        <div className="text-end">{rightSubtitle}</div>
                    </div>
                </div>
                <section className="p-2" dangerouslySetInnerHTML={{ __html: postData.content }} />
            </article>
        </Layout>
    )
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