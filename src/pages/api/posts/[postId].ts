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
  res: NextApiResponse<IPost | null | string>
) => {
  // debugger;
  if (req.method === 'GET') {
    // debugger;
    try {
      const { postId } = req.query;
      await prisma.$connect();
      const post: IPost | null = await prisma.post.findUnique({
        select: validPostSelect,
        where: {
          id: Number(postId as string),
        },
      });
      return res.status(200).send(post);
    } catch (error) {
      return res.status(500).send(`${JSON.stringify(error)}`);
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'PATCH') {
    // debugger;
    try {
      await prisma.$connect();
      const post: IPost | null = await prisma.post.update({
        select: validPostSelect,
        data: {
          content: req.body.content,
          title: req.body.title,
        },
        where: {
          id: Number(req.body.id as string),
        },
      });
      return res.status(200).send(post);
    } catch (error) {
      return res.status(500).send(`${JSON.stringify(error)}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).send(`${req.method} is not allowed`);
};

export default handler;
