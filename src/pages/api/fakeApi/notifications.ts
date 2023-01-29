import {
  db,
  generateRandomNotifications,
  getRandomInt,
} from '@/fakeApi/server';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown[] | string>
) => {
  // debugger;
  if (req.method === 'GET') {
    const numNotifications = getRandomInt(1, 5);

    const notifications = generateRandomNotifications(
      undefined,
      numNotifications,
      db
    );

    return res.status(200).send(notifications);
  }

  return res.status(405).send(`${req.method} is not allowed`);
};

export default handler;
