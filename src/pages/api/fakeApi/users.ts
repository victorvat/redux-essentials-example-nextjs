import { db } from '@/fakeApi/server';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown[] | string>
) => {
  // debugger;
  if (req.method !== 'GET') {
    return res.status(405).send(`${req.method} is not allowed`);
  }
  const users: unknown[] = db.user.getAll();
  return res.status(200).send(users);
};

export default handler;
