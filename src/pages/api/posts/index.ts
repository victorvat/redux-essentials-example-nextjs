import { NextApiRequest, NextApiResponse } from 'next';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  userId: true,
  title: true,
  content: true,
  date: true,
  User: true,
  Notification: true,
  Reaction: true,
});
const validPostGetType = Prisma.validator<Prisma.PostArgs>()({
  select: validPostSelect,
});
export type IPost = Prisma.PostGetPayload<typeof validPostGetType>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IPost[] | IPost | string>
) => {
  // debugger;
  if (req.method === 'GET') {
    // debugger;
    try {
      await prisma.$connect();
      const posts: IPost[] = await prisma.post.findMany({
        select: validPostSelect,
      });
      return res.status(200).send(posts);
    } catch (error) {
      return res.status(500).send(`${JSON.stringify(error)}`);
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'POST') {
    // debugger;
    try {
      await prisma.$connect();
      const post: IPost = await prisma.post.create({
        select: validPostSelect,
        data: {
          content: req.body.content,
          title: req.body.title,
          userId: Number(req.body.user),

          Reaction: {
            create: {
              eyes: 0,
              heart: 0,
              hooray: 0,
              rocket: 0,
              thumbsUp: 0,
            },
          },
        },
      });

      return res.status(201).send(JSON.stringify(post));
    } catch (error) {
      return res.status(500).send(`${JSON.stringify(error)}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).send(`${req.method} is not allowed`);
};

export default handler;
