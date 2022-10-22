import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getAllPostIds, getPostData } from '../../libs/posts';
import { Date, Layout } from '../../components';
import utilStyles from '../../styles/utils.module.css';

interface PostDetailProps {
  postData: {
    title: string;
    id: string;
    date: string;
    contentHtml: string;
  };
}

const PostDetail: FC<PostDetailProps> = ({ postData }) => {
  const router = useRouter();

  return router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const postData = await getPostData(params.id as string);

    return { props: { postData } };
  } else return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return { paths, fallback: true };
};

export default PostDetail;
