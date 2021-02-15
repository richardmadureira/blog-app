import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Layout from '../components/Layout';

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
            {allPostsData.map(({ id, title, publishDate }) => (
              <Link key={id} href={`/posts/${id}`}>
                <div className="card m-1" role="button">
                  <div className="card-body">
                    <div className="card-title text-primary">{title}</div>
                    <div className="card-subtitle">{publishDate}</div>
                  </div>
                </div>
              </Link>
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
