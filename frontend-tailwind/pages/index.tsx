import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import DataValidating from '../components/DataValidating';
import PostCard from '../components/PostCard';
import { fetcherPost } from '../lib/utils';
import { URL_BACKEND } from '../lib/utils/constants';

export default function Index({ posts }) {
  const { data, error, isValidating } = useSWR(`${URL_BACKEND}/posts/pesquisa`, fetcherPost, { initialData: posts })

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Posts publicados</title>
        <meta name="description" content="Posts Publicados"/>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="text-right pr-4 pt-2"><DataValidating isValidating={isValidating} /></div>
        <div className="container px-5 lg:py-8 md:py-4 sm:py-1 mx-auto flex flex-wrap -m-4">
            {data.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </>
  );
}
/*
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${URL_BACKEND}/posts/post-ids/all`)
  const ids: string[] = await response.json();
  return {
    paths: ids.map(id => { return { params: { id: id } } }),
    fallback: 'blocking'
  }
}
*/
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${URL_BACKEND}/posts/pesquisa`, { method: 'post' });
  const posts = await response.json();
  return {
    props: {
      posts
    },
    revalidate: 30
  };
}
