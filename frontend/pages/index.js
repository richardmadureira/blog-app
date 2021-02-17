import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Layout from '../components/Layout';
import Post from '../components/Post';

export default function Home({ allPostsData }) {
  return (
    <Layout>
        <Head>
          <title>Blog App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="container">
        <h2 className="text-primary">Posts</h2>
          <div className="d-flex flex-wrap">
            {allPostsData.map(post => (
              <Post key={post.id} post={post}/>
            ))}
          </div>
        </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}
