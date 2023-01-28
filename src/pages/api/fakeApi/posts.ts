import { db, serializePost } from '@/fakeApi/server';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown[]>
) => {
  // debugger;
  const posts: unknown[] = db.post.getAll().map(serializePost);
  return res.status(200).send(posts);
};

export default handler;
