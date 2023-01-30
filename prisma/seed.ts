import { reactions } from './data/reactions';
import { notifications } from './data/notification';
import { posts } from './data/posts';
import { Prisma, PrismaClient } from '@prisma/client';
import { users } from './data/users';

const prisma = new PrismaClient();

(async () => {
  console.info('seed started');

  await prisma.$connect();

  await prisma.$transaction(async (tx) => {
    await tx.user.createMany({
      data: users,
    });
    await tx.post.createMany({
      data: posts,
    });
    await tx.notification.createMany({
      data: notifications,
    });
    await tx.reaction.createMany({
      data: reactions,
    });
  });
})()
  .then(() => {
    console.info('seed success');
  })
  .catch((e) => {
    console.error('seed error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.info('seed finished');
  });

export {};
