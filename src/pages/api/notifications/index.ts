import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validNotificationSelect = Prisma.validator<Prisma.NotificationSelect>()({
  id: true,
  postId: true,
  date: true,
  message: true,
  read: true,
  isNew: true,
  Post: true,
});

const validNotificationGetType = Prisma.validator<Prisma.NotificationArgs>()({
  select: validNotificationSelect,
});
export type INotification = Prisma.NotificationGetPayload<
  typeof validNotificationGetType
>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<INotification[] | string>
) => {
  // debugger;
  if (req.method === 'GET') {
    try {
      await prisma.$connect();
      const notifications: INotification[] = await prisma.notification.findMany(
        {
          select: validNotificationSelect,
        }
      );
      return res.status(200).send(notifications);
    } catch (error) {
      return res.status(500).send(`${JSON.stringify(error)}`);
    } finally {
      await prisma.$disconnect();
    }
  }
  return res.status(405).send(`${req.method} is not allowed`);
};

export default handler;
