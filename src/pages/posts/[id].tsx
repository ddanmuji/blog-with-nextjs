import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';

import { posts } from '../../libs';
import { CodeBlock, Date, Layout } from '../../components';
import utilStyles from '../../styles/utils.module.css';

interface PostDetailProps {
  postData: {
    title: string;
    id: string;
    date: string;
    contentHtml: string;
    mdxSource: any;
  };
}

const Button = ({ children }: any) => {
  return (
    <button
      className="bg-black dark:bg-white text-teal-200 dark:text-teal-700 text-lg  rounded-lg px-5"
      onClick={() => {
        console.log('test');
      }}
    >
      {children}
    </button>
  );
};

const components = { Button, CodeBlock };

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
        {postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
        {postData.mdxSource && <MDXRemote components={components} {...postData.mdxSource} />}
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const postData = await posts.getPostData(params.id as string);

    return { props: { postData } };
  } else return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.getAllPostIds();

  return { paths, fallback: true };
};

export default PostDetail;
