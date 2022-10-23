import type { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';

import { posts } from '../../../libs';
import type { Article } from '../../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content } = req.body as Omit<Article, 'date'>;

  try {
    await posts.createPost({ id, title, content, date: format(new Date(), 'yyyy-MM-dd') });
    res.status(200).json({ message: 'create success' });
  } catch (error) {
    res.status(500).json({ message: `create failed ${error}` });
  }
}
