import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import remark from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import PostDetail from '../../components/PostDetail';
import { fetcher } from '../../lib/utils';
import { URL_BACKEND } from '../../lib/utils/constants';
import DataValidating from '../../components/DataValidating';

export default function Post() {
    const { query } = useRouter();
    const { id } = query;
    const { data, error, isValidating } = useSWR(`https://192.168.100.43/blog/api/posts/${id}`, fetcher);

    if (error) return <div>{error.message}</div>
    if (!data) return <div>Carregando...</div>

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <section className="mx-auto text-gray-600 body-font">
                <div className="text-right pr-4 pt-2"><DataValidating isValidating={isValidating} /></div>
                <div className="container px-5 mx-auto">
                    <PostDetail post={data} />
                </div>
            </section>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    const response = await fetch(`https://192.168.100.43/blog/api/posts/${id}`);
    const post = await response.json();
    return {
        props: {
            post
        },
        revalidate: 30
    }
}
