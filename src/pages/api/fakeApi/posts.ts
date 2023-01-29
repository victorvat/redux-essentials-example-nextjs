import { db, serializePost } from '@/fakeApi/server';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown[] | unknown | string>
) => {
  // debugger;
  if (req.method === 'GET') {
    const posts: unknown[] = db.post.getAll().map(serializePost);
    return res.status(200).send(posts);
  } else if (req.method === 'POST') {
    // debugger;
    const data = req.body;
    data.date = new Date().toISOString();
    const user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.user = user;
    data.reactions = db.reaction.create();
    const post = db.post.create(data);
    return res.status(201).send(serializePost(post));
  }

  return res.status(405).send(`${req.method} is not allowed`);
};

export default handler;
