import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Date, Layout } from '../components';
import { siteTitle } from '../components/Layout';
import { posts } from '../libs';
import utilStyles from '../styles/utils.module.css';

interface HomeProps {
  allPostsData: {
    id: string;
    title: string;
    date: string;
  }[];
}

const Home: FC<HomeProps> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = posts.getSortedPostsData();

  return {
    props: { allPostsData },
  };
};

export default Home;
