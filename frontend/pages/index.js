import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home({ allPostsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className={styles.title}>Posts</h1>
        <div className="d-flex align-content-between justify-content-center">
          {allPostsData.map(({ id, title, publishDate }) => (
            <Link key={id} href={`/posts/${id}`}>
              <div className="card m-1">
                <div className="card-body">
                  <div className="card-title">{title}</div>
                  <div className="card-subtitle">{publishDate}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
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
