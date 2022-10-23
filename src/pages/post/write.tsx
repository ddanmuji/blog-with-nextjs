import { ChangeEvent, useRef, useState } from 'react';
import Link from 'next/link';

import { Layout } from '../../components';
import { PostApi } from '../../services';

const PostWrite = () => {
  const [showLink, setshowLink] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!idRef.current || !titleRef.current || !contentRef.current) return;

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      try {
        await PostApi.create({ id, title, content });
        setshowLink(true);
      } catch (error) {
        setshowLink(false);
      }
    }
  };

  return (
    <Layout>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input ref={idRef} type="text" name="id" placeholder="id" required />
        <br />
        <input ref={titleRef} type="text" name="title" placeholder="title" required />
        <br />
        <textarea ref={contentRef} name="content" placeholder="content" required />
        <button type="submit">Create</button>
      </form>
      {idRef.current && showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>생성된 아티클</a>
        </Link>
      )}
    </Layout>
  );
};

export default PostWrite;
