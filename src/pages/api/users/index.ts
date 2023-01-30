import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  Post: true,
});
const validUserGetType = Prisma.validator<Prisma.UserArgs>()({
  select: validUserSelect,
});
export type IUser = Prisma.UserGetPayload<typeof validUserGetType>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser[] | string>
) => {
  // debugger;
  if (req.method === 'GET') {
    try {
      await prisma.$connect();
      const users: IUser[] = await prisma.user.findMany({
        select: validUserSelect,
      });
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(`${JSON.stringify(error)}`);
    } finally {
      await prisma.$disconnect();
    }
  }
  return res.status(405).send(`${req.method} is not allowed`);
};

export default handler;
