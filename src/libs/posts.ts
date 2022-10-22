import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import type { Article } from '../types';

const postsDirectory = path.join(process.cwd(), 'posts');

/** @description 아티클 소팅 함수 */
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return { id, ...matterResult.data };
  });

  return allPostsData.sort(({ date: a }: any, { date: b }: any) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}

/** @description 모든아티클 조회 함수 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));
}

/** @description 특정아티클 상세조회 함수 */
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const precessedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = precessedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

/** @description 아티클 생성 함수 */
export async function createPost({ id, title, date, content }: Article) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  const data = `---
title: '${title}'
date: '${date}'
---
  
${content}
`;

  fs.writeFileSync(fullPath, data);
}
